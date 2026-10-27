import { LayoutDashboard, Building2, GraduationCap, Users, BookOpen, ClipboardList, CalendarCheck, FileText, Award, Bell } from "lucide-react";
export const modules = {
 departments:{label:"Departments",icon:Building2,description:"Manage academic departments and department information."},
 students:{label:"Students",icon:GraduationCap,description:"Manage student records and academic information."},
 staff:{label:"Faculty & Staff",icon:Users,description:"Manage faculty and staff details."},
 courses:{label:"Subjects & Courses",icon:BookOpen,description:"Maintain courses, subjects and credits."},
 allocations:{label:"Faculty Subject Allocations",icon:ClipboardList,description:"View and manage subjects assigned to faculty."},
 enrollments:{label:"Enrollments",icon:FileText,description:"Track student course enrollments."},
 attendance:{label:"Attendance",icon:CalendarCheck,description:"Record and review student attendance."},
 assessments:{label:"Assessments & Marks",icon:Award,description:"Manage assessments, marks and grades."},
 skills:{label:"Student Skills",icon:Award,description:"Track technical and non-technical skills."},
 notices:{label:"Timetable / Notices",icon:Bell,description:"Manage notices, events and timetable information."}
};
export const navItems = [{label:"Dashboard",path:"/",icon:LayoutDashboard}];
