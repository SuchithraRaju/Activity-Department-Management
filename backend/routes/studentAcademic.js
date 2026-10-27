
const express = require("express");
const router = express.Router();

const StudentAcademicProfile = require(
  "../models/StudentAcademicProfile"
);

const SubjectAttendance = require(
  "../models/SubjectAttendance"
);

// Get a student's complete academic and skills profile
router.get("/profile/:studentId", async (req, res, next) => {
  try {
    const profile = await StudentAcademicProfile.findOne({
      studentId: req.params.studentId
    }).populate("studentId");

    if (!profile) {
      return res.status(404).json({
        message: "Student academic profile not found"
      });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
});

// Get attendance and exam eligibility by subject
router.get("/eligibility/:studentId", async (req, res, next) => {
  try {
    const records = await SubjectAttendance.find({
      studentId: req.params.studentId,
      semester: Number(req.query.semester)
    }).sort({ courseName: 1 });

    const subjects = records.map(record => {
      const percentage = record.classesHeld === 0
        ? 0
        : Number(
            (
              (record.classesAttended / record.classesHeld) * 100
            ).toFixed(2)
          );

      return {
        courseName: record.courseName,
        semester: record.semester,
        classesHeld: record.classesHeld,
        classesAttended: record.classesAttended,
        attendancePercentage: percentage,
        requiredPercentage: record.requiredPercentage,
        eligible:
          record.classesHeld > 0 &&
          percentage >= record.requiredPercentage
      };
    });

    res.json({
      studentId: req.params.studentId,
      semester: Number(req.query.semester),
      subjects,
      allSubjectsMeetAttendanceRequirement:
        subjects.length > 0 &&
        subjects.every(subject => subject.eligible)
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
