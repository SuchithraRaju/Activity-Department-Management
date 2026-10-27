const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  studentName: { type: String, required: true, trim: true },
  courseName: { type: String, required: true, trim: true },
  date: { type: String, required: true, trim: true },
  status: { type: String, required: true, enum: ["Present", "Absent", "Late", "Excused"] },
  remarks: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);
