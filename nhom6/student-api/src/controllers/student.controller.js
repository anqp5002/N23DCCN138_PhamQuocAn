const studentService = require("../container");

// Tạo sinh viên mới
const createStudent = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json({
      success: true,
      message: "Tạo sinh viên thành công",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy danh sách sinh viên
const getAllStudents = async (req, res, next) => {
  try {
    const { page, limit, major } = req.query;
    const result = await studentService.getAllStudents({ page, limit, major });
    res.status(200).json({
      success: true,
      message: "Lấy danh sách sinh viên thành công",
      data: result.students,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy chi tiết sinh viên
const getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sinh viên",
      });
    }
    res.status(200).json({
      success: true,
      message: "Lấy thông tin sinh viên thành công",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Cập nhật sinh viên
const updateStudent = async (req, res, next) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sinh viên",
      });
    }
    res.status(200).json({
      success: true,
      message: "Cập nhật sinh viên thành công",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Xóa sinh viên (soft delete)
const deleteStudent = async (req, res, next) => {
  try {
    const student = await studentService.softDeleteStudent(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sinh viên",
      });
    }
    res.status(200).json({
      success: true,
      message: "Xóa sinh viên thành công (soft delete)",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Cập nhật điểm sinh viên
const updateScore = async (req, res, next) => {
  try {
    const { score } = req.body;

    // Validate score
    if (score === undefined || score === null) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ: field 'score' là bắt buộc",
      });
    }

    if (typeof score !== "number" || score < 0 || score > 100) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ: score phải là số trong khoảng 0 - 100",
      });
    }

    const student = await studentService.updateScore(req.params.id, score);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sinh viên",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật điểm thành công",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy top sinh viên theo điểm
const getTopStudents = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const students = await studentService.getTopStudents(limit);
    res.status(200).json({
      success: true,
      message: `Top ${limit || 5} sinh viên theo điểm`,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// Tính điểm trung bình
const getAverageScore = async (req, res, next) => {
  try {
    const result = await studentService.getAverageScore();
    res.status(200).json({
      success: true,
      message: "Tính điểm trung bình thành công",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Tìm kiếm sinh viên theo tên
const searchStudents = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp từ khóa tìm kiếm (q)",
      });
    }
    const students = await studentService.searchStudents(q);
    res.status(200).json({
      success: true,
      message: `Kết quả tìm kiếm cho '${q}'`,
      data: students,
      total: students.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  updateScore,
  getTopStudents,
  getAverageScore,
  searchStudents,
};
