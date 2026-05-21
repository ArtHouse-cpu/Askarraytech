const mongoose = require('mongoose');
const { Schema } = mongoose;

const PortfolioSchema = new Schema({
  key: { type: String, required: true, unique: true },
  name: String,
  created_at: String,
  type: String,
  blurb: String,
  metric: String,
  image: String,
  visible: Boolean,
  order: Number,
});

const PortfolioModel = mongoose.model('Portfolio', PortfolioSchema);

module.exports = { PortfolioModel };