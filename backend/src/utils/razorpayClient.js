import crypto from 'crypto';
import Razorpay from 'razorpay';

export const getRazorpayKeys = () => {
  const keyId = (process.env.RAZORPAY_KEY_ID || '').trim();
  const keySecret = (process.env.RAZORPAY_KEY_SECRET || '').trim();
  if (!keyId || !keySecret) {
    const err = new Error('Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.');
    err.status = 503;
    throw err;
  }
  return { keyId, keySecret };
};

export const getRazorpayClient = () => {
  const { keyId, keySecret } = getRazorpayKeys();
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
};

export const signaturesMatch = (expectedHex, receivedHex) => {
  if (!expectedHex || !receivedHex) return false;
  const expected = Buffer.from(String(expectedHex));
  const received = Buffer.from(String(receivedHex));
  if (expected.length !== received.length) return false;
  return crypto.timingSafeEqual(expected, received);
};

export const verifyRazorpayPaymentSignature = ({ orderId, paymentId, signature, keySecret }) => {
  const body = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac('sha256', keySecret).update(body).digest('hex');
  return signaturesMatch(expected, signature);
};
