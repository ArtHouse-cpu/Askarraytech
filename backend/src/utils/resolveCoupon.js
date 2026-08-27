import { CouponModel } from '../models/index.js';
import { applyCouponToPrice, BIZRV_WORKSPACE_PRICE_INR, isCouponCurrentlyValid } from '../utils/couponPricing.js';

export const resolveValidCoupon = async (rawCode) => {
  const code = rawCode == null ? '' : String(rawCode).trim().toUpperCase();
  if (!code) {
    return { coupon: null, pricing: applyCouponToPrice(null), error: null };
  }

  const coupon = await CouponModel.findOne({ code });
  if (!coupon) {
    return { coupon: null, pricing: null, error: 'Invalid coupon code' };
  }
  if (!isCouponCurrentlyValid(coupon)) {
    return { coupon: null, pricing: null, error: 'This coupon is not active or has expired' };
  }

  return { coupon, pricing: applyCouponToPrice(coupon), error: null };
};
