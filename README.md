# College Department Management System (MERN)

A full-stack college department management application built with MongoDB Community Server, Express, React (Vite), Node.js, Mongoose, Axios, and React Router.

## Features
- Dashboard with counts for all 10 modules and recent records
- CRUD operations for Departments, Students, Staff, Courses, Staff Course Allocations, Enrollments, Attendance, Assessments/Marks, Student Skills/Performance, and Timetable/Notices
- Search/filtering and responsive admin layout
- MongoDB persistence through Mongoose
- API validation, error handling, and health endpoint

## Requirements
- Node.js LTS
- MongoDB Community Server running locally
- npm

## 1. Start MongoDB
On Windows, open `services.msc` and start **MongoDB Server**, if installed as a service.

## 2. Backend
Open a terminal in `backend`:
```bash
npm install
```
Copy `.env.example` to `.env` (or create `.env`) and use:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/college_department_db
CLIENT_URL=http://localhost:5173
```
Start the API:
```bash
npm run dev
```
API: http://localhost:5000  
Health check: http://localhost:5000/api/health

## 3. Frontend
Open a second terminal in `frontend`:
```bash
npm install
npm run dev
```
Open the URL printed by Vite, usually http://localhost:5173.

## Notes
- The frontend is a CRUD admin interface. Use the sidebar to open a module, search records, add, edit, or delete.
- Relationship fields are stored as IDs/strings for simplicity in this educational project. Add records in this order for cleaner references: Departments → Students/Staff/Courses → Allocations/Enrollments → Attendance/Assessments/Skills.
- This starter has no authentication or role-based access control. Add authentication before exposing it outside a trusted local environment.
