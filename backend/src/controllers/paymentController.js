const Razorpay = require('razorpay');
const crypto = require('crypto');
const { BookingModel, PaymentTransactionModel, SlotModel } = require('../models');
const { nowIso, generateId } = require('../utils');

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

const BOOKING_AMOUNT = 399.0;
const BOOKING_CURRENCY = 'INR';

const checkout = async (req, res) => {
  const { booking_id } = req.body;
  const booking = await BookingModel.findOne({ id: booking_id });
  if (!booking) return res.status(404).json({ detail: 'Booking not found' });
  if (!booking.slot_id) return res.status(400).json({ detail: 'Please pick a slot before paying' });
  if (booking.status === 'paid') return res.status(400).json({ detail: 'Booking already paid' });

  try {
    const amountInPaise = Math.round(BOOKING_AMOUNT * 100);
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: booking.id,
      notes: {
        booking_id: booking.id,
        email: booking.email,
        service: booking.service_needed,
      }
    });

    await PaymentTransactionModel.create({
      id: generateId(),
      session_id: order.id,
      booking_id: booking.id,
      email: booking.email,
      amount: BOOKING_AMOUNT,
      currency: BOOKING_CURRENCY,
      status: 'initiated',
      payment_status: 'pending',
      metadata: { service: booking.service_needed },
      created_at: nowIso(),
      updated_at: nowIso(),
    });

    await BookingModel.updateOne({ id: booking.id }, {
      $set: {
        status: 'payment_initiated',
        payment_session_id: order.id,
      }
    });

    res.json({
      order_id: order.id,
      amount: amountInPaise,
      currency: 'INR',
      key_id: RAZORPAY_KEY_ID,
      booking_id: booking.id,
      name: booking.name,
      email: booking.email,
      phone: booking.phone || '',
    });
  } catch (err) {
    console.error('Razorpay order creation failed:', err);
    res.status(500).json({ detail: 'Could not initiate Razorpay order' });
  }
};

const verify = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, booking_id } = req.body;

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !booking_id) {
    return res.status(400).json({ detail: 'Missing required signature verification fields' });
  }

  const txn = await PaymentTransactionModel.findOne({ session_id: razorpay_order_id });
  if (!txn) {
    return res.status(404).json({ detail: 'Payment transaction not found for this order' });
  }

  // Verify signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    // 1. Update Payment Transaction
    await PaymentTransactionModel.updateOne(
      { session_id: razorpay_order_id },
      {
        $set: {
          status: 'paid',
          payment_status: 'paid',
          completed_at: nowIso(),
          updated_at: nowIso(),
          metadata: {
            ...txn.metadata,
            razorpay_payment_id,
            razorpay_signature,
          }
        }
      }
    );

    // 2. Update Booking
    await BookingModel.updateOne(
      { id: booking_id },
      {
        $set: {
          status: 'paid',
          payment_session_id: razorpay_order_id,
        }
      }
    );

    return res.json({ success: true });
  } else {
    return res.status(400).json({ detail: 'Invalid signature. Payment verification failed.' });
  }
};

const paymentStatus = async (req, res) => {
  const sessionId = req.params.session_id;
  const txn = await PaymentTransactionModel.findOne({ session_id: sessionId }, { _id: 0, __v: 0 });
  if (!txn) return res.status(404).json({ detail: 'Payment not found' });

  if (txn.payment_status === 'paid') {
    return res.json({ status: txn.status, payment_status: 'paid', booking_id: txn.booking_id });
  }

  if (sessionId.startsWith('order_')) {
    try {
      const order = await razorpay.orders.fetch(sessionId);
      let payment_status = 'pending';
      if (order.status === 'paid') {
        payment_status = 'paid';
        await PaymentTransactionModel.updateOne({ session_id: sessionId }, {
          $set: {
            status: 'paid',
            payment_status: 'paid',
            updated_at: nowIso(),
          }
        });
        await BookingModel.updateOne({ id: txn.booking_id, status: { $ne: 'paid' } }, { $set: { status: 'paid' } });
      }
      return res.json({ status: order.status, payment_status, booking_id: txn.booking_id });
    } catch (err) {
      console.error('Razorpay order fetch failed:', err);
      return res.status(502).json({ detail: 'Could not verify payment' });
    }
  }

  // Fallback to Stripe (for compatibility)
  const Stripe = require('stripe');
  const STRIPE_API_KEY = process.env.STRIPE_API_KEY || 'sk_test_dummy';
  const stripe = new Stripe(STRIPE_API_KEY, { apiVersion: '2024-12-18.acacia' });
  try {
    const status = await stripe.checkout.sessions.retrieve(sessionId);
    await PaymentTransactionModel.updateOne({ session_id: sessionId }, {
      $set: {
        status: status.status,
        payment_status: status.payment_status,
        updated_at: nowIso(),
      }
    });

    if (status.payment_status === 'paid' && txn.payment_status !== 'paid') {
      await BookingModel.updateOne({ id: txn.booking_id, status: { $ne: 'paid' } }, { $set: { status: 'paid' } });
    } else if (status.status === 'expired') {
      const booking = await BookingModel.findOne({ id: txn.booking_id });
      if (booking && booking.slot_id) {
        await SlotModel.updateOne({ id: booking.slot_id }, { $set: { is_booked: false, booking_id: null } });
      }
      await BookingModel.updateOne({ id: txn.booking_id }, { $set: { status: 'cancelled' } });
    }

    res.json({ status: status.status, payment_status: status.payment_status, booking_id: txn.booking_id });
  } catch (err) {
    res.status(502).json({ detail: 'Could not verify payment' });
  }
};

const stripeWebhook = async (req, res) => {
  // Kept for backward compatibility
  res.json({ ok: true });
};

module.exports = {
  checkout,
  verify,
  paymentStatus,
  stripeWebhook,
};