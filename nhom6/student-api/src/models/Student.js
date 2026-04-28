const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên sinh viên là bắt buộc"],
      trim: true,
    },
    studentId: {
      type: String,
      required: [true, "Mã sinh viên là bắt buộc"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email là bắt buộc"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
    },
    major: {
      type: String,
      required: [true, "Ngành học là bắt buộc"],
      trim: true,
    },
    score: {
      type: Number,
      default: 0,
      min: [0, "Điểm không được nhỏ hơn 0"],
      max: [100, "Điểm không được lớn hơn 100"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Không trả về sinh viên đã bị xóa mềm trong các truy vấn mặc định
studentSchema.pre(/^find/, function (next) {
  // Chỉ áp dụng nếu chưa có điều kiện isDeleted
  if (this.getQuery().isDeleted === undefined) {
    this.where({ isDeleted: false });
  }
  next();
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
