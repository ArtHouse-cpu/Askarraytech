import mongoose from 'mongoose';
const { Schema } = mongoose;

const BizrvLeadSchema = new Schema({
  id: { type: String, required: true, unique: true },
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: String,
  businessStage: {
    type: String,
    enum: ['new', 'existing'],
    required: true,
  },
  preferredModel: {
    type: String,
    enum: ['commit', 'flex', 'prepaid'],
    required: true,
  },
  source: { type: String, default: 'get_started_modal' },
  paymentStatus: { type: String, default: 'unpaid' },
  amountPaid: Number,
  couponCode: String,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  created_at: String,
});

if (mongoose.models.BizrvLead) {
  delete mongoose.models.BizrvLead;
}

export const BizrvLeadModel = mongoose.model('BizrvLead', BizrvLeadSchema);
