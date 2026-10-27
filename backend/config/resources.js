const Department = require("../models/Department");
const Student = require("../models/Student");
const Staff = require("../models/Staff");
const Course = require("../models/Course");
const StaffCourseAllocation = require("../models/StaffCourseAllocation");
const Enrollment = require("../models/Enrollment");
const Attendance = require("../models/Attendance");
const Assessment = require("../models/Assessment");
const StudentSkill = require("../models/StudentSkill");
const Notice = require("../models/Notice");

module.exports = {
  departments: { model: Department, label: "Departments" },
  students: { model: Student, label: "Students" },
  staff: { model: Staff, label: "Staff" },
  courses: { model: Course, label: "Courses" },
  allocations: { model: StaffCourseAllocation, label: "Staff Course Allocations" },
  enrollments: { model: Enrollment, label: "Enrollments" },
  attendance: { model: Attendance, label: "Attendance" },
  assessments: { model: Assessment, label: "Assessments" },
  skills: { model: StudentSkill, label: "Student Skills" },
  notices: { model: Notice, label: "Timetable / Notices" }
};
