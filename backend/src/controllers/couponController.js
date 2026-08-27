import mongoose from 'mongoose';
import { CouponModel } from '../models/index.js';
import { resolveValidCoupon } from '../utils/resolveCoupon.js';

const DISCOUNT_TYPES = ['percentage', 'fixed'];

const str = (value) => (value == null ? '' : String(value).trim());

const toPublicCoupon = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  const { __v, ...rest } = obj;
  return rest;
};

const fail = (res, status, message) =>
  res.status(status).json({ success: false, message, detail: message });

const createCoupon = async (req, res) => {
  try {
    const body = req.body || {};
    const code = str(body.code).toUpperCase();
    const title = str(body.title);
    const discountType = str(body.discountType).toLowerCase();
    const discountValue = Number(body.discountValue);
    const startDate = body.startDate ? new Date(body.startDate) : null;
    const expiryDate = body.expiryDate ? new Date(body.expiryDate) : null;

    if (!code || !title || !discountType || body.discountValue == null || body.discountValue === '' || !startDate || !expiryDate) {
      return fail(res, 400, 'code, title, discountType, discountValue, startDate, and expiryDate are required');
    }

    if (!DISCOUNT_TYPES.includes(discountType)) {
      return fail(res, 400, 'discountType must be percentage or fixed');
    }

    if (!Number.isFinite(discountValue) || discountValue < 0) {
      return fail(res, 400, 'discountValue must be a number greater than or equal to 0');
    }

    if (discountType === 'percentage' && (discountValue < 0 || discountValue > 100)) {
      return fail(res, 400, 'Percentage discount must be between 0 and 100');
    }

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(expiryDate.getTime())) {
      return fail(res, 400, 'startDate and expiryDate must be valid dates');
    }

    if (expiryDate <= startDate) {
      return fail(res, 400, 'expiryDate must be after startDate');
    }

    const existing = await CouponModel.findOne({ code });
    if (existing) {
      return fail(res, 409, 'Coupon code already exists');
    }

    const coupon = await CouponModel.create({
      code,
      title,
      discountType,
      discountValue,
      usedCount: 0,
      startDate,
      expiryDate,
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      data: toPublicCoupon(coupon),
    });
  } catch (err) {
    if (err?.code === 11000) {
      return fail(res, 409, 'Coupon code already exists');
    }
    console.error('createCoupon failed:', err);
    return fail(res, 400, err?.message || 'Invalid coupon data');
  }
};

const getCoupons = async (req, res) => {
  try {
    const items = await CouponModel.find({}, { __v: 0 }).sort({ createdAt: -1 });
    return res.json({
      success: true,
      message: 'Coupons fetched successfully',
      data: items.map(toPublicCoupon),
    });
  } catch (err) {
    console.error('getCoupons failed:', err);
    return fail(res, 500, 'Failed to fetch coupons');
  }
};

const validateCoupon = async (req, res) => {
  try {
    const code = req.body?.code || req.body?.couponCode || req.query?.code;
    const resolved = await resolveValidCoupon(code);
    if (resolved.error) {
      return fail(res, 400, resolved.error);
    }
    return res.json({
      success: true,
      message: resolved.pricing.couponCode ? 'Coupon applied successfully' : 'No coupon applied',
      data: resolved.pricing,
    });
  } catch (err) {
    console.error('validateCoupon failed:', err);
    return fail(res, 500, 'Failed to validate coupon');
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return fail(res, 400, 'Invalid coupon ID');
    }

    const coupon = await CouponModel.findById(id);
    if (!coupon) {
      return fail(res, 404, 'Coupon not found');
    }

    await CouponModel.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: 'Coupon deleted successfully',
      data: { id },
    });
  } catch (err) {
    console.error('deleteCoupon failed:', err);
    return fail(res, 500, 'Failed to delete coupon');
  }
};

export { createCoupon, getCoupons, deleteCoupon, validateCoupon };
