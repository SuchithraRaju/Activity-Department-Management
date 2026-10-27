
const mongoose = require("mongoose");

const StudentAcademicProfileSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      unique: true
    },

    department: {
      type: String,
      required: true
    },

    registerNumber: {
      type: String,
      required: true
    },

    year: Number,
    semester: Number,
    section: String,

    academics: {
      cgpa: { type: Number, min: 0, max: 10, default: 0 },
      arrears: { type: Number, min: 0, default: 0 },
      previousSemesterGPA: { type: Number, min: 0, max: 10, default: 0 }
    },

    technicalSkills: [{
      name: String,
      level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
        default: "Beginner"
      },
      score: { type: Number, min: 0, max: 100, default: 0 }
    }],

    nonTechnicalSkills: [{
      name: String,
      level: String,
      score: { type: Number, min: 0, max: 100, default: 0 }
    }],

    projects: [{
      title: String,
      description: String,
      technologies: [String],
      status: String
    }],

    certifications: [{
      name: String,
      issuer: String,
      year: Number
    }],

    achievements: [String],
    internships: [{
      company: String,
      role: String,
      duration: String
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "StudentAcademicProfile",
  StudentAcademicProfileSchema
);
