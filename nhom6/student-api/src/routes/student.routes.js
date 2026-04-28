const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const validateObjectId = require("../middlewares/validateObjectId");

// API nâng cao (đặt trước các route có :id để tránh conflict)
// GET /api/students/top?limit=5 - Lấy top sinh viên theo điểm
router.get("/top", studentController.getTopStudents);

// GET /api/students/stats/avg - Tính điểm trung bình
router.get("/stats/avg", studentController.getAverageScore);

// GET /api/students/search?q=keyword - Tìm kiếm sinh viên theo tên
router.get("/search", studentController.searchStudents);

// CRUD cơ bản
// POST /api/students - Tạo sinh viên mới
router.post("/", studentController.createStudent);

// GET /api/students - Lấy danh sách sinh viên
router.get("/", studentController.getAllStudents);

// GET /api/students/:id - Lấy chi tiết sinh viên
router.get("/:id", validateObjectId, studentController.getStudentById);

// PUT /api/students/:id - Cập nhật sinh viên
router.put("/:id", validateObjectId, studentController.updateStudent);

// DELETE /api/students/:id - Xóa sinh viên (soft delete)
router.delete("/:id", validateObjectId, studentController.deleteStudent);

// API cập nhật điểm
// PATCH /api/students/:id/score - Cập nhật điểm
router.patch("/:id/score", validateObjectId, studentController.updateScore);

module.exports = router;
