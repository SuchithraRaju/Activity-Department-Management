const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  type: { type: String, required: true, enum: ["Notice", "Timetable", "Event", "Deadline"] },
  department: { type: String, trim: true },
  date: { type: String, trim: true },
  time: { type: String, trim: true },
  venue: { type: String, trim: true },
  description: { type: String, trim: true },
  priority: { type: String, enum: ["Normal", "Important", "Urgent"] }
}, { timestamps: true });

module.exports = mongoose.model("Notice", NoticeSchema);
