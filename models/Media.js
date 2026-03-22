const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  filename: String,
  path: String,
  tags: [String],
  text: String,
  faces: [String],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Media", mediaSchema);