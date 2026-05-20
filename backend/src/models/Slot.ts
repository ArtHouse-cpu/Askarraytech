// @ts-nocheck
import mongoose, { Schema } from 'mongoose';

const SlotSchema = new Schema({
  id: { type: String, required: true, unique: true },
  start_at: String,
  end_at: String,
  is_booked: Boolean,
  booking_id: String,
});

export const SlotModel = mongoose.model('Slot', SlotSchema);
