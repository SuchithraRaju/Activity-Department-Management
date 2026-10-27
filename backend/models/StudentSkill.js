const mongoose = require("mongoose");

const StudentSkillSchema = new mongoose.Schema({
  studentName: { type: String, required: true, trim: true },
  skillName: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ["Technical", "Academic", "Communication", "Leadership", "Teamwork", "Other"] },
  proficiency: { type: String, required: true, enum: ["Beginner", "Intermediate", "Advanced", "Expert"] },
  score: { type: Number, min: 0 },
  notes: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model("StudentSkill", StudentSkillSchema);
