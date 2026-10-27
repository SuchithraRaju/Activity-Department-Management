
const mongoose = require("mongoose");

const SubjectAttendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    courseName: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    semester: {
      type: Number,
      required: true
    },

    classesHeld: {
      type: Number,
      default: 0,
      min: 0
    },

    classesAttended: {
      type: Number,
      default: 0,
      min: 0
    },

    requiredPercentage: {
      type: Number,
      default: 75,
      min: 0,
      max: 100
    }
  },
  { timestamps: true }
);

SubjectAttendanceSchema.pre("validate", function () {
  if (this.classesAttended > this.classesHeld) {
    this.invalidate(
      "classesAttended",
      "Classes attended cannot exceed classes held."
    );
  }
});

SubjectAttendanceSchema.virtual("attendancePercentage").get(function () {
  if (this.classesHeld === 0) return 0;

  return Number(
    ((this.classesAttended / this.classesHeld) * 100).toFixed(2)
  );
});

SubjectAttendanceSchema.set("toJSON", { virtuals: true });
SubjectAttendanceSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model(
  "SubjectAttendance",
  SubjectAttendanceSchema
);
