# Student API - Nhóm 6

RESTful API quản lý sinh viên sử dụng **Node.js**, **Express.js** và **MongoDB Atlas**.

## Hướng dẫn cài đặt và chạy

### 1. Cài đặt dependencies

```bash
cd nhom6/student-api
npm install
```

### 2. Tạo file `.env`

Tạo file `.env` tại thư mục gốc `student-api/` với nội dung sau:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/student-db?retryWrites=true&w=majority
```

> **Lưu ý:** Thay `<username>`, `<password>`, `<cluster>` bằng thông tin MongoDB Atlas của bạn.
>
> Ví dụ: `mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/student-db?retryWrites=true&w=majority`

### 3. Chạy server

```bash
npm run dev
```

Server sẽ chạy tại `http://localhost:3000`

Swagger API Docs tại `http://localhost:3000/api-docs`

---

## Cấu trúc thư mục

```
student-api/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Student.js
│   ├── services/
│   │   └── student.service.js
│   ├── controllers/
│   │   └── student.controller.js
│   ├── routes/
│   │   └── student.routes.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── validateObjectId.js
│   ├── container/
│   │   └── index.js
│   └── app.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── swagger.json
```

## API Endpoints

### 1. CRUD Cơ Bản

| Method   | Endpoint             | Mô tả                                         |
| -------- | -------------------- | ---------------------------------------------- |
| `POST`   | `/api/students`      | Tạo sinh viên mới                              |
| `GET`    | `/api/students`      | Lấy danh sách (pagination + filter theo major) |
| `GET`    | `/api/students/:id`  | Lấy chi tiết sinh viên                         |
| `PUT`    | `/api/students/:id`  | Cập nhật thông tin sinh viên                   |
| `DELETE` | `/api/students/:id`  | Soft delete sinh viên                          |

### 2. API Cập Nhật Điểm

| Method  | Endpoint                   | Mô tả                          |
| ------- | -------------------------- | ------------------------------- |
| `PATCH` | `/api/students/:id/score`  | Cập nhật điểm (validate 0-100) |

### 3. API Nâng Cao

| Method | Endpoint                         | Mô tả                       |
| ------ | -------------------------------- | ---------------------------- |
| `GET`  | `/api/students/top?limit=5`      | Top sinh viên theo điểm     |
| `GET`  | `/api/students/stats/avg`        | Tính điểm trung bình        |
| `GET`  | `/api/students/search?q=keyword` | Tìm kiếm sinh viên theo tên |

## Ví dụ Request

### Tạo sinh viên

```bash
POST /api/students
Content-Type: application/json

{
  "name": "Nguyễn Văn A",
  "studentId": "SV001",
  "email": "nguyenvana@email.com",
  "major": "Công nghệ thông tin",
  "score": 85
}
```

### Lấy danh sách với pagination và filter

```bash
GET /api/students?page=1&limit=10&major=CNTT
```

### Cập nhật điểm

```bash
PATCH /api/students/:id/score
Content-Type: application/json

{
  "score": 95
}
```

## Công nghệ sử dụng

- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM
- **Swagger UI** - API documentation
