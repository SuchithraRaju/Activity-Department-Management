const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { unique: true, type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  credits: { type: Number, required: true, min: 0 },
  semester: { type: String, enum: ["1", "2", "3", "4", "5", "6", "7", "8"] },
  description: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model("Course", CourseSchema);
