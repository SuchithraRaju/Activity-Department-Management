
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Users, GraduationCap, BookOpen, ClipboardList } from "lucide-react";
import api from "../services/api";

export default function DepartmentDetail() {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [courses, setCourses] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDepartment() {
      setLoading(true);
      setError("");

      try {
        const [d, s, f, c, a, at, marks, en, n] = await Promise.all([
          api.get(`/departments/${id}`),
          api.get("/students"),
          api.get("/staff"),
          api.get("/courses"),
          api.get("/allocations"),
          api.get("/attendance"),
          api.get("/assessments"),
          api.get("/enrollments"),
          api.get("/notices"),
        ]);

        const dept = d.data.data;
        const departmentName = dept.name;

        const allStudents = s.data.data || [];
        const allStaff = f.data.data || [];
        const allCourses = c.data.data || [];
        const allAllocations = a.data.data || [];
        const allAttendance = at.data.data || [];
        const allAssessments = marks.data.data || [];
        const allEnrollments = en.data.data || [];
        const allNotices = n.data.data || [];

        const deptStudents = allStudents.filter(
          (x) => x.department === departmentName
        );
        const deptStaff = allStaff.filter(
          (x) => x.department === departmentName
        );
        const deptCourses = allCourses.filter(
          (x) => x.department === departmentName
        );
        const deptAllocations = allAllocations.filter(
          (x) => x.department === departmentName
        );

        const studentNames = new Set(deptStudents.map((x) => x.name));
        const courseNames = new Set(deptCourses.map((x) => x.name));

        setDepartment(dept);
        setStudents(deptStudents);
        setStaff(deptStaff);
        setCourses(deptCourses);
        setAllocations(deptAllocations);
        setAttendance(
          allAttendance.filter(
            (x) =>
              studentNames.has(x.studentName) ||
              courseNames.has(x.courseName)
          )
        );
        setAssessments(
          allAssessments.filter(
            (x) =>
              studentNames.has(x.studentName) ||
              courseNames.has(x.courseName)
          )
        );
        setEnrollments(
          allEnrollments.filter(
            (x) =>
              studentNames.has(x.studentName) ||
              courseNames.has(x.courseName)
          )
        );
        setNotices(
          allNotices.filter(
            (x) =>
              x.department === departmentName ||
              x.department === "All Departments"
          )
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load department details. Check the backend and database."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDepartment();
  }, [id]);

  if (loading) return <div className="panel empty-state">Loading department details...</div>;

  if (error) {
    return (
      <div className="page-stack">
        <div className="alert alert-error">{error}</div>
        <Link className="button button-light" to="/module/departments">
          <ArrowLeft size={15} /> Back to departments
        </Link>
      </div>
    );
  }

  if (!department) return <div className="alert alert-error">Department not found.</div>;

  const stats = [
    { label: "Students", value: students.length, icon: GraduationCap },
    { label: "Faculty & Staff", value: staff.length, icon: Users },
    { label: "Subjects", value: courses.length, icon: BookOpen },
    { label: "Faculty Allocations", value: allocations.length, icon: ClipboardList },
  ];

  const Table = ({ title, rows, fields, empty }) => (
    <section className="panel records-panel">
      <div className="records-toolbar">
        <div>
          <h2>{title}</h2>
          <p>{rows.length} record(s)</p>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="empty-state">
          <p>{empty || "No records are linked to this department yet."}</p>
        </div>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>{fields.map((field) => <th key={field.key}>{field.label}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row._id || index}>
                  {fields.map((field) => (
                    <td key={field.key}>
                      {row[field.key] == null || row[field.key] === ""
                        ? "—"
                        : String(row[field.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );

  return (
    <div className="page-stack">
      <Link className="button button-light" to="/module/departments">
        <ArrowLeft size={15} /> Back to departments
      </Link>

      <section className="module-intro">
        <div>
          <div className="eyebrow">COLLEGE / DEPARTMENTS / {department.code}</div>
          <h1>{department.name}</h1>
          <p>{department.description || "Department information and academic records."}</p>
        </div>
        <span className="status-pill">{department.code}</span>
      </section>

      <section className="panel" style={{ padding: 20 }}>
        <h2>Department Information</h2>
        <div className="module-metrics">
          <div className="metric-card">
            <span className="metric-label">Head of Department</span>
            <strong className="metric-module">{department.hod || "Not assigned"}</strong>
          </div>
          <div className="metric-card">
            <span className="metric-label">Department Email</span>
            <strong className="metric-module">{department.email || "—"}</strong>
          </div>
          <div className="metric-card">
            <span className="metric-label">Contact Number</span>
            <strong className="metric-module">{department.phone || "—"}</strong>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map(({ label, value, icon: Icon }) => (
          <div className="stat-card" key={label}>
            <div className="stat-top"><div className="stat-icon"><Icon size={19} /></div></div>
            <div className="stat-number">{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </section>

      <Table
        title="Department Faculty & Staff"
        rows={staff}
        fields={[
          { key: "employeeId", label: "Employee ID" },
          { key: "name", label: "Name" },
          { key: "designation", label: "Designation" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
        ]}
      />

      <Table
        title="Department Students"
        rows={students}
        fields={[
          { key: "registerNumber", label: "Register Number" },
          { key: "name", label: "Student Name" },
          { key: "year", label: "Year" },
          { key: "semester", label: "Semester" },
          { key: "email", label: "Email" },
          { key: "status", label: "Status" },
        ]}
      />

      <Table
        title="Subjects & Courses"
        rows={courses}
        fields={[
          { key: "code", label: "Subject Code" },
          { key: "name", label: "Subject Name" },
          { key: "semester", label: "Semester" },
          { key: "credits", label: "Credits" },
          { key: "description", label: "Description" },
        ]}
      />

      <Table
        title="Faculty Subject Allocations"
        rows={allocations}
        fields={[
          { key: "staffName", label: "Faculty Name" },
          { key: "courseName", label: "Subject" },
          { key: "academicYear", label: "Academic Year" },
          { key: "section", label: "Section" },
        ]}
      />

      <Table
        title="Student Enrollments"
        rows={enrollments}
        fields={[
          { key: "studentName", label: "Student" },
          { key: "courseName", label: "Subject" },
          { key: "academicYear", label: "Academic Year" },
          { key: "semester", label: "Semester" },
          { key: "status", label: "Status" },
        ]}
      />

      <Table
        title="Attendance Records"
        rows={attendance}
        fields={[
          { key: "studentName", label: "Student" },
          { key: "courseName", label: "Subject" },
          { key: "date", label: "Date" },
          { key: "status", label: "Attendance" },
          { key: "remarks", label: "Remarks" },
        ]}
      />

      <Table
        title="Assessments & Marks"
        rows={assessments}
        fields={[
          { key: "studentName", label: "Student" },
          { key: "courseName", label: "Subject" },
          { key: "assessmentType", label: "Assessment" },
          { key: "marksObtained", label: "Marks" },
          { key: "maxMarks", label: "Maximum Marks" },
          { key: "grade", label: "Grade" },
        ]}
      />

      <Table
        title="Department Notices & Events"
        rows={notices}
        fields={[
          { key: "title", label: "Title" },
          { key: "type", label: "Type" },
          { key: "date", label: "Date" },
          { key: "time", label: "Time" },
          { key: "venue", label: "Venue" },
          { key: "priority", label: "Priority" },
        ]}
      />
    </div>
  );
}
