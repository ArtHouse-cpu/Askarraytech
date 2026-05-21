const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  email: String,
  message: String,
  created_at: String,
});

const ContactModel = mongoose.model('Contact', ContactSchema);

module.exports = { ContactModel };