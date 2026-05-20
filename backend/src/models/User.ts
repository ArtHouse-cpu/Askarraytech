// @ts-nocheck
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: String,
  name: String,
  role: String,
  created_at: String,
});

export const UserModel = mongoose.model('User', UserSchema);
