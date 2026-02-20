import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// GET /api/students — fetch all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/students/:id — fetch a single student by studentId
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.id });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/students — add a new student
router.post("/", async (req, res) => {
  try {
    const { studentId, name, email, department, phone, attendance } = req.body;

    // Check if student ID already exists
    const existing = await Student.findOne({ studentId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "A student with this ID already exists" });
    }

    const student = new Student({ studentId, name, email, department, phone, attendance: attendance ?? 0 });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/students/:id — update a student by studentId
router.put("/:id", async (req, res) => {
  try {
    const { name, email, department, phone, attendance } = req.body;
    const student = await Student.findOneAndUpdate(
      { studentId: req.params.id },
      { name, email, department, phone, ...(attendance !== undefined && { attendance }) },
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/students/:id — delete a student by studentId
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      studentId: req.params.id,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
