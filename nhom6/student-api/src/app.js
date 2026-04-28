const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/student.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/students", studentRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Student API - Nhóm 6 đang hoạt động!",
    endpoints: {
      students: "/api/students",
      top: "/api/students/top?limit=5",
      stats: "/api/students/stats/avg",
      search: "/api/students/search?q=keyword",
    },
  });
});

// Swagger docs (nếu có)
try {
  const swaggerUi = require("swagger-ui-express");
  const swaggerDocument = require("../swagger.json");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log("Swagger docs available at /api-docs");
} catch (error) {
  // Swagger chưa được cấu hình - bỏ qua
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} không tìm thấy`,
  });
});

// Error handler
app.use(errorHandler);

module.exports = app;
