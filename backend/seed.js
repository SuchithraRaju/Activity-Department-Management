
const Department = require("./models/Department");
const Student = require("./models/Student");
const Staff = require("./models/Staff");
const Course = require("./models/Course");
const StaffCourseAllocation = require("./models/StaffCourseAllocation");
const Enrollment = require("./models/Enrollment");
const Attendance = require("./models/Attendance");
const Assessment = require("./models/Assessment");
const StudentSkill = require("./models/StudentSkill");
const StudentAcademicProfile = require("./models/StudentAcademicProfile");
const SubjectAttendance = require("./models/SubjectAttendance");
const Notice = require("./models/Notice");

const departments = [
  {
    name: "Computer Science and Engineering",
    code: "CSE",
    hod: "Dr. Meena Krishnan",
    email: "cse@democollege.edu",
    phone: "9876501001",
    description: "Programming, software engineering, AI and machine learning"
  },
  {
    name: "Information Technology",
    code: "IT",
    hod: "Dr. Arun Kumar",
    email: "it@democollege.edu",
    phone: "9876501002",
    description: "Web development, cloud computing and information systems"
  },
  {
    name: "Electronics and Communication Engineering",
    code: "ECE",
    hod: "Dr. Priya Raman",
    email: "ece@democollege.edu",
    phone: "9876501003",
    description: "Electronics, communication systems and VLSI design"
  },
  {
    name: "Electrical and Electronics Engineering",
    code: "EEE",
    hod: "Dr. Ravi Shankar",
    email: "eee@democollege.edu",
    phone: "9876501004",
    description: "Electrical machines, power systems and renewable energy"
  },
  {
    name: "Mechanical Engineering",
    code: "MECH",
    hod: "Dr. Suresh Babu",
    email: "mech@democollege.edu",
    phone: "9876501005",
    description: "Manufacturing, mechanical design and robotics"
  },
  {
    name: "Civil Engineering",
    code: "CIVIL",
    hod: "Dr. Lakshmi Devi",
    email: "civil@democollege.edu",
    phone: "9876501006",
    description: "Structural engineering, construction and surveying"
  },
  {
    name: "Artificial Intelligence and Data Science",
    code: "AIDS",
    hod: "Dr. Kavitha Srinivasan",
    email: "aids@democollege.edu",
    phone: "9876501007",
    description: "Data analytics, machine learning and intelligent systems"
  },
  {
    name: "Artificial Intelligence and Machine Learning",
    code: "AIML",
    hod: "Dr. Sanjay Kumar",
    email: "aiml@democollege.edu",
    phone: "9876501008",
    description: "Artificial intelligence, neural networks and deep learning"
  },
  {
    name: "Cyber Security",
    code: "CYBER",
    hod: "Dr. Vignesh Raj",
    email: "cyber@democollege.edu",
    phone: "9876501009",
    description: "Network security, cryptography and digital forensics"
  },
  {
    name: "Biomedical Engineering",
    code: "BME",
    hod: "Dr. Anitha Joseph",
    email: "bme@democollege.edu",
    phone: "9876501010",
    description: "Medical devices, biomedical instrumentation and healthcare"
  },
  {
    name: "Chemical Engineering",
    code: "CHEM",
    hod: "Dr. Prakash Narayanan",
    email: "chem@democollege.edu",
    phone: "9876501011",
    description: "Chemical processes, industrial chemistry and process design"
  },
  {
    name: "Master of Business Administration",
    code: "MBA",
    hod: "Dr. Rekha Menon",
    email: "mba@democollege.edu",
    phone: "9876501012",
    description: "Management, finance, marketing and business administration"
  }
];

const facultyNames = [
  [
    "Dr. Meena Krishnan",
    "Prof. Karthik Subramanian",
    "Dr. Divya Balasubramaniam",
    "Prof. Ramesh Iyer"
  ],
  [
    "Dr. Arun Kumar",
    "Prof. Swetha Nair",
    "Dr. Senthil Kumar",
    "Prof. Nandhini Raj"
  ],
  [
    "Dr. Priya Raman",
    "Prof. Balaji Raman",
    "Dr. Deepa Krishnan",
    "Prof. Naveen Prasad"
  ],
  [
    "Dr. Ravi Shankar",
    "Prof. Gayathri Mohan",
    "Dr. Mahesh Babu",
    "Prof. Malini Devi"
  ],
  [
    "Dr. Suresh Babu",
    "Prof. Ashwin Raj",
    "Dr. Revathi Suresh",
    "Prof. Gokul Nathan"
  ],
  [
    "Dr. Lakshmi Devi",
    "Prof. Sandhya Rao",
    "Dr. Vasanth Kumar",
    "Prof. Abinaya Raj"
  ],
  [
    "Dr. Kavitha Srinivasan",
    "Prof. Saravanan Mani",
    "Dr. Monisha Devi",
    "Prof. Chandru Sekar"
  ],
  [
    "Dr. Sanjay Kumar",
    "Prof. Uma Maheshwari",
    "Dr. Dinesh Anand",
    "Prof. Sangeetha Ravi"
  ],
  [
    "Dr. Vignesh Raj",
    "Prof. Praveen Kumar",
    "Dr. Harini Shankar",
    "Prof. Siva Prakash"
  ],
  [
    "Dr. Anitha Joseph",
    "Prof. Aarthi Rajan",
    "Dr. Kannan Murugan",
    "Prof. Bhavya Lakshmi"
  ],
  [
    "Dr. Prakash Narayanan",
    "Prof. Mohan Das",
    "Dr. Janani Krishnan",
    "Prof. Anand Selvam"
  ],
  [
    "Dr. Rekha Menon",
    "Prof. Keerthana Mani",
    "Dr. Priyanka Sharma",
    "Prof. Hari Prakash"
  ]
];

