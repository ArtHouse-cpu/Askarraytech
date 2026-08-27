import mongoose from 'mongoose';
const { Schema } = mongoose;

const BizrvOrderSchema = new Schema({
  id: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'superseded'],
    default: 'pending',
  },
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: String,
  businessStage: { type: String, required: true },
  preferredModel: { type: String, required: true },
  source: String,
  couponCode: String,
  originalAmount: { type: Number, required: true },
  discountAmount: { type: Number, required: true, default: 0 },
  finalAmount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  razorpayOrderId: { type: String, unique: true, sparse: true },
  razorpayPaymentId: String,
  razorpaySignature: String,
  leadId: String,
  created_at: String,
  updated_at: String,
  paid_at: String,
});

if (mongoose.models.BizrvOrder) {
  delete mongoose.models.BizrvOrder;
}

export const BizrvOrderModel = mongoose.model('BizrvOrder', BizrvOrderSchema);
