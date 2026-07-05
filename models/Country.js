const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  capital: { type: String },
  region: { type: String, required: true },
  population: { type: Number },
  area: { type: Number },
  flagUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Country', countrySchema);