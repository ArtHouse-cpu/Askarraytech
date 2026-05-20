// @ts-nocheck
import mongoose, { Schema } from 'mongoose';

const ContactSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  email: String,
  message: String,
  created_at: String,
});

export const ContactModel = mongoose.model('Contact', ContactSchema);
