const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  email: String,
  phone: String,
  startup_idea: String,
  service_needed: String,
  city: String,
  budget_range: String,
  timeline_to_start: String,
  amount: Number,
  currency: String,
  status: String,
  slot_id: String,
  slot_start: String,
  slot_end: String,
  payment_session_id: String,
  created_at: String,
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = { BookingModel };