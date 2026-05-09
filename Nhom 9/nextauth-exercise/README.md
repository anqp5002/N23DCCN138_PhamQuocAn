# NextAuth Token Refresh Exercise - Nhóm 9 (Phạm Quốc An - N23DCCN138)

Bài tập thực hành: Tự động refresh token và phân quyền truy cập với NextAuth

Chào bạn huy hẹ hẹ hẹ

## Yêu Cầu
- Node.js >= 16
- npm hoặc yarn

## Hướng Dẫn Chạy

1. Cài đặt các thư viện:
```bash
npm install
```

2. Khởi chạy ứng dụng:
```bash
npm run dev
```

3. Truy cập ứng dụng tại: http://localhost:3000

## Thông tin Đăng Nhập

| Tên đăng nhập | Mật khẩu | Vai trò      |
|---------------|----------|--------------|
| student       | 123456   | ROLE_STUDENT |
| advisor       | 123456   | ROLE_ADVISOR |

Lưu ý: Chỉ tài khoản có vai trò ROLE_ADVISOR mới có quyền truy cập vào dashboard.

## Chi Tiết Yêu Cầu Bài Tập

### 1. Đăng Nhập và Lưu Trữ Token
- Cấu hình CredentialsProvider.
- Khi đăng nhập, nhận về accessToken (60s) và refreshToken (1 ngày).
- Lưu thông tin token và vai trò người dùng vào JWT và Session.

### 2. Phân Quyền Truy Cập
- Trang Dashboard (/) chỉ cho phép ROLE_ADVISOR.
- Nếu đăng nhập bằng ROLE_STUDENT sẽ hiển thị thông báo "Bị Từ Chối Truy Cập".
- Chưa đăng nhập sẽ bị chuyển hướng về trang /login.

### 3. Demo Refresh Token
- Dashboard có nút "Lấy danh sách lớp". Nút này giả lập gọi API, cần accessToken.
- Khi accessToken sắp hoặc đã hết hạn, NextAuth sẽ tự động sử dụng refreshToken để lấy accessToken mới ngầm dưới background mà không ảnh hưởng tới trải nghiệm người dùng.
