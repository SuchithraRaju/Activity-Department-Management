const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  registerNumber: { unique: true, type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  year: { type: String, required: true, enum: ["1", "2", "3", "4"] },
  semester: { type: String, enum: ["1", "2", "3", "4", "5", "6", "7", "8"] },
  department: { type: String, required: true, trim: true },
  dateOfBirth: { type: String, trim: true },
  status: { type: String, enum: ["Active", "Inactive", "Graduated"] }
}, { timestamps: true });

module.exports = mongoose.model("Student", StudentSchema);
