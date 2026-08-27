import {
  BizrvLeadModel,
  BizrvOrderModel,
  CouponModel,
} from '../models/index.js';
import { nowIso, generateId } from '../utils/index.js';
import { parseBizrvLeadInput } from '../utils/bizrvLead.js';
import { resolveValidCoupon } from '../utils/resolveCoupon.js';
import { BIZRV_WORKSPACE_CURRENCY } from '../utils/couponPricing.js';
import {
  getRazorpayClient,
  getRazorpayKeys,
  verifyRazorpayPaymentSignature,
} from '../utils/razorpayClient.js';

const checkoutLocks = new Set();

const fail = (res, status, message) =>
  res.status(status).json({ success: false, message, detail: message });

const toPublicLead = (doc) => {
  if (!doc) return null;
  const { _id, __v, ...rest } = doc.toObject ? doc.toObject() : doc;
  return rest;
};

const toPublicOrder = (order, extra = {}) => ({
  orderId: order.id,
  status: order.status,
  originalAmount: order.originalAmount,
  discountAmount: order.discountAmount,
  finalAmount: order.finalAmount,
  currency: order.currency,
  couponCode: order.couponCode || null,
  ...extra,
});

const createPaidLeadFromOrder = async (order) => {
  if (order.leadId) {
    const existing = await BizrvLeadModel.findOne({ id: order.leadId });
    if (existing) return existing;
  }

  const lead = await BizrvLeadModel.create({
    id: generateId(),
    businessName: order.businessName,
    ownerName: order.ownerName,
    phone: order.phone,
    email: order.email,
    city: order.city || null,
    businessStage: order.businessStage,
    preferredModel: order.preferredModel,
    source: order.source || 'get_started_modal',
    paymentStatus: 'paid',
    amountPaid: order.finalAmount,
    couponCode: order.couponCode || null,
    razorpayOrderId: order.razorpayOrderId || null,
    razorpayPaymentId: order.razorpayPaymentId || null,
    created_at: nowIso(),
  });

  await BizrvOrderModel.updateOne({ id: order.id }, { $set: { leadId: lead.id, updated_at: nowIso() } });
  return lead;
};

