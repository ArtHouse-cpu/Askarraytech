const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: String,
  name: String,
  role: String,
  created_at: String,
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = { UserModel };