const firstNames = [
  "Aarav", "Nila", "Vikram", "Ananya", "Rahul",
  "Ishita", "Kavin", "Priya", "Aditya", "Divya",
  "Arjun", "Kavya", "Rohan", "Sneha", "Harish",
  "Meera", "Surya", "Keerthi", "Pranav", "Sanjana",
  "Gokul", "Aishwarya", "Manoj", "Janani", "Dinesh"
];

const lastNames = [
  "Kumar", "Raj", "Sharma", "Krishnan",
  "Raman", "Devi", "Prasad", "Nathan"
];

const subjects = {
  CSE: ["Programming Fundamentals", "Data Structures", "Database Management Systems", "Web Technology"],
  IT: ["Web Development", "Cloud Computing", "Database Systems", "Information Security"],
  ECE: ["Digital Electronics", "Signals and Systems", "Communication Systems", "VLSI Design"],
  EEE: ["Circuit Theory", "Electrical Machines", "Power Systems", "Renewable Energy"],
  MECH: ["Engineering Mechanics", "Thermodynamics", "Manufacturing Technology", "CAD Design"],
  CIVIL: ["Structural Engineering", "Surveying", "Concrete Technology", "Construction Management"],
  AIDS: ["Statistics", "Data Analytics", "Machine Learning", "Big Data"],
  AIML: ["Artificial Intelligence", "Deep Learning", "Neural Networks", "Python Programming"],
  CYBER: ["Network Security", "Cryptography", "Ethical Hacking", "Digital Forensics"],
  BME: ["Human Anatomy", "Biomedical Instrumentation", "Medical Imaging", "Biomaterials"],
  CHEM: ["Process Calculations", "Reaction Engineering", "Mass Transfer", "Process Control"],
  MBA: ["Marketing Management", "Financial Management", "Human Resources", "Business Analytics"]
};

async function upsert(Model, filter, document) {
  await Model.updateOne(
    filter,
    { $setOnInsert: document },
    { upsert: true, runValidators: true }
  );
}

