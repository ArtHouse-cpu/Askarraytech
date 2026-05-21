const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentTransactionSchema = new Schema({
  id: { type: String, required: true, unique: true },
  booking_id: { type: String, required: true },
  session_id: String,
  email: String,
  amount: Number,
  currency: String,
  status: String,
  payment_status: String,
  stripe_session_id: String,
  stripe_payment_intent_id: String,
  metadata: Schema.Types.Mixed,
  created_at: String,
  updated_at: String,
  completed_at: String,
});

const PaymentTransactionModel = mongoose.model('PaymentTransaction', PaymentTransactionSchema);

module.exports = { PaymentTransactionModel };