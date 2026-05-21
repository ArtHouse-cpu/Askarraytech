const mongoose = require('mongoose');
const { Schema } = mongoose;

const SlotSchema = new Schema({
  id: { type: String, required: true, unique: true },
  start_at: String,
  end_at: String,
  is_booked: Boolean,
  booking_id: String,
});

const SlotModel = mongoose.model('Slot', SlotSchema);

module.exports = { SlotModel };