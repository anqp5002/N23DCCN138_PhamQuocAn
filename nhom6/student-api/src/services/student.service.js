const Student = require("../models/Student");

class StudentService {
  // Tạo sinh viên mới
  async createStudent(data) {
    const student = new Student(data);
    return await student.save();
  }

  // Lấy danh sách sinh viên với pagination và filter
  async getAllStudents({ page = 1, limit = 10, major }) {
    const query = { isDeleted: false };

    // Filter theo major nếu có
    if (major) {
      query.major = { $regex: major, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const [students, total] = await Promise.all([
      Student.find(query).skip(skip).limit(parseInt(limit)).sort({ createdAt: -1 }),
      Student.countDocuments(query),
    ]);

    return {
      students,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Lấy chi tiết sinh viên theo ID
  async getStudentById(id) {
    return await Student.findOne({ _id: id, isDeleted: false });
  }

  // Cập nhật thông tin sinh viên
  async updateStudent(id, data) {
    return await Student.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      { new: true, runValidators: true }
    );
  }

  // Soft delete sinh viên
  async softDeleteStudent(id) {
    return await Student.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
  }

  // Cập nhật điểm sinh viên
  async updateScore(id, score) {
    return await Student.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { score },
      { new: true, runValidators: true }
    );
  }

  // Lấy top sinh viên theo điểm
  async getTopStudents(limit = 5) {
    return await Student.find({ isDeleted: false })
      .sort({ score: -1 })
      .limit(parseInt(limit));
  }

  // Tính điểm trung bình
  async getAverageScore() {
    const result = await Student.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: null,
          averageScore: { $avg: "$score" },
          totalStudents: { $sum: 1 },
        },
      },
    ]);

    if (result.length === 0) {
      return { averageScore: 0, totalStudents: 0 };
    }

    return {
      averageScore: Math.round(result[0].averageScore * 100) / 100,
      totalStudents: result[0].totalStudents,
    };
  }

  // Tìm kiếm sinh viên theo tên
  async searchStudents(keyword) {
    return await Student.find({
      isDeleted: false,
      name: { $regex: keyword, $options: "i" },
    });
  }
}

module.exports = new StudentService();
