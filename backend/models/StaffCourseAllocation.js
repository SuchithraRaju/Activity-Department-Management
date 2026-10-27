const mongoose = require("mongoose");

const StaffCourseAllocationSchema = new mongoose.Schema({
  staffName: { type: String, required: true, trim: true },
  courseName: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  academicYear: { type: String, required: true, trim: true },
  section: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model("StaffCourseAllocation", StaffCourseAllocationSchema);
