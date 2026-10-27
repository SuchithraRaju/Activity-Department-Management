const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  employeeId: { unique: true, type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  designation: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  joiningDate: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model("Staff", StaffSchema);
