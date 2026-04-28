// Container - Dependency Injection
// Tập trung quản lý các dependencies

const studentService = require("../services/student.service");

// Export service instance để các controller sử dụng
module.exports = studentService;
