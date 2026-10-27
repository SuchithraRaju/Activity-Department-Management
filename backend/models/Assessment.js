const mongoose = require("mongoose");

const AssessmentSchema = new mongoose.Schema({
  studentName: { type: String, required: true, trim: true },
  courseName: { type: String, required: true, trim: true },
  assessmentType: { type: String, required: true, enum: ["Internal", "Assignment", "Practical", "Model Exam", "End Semester"] },
  maxMarks: { type: Number, required: true, min: 0 },
  marksObtained: { type: Number, required: true, min: 0 },
  date: { type: String, trim: true },
  grade: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model("Assessment", AssessmentSchema);