async function seedDatabase() {
  console.log("Starting college demo data setup...");

  // Departments
  for (const department of departments) {
    await upsert(
      Department,
      { code: department.code },
      department
    );
  }

  const studentRecords = [];
  const staffRecords = [];
  const courseRecords = [];

  // Create 25 students, 4 faculty and 4 subjects per department.
  for (let d = 0; d < departments.length; d++) {
    const department = departments[d];
    const code = department.code;

    for (let i = 1; i <= 25; i++) {
      const registerNumber =
        `DEMO${code}${String(i).padStart(3, "0")}`;

      const name =
        `${firstNames[(i - 1) % firstNames.length]} ` +
        lastNames[(i + d) % lastNames.length];

      const student = {
        name,
        registerNumber,
        email: `${registerNumber.toLowerCase()}@example.edu`,
        phone: `91${String(d + 1).padStart(2, "0")}${String(i).padStart(7, "0")}`,
        year: String(((i - 1) % 4) + 1),
        semester: String((((i - 1) % 4) * 2) + 1),
        department: department.name,
        dateOfBirth: `${2003 + (i % 4)}-05-15`,
        status: "Active"
      };

      await upsert(Student, { registerNumber }, student);
      studentRecords.push(student);
    }

    for (let i = 0; i < 4; i++) {
      const employeeId = `DEMO${code}F${i + 1}`;

      const staff = {
        name: facultyNames[d][i],
        employeeId,
        email: `${employeeId.toLowerCase()}@democollege.edu`,
        phone: `92${String(d + 1).padStart(2, "0")}${String(i + 1).padStart(7, "0")}`,
        designation: i === 0
          ? "Professor & HOD"
          : i === 1
          ? "Associate Professor"
          : "Assistant Professor",
        department: department.name,
        joiningDate: `${2018 + i}-06-01`
      };

      await upsert(Staff, { employeeId }, staff);
      staffRecords.push(staff);
    }

    for (let i = 0; i < subjects[code].length; i++) {
      const course = {
        name: subjects[code][i],
        code: `DM${code}${String(i + 1).padStart(2, "0")}`,
        department: department.name,
        credits: i === 1 ? 2 : 3,
        semester: String(i * 2 + 1),
        description: `${subjects[code][i]} - ${department.name}`
      };

      await upsert(Course, { code: course.code }, course);
      courseRecords.push(course);
    }
  }

  // Create academic and student-related records.
  for (const student of studentRecords) {
    const department = departments.find(
      item => item.name === student.department
    );

    const departmentCourses = courseRecords.filter(
      item => item.department === student.department
    );

    const departmentStaff = staffRecords.filter(
      item => item.department === student.department
    );

    const studentIndex = Number(student.registerNumber.slice(-3)) - 1;
    const course = departmentCourses[studentIndex % departmentCourses.length];
    const teacher = departmentStaff[studentIndex % departmentStaff.length];

    const studentDoc = await Student.findOne({
      registerNumber: student.registerNumber
    });

    if (!studentDoc) continue;

    await upsert(
      Enrollment,
      {
        studentName: student.name,
        courseName: course.name,
        academicYear: "2026-2027"
      },
      {
        studentName: student.name,
        courseName: course.name,
        academicYear: "2026-2027",
        semester: student.semester,
        enrolledOn: "2026-06-15",
        status: "Enrolled"
      }
    );

    await upsert(
      StaffCourseAllocation,
      {
        staffName: teacher.name,
        courseName: course.name,
        department: department.name,
        academicYear: "2026-2027"
      },
      {
        staffName: teacher.name,
        courseName: course.name,
        department: department.name,
        academicYear: "2026-2027",
        section: "A"
      }
    );

    // Create attendance records across 20 classes.
    const classesHeld = 20;
    const classesAttended = studentIndex % 10 === 0 ? 13 : 16 + (studentIndex % 5);

    await upsert(
      SubjectAttendance,
      {
        studentId: studentDoc._id,
        courseName: course.name,
        semester: Number(student.semester)
      },
      {
        studentId: studentDoc._id,
        courseName: course.name,
        department: department.name,
        semester: Number(student.semester),
        classesHeld,
        classesAttended,
        requiredPercentage: 75
      }
    );

    // Attendance collection uses individual class records.
    for (let day = 1; day <= 5; day++) {
      await upsert(
        Attendance,
        {
          studentName: student.name,
          courseName: course.name,
          date: `2026-10-${String(day).padStart(2, "0")}`
        },
        {
          studentName: student.name,
          courseName: course.name,
          date: `2026-10-${String(day).padStart(2, "0")}`,
          status: day === 5 && studentIndex % 10 === 0
            ? "Absent"
            : "Present",
          remarks: "Demonstration attendance record"
        }
      );
    }

    await upsert(
      Assessment,
      {
        studentName: student.name,
        courseName: course.name,
        assessmentType: "Internal",
        date: "2026-10-20"
      },
      {
        studentName: student.name,
        courseName: course.name,
        assessmentType: "Internal",
        maxMarks: 50,
        marksObtained: 30 + (studentIndex % 21),
        date: "2026-10-20",
        grade: studentIndex % 3 === 0 ? "A" : "B"
      }
    );

    await upsert(
      StudentSkill,
      {
        studentName: student.name,
        skillName: "Problem Solving",
        category: "Technical"
      },
      {
        studentName: student.name,
        skillName: "Problem Solving",
        category: "Technical",
        proficiency: studentIndex % 3 === 0 ? "Advanced" : "Intermediate",
        score: 65 + (studentIndex % 36),
        notes: "Sample academic skill record"
      }
    );

    await upsert(
      StudentAcademicProfile,
      { studentId: studentDoc._id },
      {
        studentId: studentDoc._id,
        registerNumber: student.registerNumber,
        department: student.department,
        year: Number(student.year),
        semester: Number(student.semester),
        section: "A",
        academics: {
          cgpa: Number((6.5 + (studentIndex % 35) / 10).toFixed(2)),
          arrears: studentIndex % 8 === 0 ? 1 : 0,
          previousSemesterGPA: Number((6.5 + (studentIndex % 30) / 10).toFixed(2))
        },
        technicalSkills: [{
          name: "Programming",
          level: "Intermediate",
          score: 75
        }],
        nonTechnicalSkills: [{
          name: "Teamwork",
          level: "Good",
          score: 80
        }],
        projects: [{
          title: `${department.code} Student Project`,
          description: "Demonstration academic project",
          technologies: ["Research", "Presentation"],
          status: "In Progress"
        }],
        certifications: [],
        achievements: ["Department participation"],
        internships: []
      }
    );
  }

  // Add a sample notice without replacing existing notices.
  await upsert(
    Notice,
    { title: "Welcome to the Academic Demo Portal" },
    {
      title: "Welcome to the Academic Demo Portal",
      type: "Notice",
      department: "All Departments",
      date: "2026-10-27",
      time: "09:00",
      venue: "College Portal",
      description: "Sample notice for demonstration purposes.",
      priority: "Normal"
    }
  );

  console.log("College demo data setup completed.");
  console.log("12 departments checked.");
  console.log("300 demo students checked.");
  console.log("48 named demo faculty checked.");
  console.log("48 subjects checked.");
  console.log("Academic records checked.");
}

module.exports = seedDatabase;
