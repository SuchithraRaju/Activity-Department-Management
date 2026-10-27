const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  studentName: { type: String, required: true, trim: true },
  courseName: { type: String, required: true, trim: true },
  academicYear: { type: String, required: true, trim: true },
  semester: { type: String, enum: ["1", "2", "3", "4", "5", "6", "7", "8"] },
  enrolledOn: { type: String, trim: true },
  status: { type: String, enum: ["Enrolled", "Completed", "Withdrawn"] }
}, { timestamps: true });

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
