// @ts-nocheck
import mongoose, { Schema } from 'mongoose';

const PaymentTransactionSchema = new Schema({
  id: { type: String, required: true, unique: true },
  booking_id: { type: String, required: true },
  amount: Number,
  currency: String,
  status: String,
  stripe_session_id: String,
  stripe_payment_intent_id: String,
  created_at: String,
  completed_at: String,
});

export const PaymentTransactionModel = mongoose.model('PaymentTransaction', PaymentTransactionSchema);
