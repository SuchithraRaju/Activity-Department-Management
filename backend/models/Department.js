const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { unique: true, type: String, required: true, trim: true },
  description: { type: String, trim: true },
  hod: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model("Department", DepartmentSchema);
