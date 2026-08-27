export const BIZRV_WORKSPACE_PRICE_INR = 10000;
export const BIZRV_WORKSPACE_CURRENCY = 'INR';

export const applyCouponToPrice = (coupon, originalAmount = BIZRV_WORKSPACE_PRICE_INR) => {
  const original = Math.round(Number(originalAmount) || 0);
  if (!coupon) {
    return {
      originalAmount: original,
      discountAmount: 0,
      finalAmount: original,
      couponCode: null,
      couponTitle: null,
      discountType: null,
      discountValue: null,
    };
  }

  let discountAmount = 0;
  if (coupon.discountType === 'percentage') {
    discountAmount = Math.round((original * Number(coupon.discountValue)) / 100);
  } else {
    discountAmount = Math.round(Number(coupon.discountValue) || 0);
  }

  if (discountAmount < 0) discountAmount = 0;
  if (discountAmount > original) discountAmount = original;

  return {
    originalAmount: original,
    discountAmount,
    finalAmount: original - discountAmount,
    couponCode: coupon.code,
    couponTitle: coupon.title || null,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
  };
};

export const isCouponCurrentlyValid = (coupon, now = new Date()) => {
  if (!coupon || coupon.isActive === false) return false;
  const start = coupon.startDate ? new Date(coupon.startDate) : null;
  const expiry = coupon.expiryDate ? new Date(coupon.expiryDate) : null;
  if (!start || !expiry || Number.isNaN(start.getTime()) || Number.isNaN(expiry.getTime())) {
    return false;
  }
  return now >= start && now <= expiry;
};
