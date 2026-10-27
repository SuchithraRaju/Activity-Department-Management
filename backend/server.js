require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const seedDatabase = require("./seed");
const studentAcademicRoutes = require("./routes/studentAcademic");
const resourceRoutes = require("./routes/resourceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => res.json({ message: "College Department Management System API", status: "running" }));
app.get("/api/health", (req, res) => res.json({ status: "OK" }));
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", resourceRoutes);
app.use("/api/student-academic", studentAcademicRoutes);
app.use((req, res) => res.status(404).json({ message: "API route not found" }));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB()
  .then(async () => {
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`API running at http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error("Unable to start API:", error.message);
    process.exit(1);
  });