const checkoutBizrvWorkspace = async (req, res) => {
  try {
    const body = req.body || {};
    const parsed = parseBizrvLeadInput(body.lead || body);
    if (parsed.error) return fail(res, 400, parsed.error);

    const couponCode = body.couponCode || body.code || '';
    const resolved = await resolveValidCoupon(couponCode);
    if (resolved.error) return fail(res, 400, resolved.error);

    const pricing = resolved.pricing;
    const emailLock = parsed.lead.email;
    if (checkoutLocks.has(emailLock)) {
      return fail(res, 409, 'A checkout request is already in progress. Please wait.');
    }
    checkoutLocks.add(emailLock);

    try {
      await BizrvOrderModel.updateMany(
        { email: parsed.lead.email, status: 'pending' },
        { $set: { status: 'superseded', updated_at: nowIso() } },
      );

      const orderId = generateId();
      const orderDoc = await BizrvOrderModel.create({
        id: orderId,
        status: 'pending',
        ...parsed.lead,
        couponCode: pricing.couponCode,
        originalAmount: pricing.originalAmount,
        discountAmount: pricing.discountAmount,
        finalAmount: pricing.finalAmount,
        currency: BIZRV_WORKSPACE_CURRENCY,
        created_at: nowIso(),
        updated_at: nowIso(),
      });

      if (pricing.finalAmount <= 0) {
        const paidAt = nowIso();
        await BizrvOrderModel.updateOne(
          { id: orderId },
          { $set: { status: 'paid', paid_at: paidAt, updated_at: paidAt } },
        );
        if (pricing.couponCode) {
          await CouponModel.updateOne({ code: pricing.couponCode }, { $inc: { usedCount: 1 } });
        }
        const paidOrder = await BizrvOrderModel.findOne({ id: orderId });
        const lead = await createPaidLeadFromOrder(paidOrder);
        return res.json({
          success: true,
          message: 'Workspace activated with a 100% discount',
          data: {
            skipPayment: true,
            ...toPublicOrder(paidOrder),
            lead: toPublicLead(lead),
          },
        });
      }

      const { keyId } = getRazorpayKeys();
      const razorpay = getRazorpayClient();
      const amountInPaise = Math.round(pricing.finalAmount * 100);
      if (amountInPaise < 100) {
        return fail(res, 400, 'Payable amount is below the Razorpay minimum of ₹1');
      }

      const rzpOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: BIZRV_WORKSPACE_CURRENCY,
        receipt: orderId.slice(0, 40),
        notes: {
          bizrv_order_id: orderId,
          email: parsed.lead.email,
          coupon: pricing.couponCode || '',
        },
      });

      await BizrvOrderModel.updateOne(
        { id: orderId },
        { $set: { razorpayOrderId: rzpOrder.id, updated_at: nowIso() } },
      );

      return res.json({
        success: true,
        message: 'Razorpay order created',
        data: {
          skipPayment: false,
          keyId,
          razorpayOrderId: rzpOrder.id,
          amount: amountInPaise,
          currency: BIZRV_WORKSPACE_CURRENCY,
          ...toPublicOrder(orderDoc, {
            originalAmount: pricing.originalAmount,
            discountAmount: pricing.discountAmount,
            finalAmount: pricing.finalAmount,
            couponCode: pricing.couponCode,
          }),
          prefill: {
            name: parsed.lead.ownerName,
            email: parsed.lead.email,
            contact: parsed.lead.phone,
          },
        },
      });
    } finally {
      checkoutLocks.delete(emailLock);
    }
  } catch (err) {
    console.error('checkoutBizrvWorkspace failed:', err);
    const status = err.status || 500;
    return fail(res, status, err.message || 'Could not start checkout');
  }
};

const verifyBizrvPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body || {};
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return fail(res, 400, 'Missing Razorpay payment verification fields');
    }

    const order = await BizrvOrderModel.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) {
      return fail(res, 404, 'Checkout order not found');
    }

    if (order.status === 'paid' && order.leadId) {
      const lead = await BizrvLeadModel.findOne({ id: order.leadId });
      return res.json({
        success: true,
        message: 'Payment already verified',
        data: { lead: toPublicLead(lead), order: toPublicOrder(order) },
      });
    }

    const { keySecret } = getRazorpayKeys();
    const valid = verifyRazorpayPaymentSignature({
      orderId: order.razorpayOrderId,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      keySecret,
    });

    if (!valid) {
      await BizrvOrderModel.updateOne(
        { id: order.id },
        { $set: { status: 'failed', updated_at: nowIso() } },
      );
      return fail(res, 400, 'Payment signature verification failed');
    }

    const claimed = await BizrvOrderModel.findOneAndUpdate(
      { id: order.id, status: { $ne: 'paid' } },
      {
        $set: {
          status: 'paid',
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          paid_at: nowIso(),
          updated_at: nowIso(),
        },
      },
      { new: true },
    );

    const paidOrder = claimed || (await BizrvOrderModel.findOne({ id: order.id }));

    if (claimed && paidOrder.couponCode) {
      await CouponModel.updateOne({ code: paidOrder.couponCode }, { $inc: { usedCount: 1 } });
    }

    const lead = await createPaidLeadFromOrder(paidOrder);
    return res.json({
      success: true,
      message: 'Payment verified and workspace created',
      data: { lead: toPublicLead(lead), order: toPublicOrder(paidOrder) },
    });
  } catch (err) {
    console.error('verifyBizrvPayment failed:', err);
    const status = err.status || 500;
    return fail(res, status, err.message || 'Could not verify payment');
  }
};

export { checkoutBizrvWorkspace, verifyBizrvPayment };
