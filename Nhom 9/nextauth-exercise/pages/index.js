import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [classList, setClassList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [secondsUntilExpire, setSecondsUntilExpire] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Đếm ngược và tự động đăng xuất khi hết hạn
  useEffect(() => {
    if (!session?.accessTokenExpires) return;

    if (session.error === "RefreshTokenExpired") {
      console.log("Refresh token đã hết hạn, đang tiến hành đăng xuất...");
      signOut({ redirect: true, callbackUrl: "/login" });
      return;
    }

    const updateCountdown = () => {
      const secondsLeft = Math.max(0, Math.ceil((session.accessTokenExpires - Date.now()) / 1000));
      setSecondsUntilExpire(secondsLeft);

      if (secondsLeft === 0) {
        console.log("Token đã hết hạn, đang tiến hành đăng xuất...");
        signOut({ redirect: true, callbackUrl: "/login" });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [session?.accessTokenExpires, session]);

  if (status === "loading" || !mounted) {
    return <div className="container" style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>Đang tải dữ liệu...</div>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  if (session.user.role !== "ROLE_ADVISOR") {
    return (
      <div className="container" style={{ display: 'flex', alignItems: 'center', minHeight: '80vh', justifyContent: 'center' }}>
        <div className="access-denied">
          <div style={{ fontSize: '48px', color: '#d32f2f', marginBottom: '20px' }}>❌</div>
          <h3>Bị Từ Chối Truy Cập</h3>
          <p>Bạn không có quyền truy cập trang này. Chỉ Cố Vấn (ROLE_ADVISOR) mới được phép.</p>
          <div className="role-badge">Vai trò hiện tại: {session.user.role}</div>
          <button 
            onClick={() => signOut()} 
            style={{ width: "100%", marginTop: "20px", padding: "10px", background: "#d32f2f", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: '600' }}
          >
            Đăng Xuất
          </button>
        </div>
      </div>
    );
  }

  const handleFetchClassList = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setClassList({
        classes: [
          { id: 1, name: "Lớp A1", students: 30 },
          { id: 2, name: "Lớp A2", students: 28 },
          { id: 3, name: "Lớp A3", students: 32 },
        ],
        accessToken: session.accessToken.substring(0, 20) + "...",
        expiresAt: new Date(session.accessTokenExpires).toLocaleTimeString("vi-VN"),
        timestamp: new Date().toLocaleTimeString("vi-VN"),
      });
    } catch (error) {
      setClassList({ error: "Lỗi khi lấy danh sách lớp" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="advisor-section">
        <h2 style={{ marginBottom: "30px", color: "#333", textAlign: "center" }}>Dashboard Cố Vấn - Nhóm 9 (Phạm Quốc An)</h2>
        
        <div className="dashboard-panel">
          <div className="dashboard-header" style={{ border: secondsUntilExpire !== null && secondsUntilExpire <= 10 ? '2px solid #d32f2f' : 'none' }}>
            <h4>Thông Tin Phiên Đăng Nhập</h4>
            <div className="dashboard-info">
              <span className="label">Người dùng:</span>
              <span className="value">{session.user.username}</span>
            </div>
            <div className="dashboard-info">
              <span className="label">Vai trò:</span>
              <span className="value">{session.user.role}</span>
            </div>
            <div className="dashboard-info">
              <span className="label">Access Token hết hạn sau:</span>
              <span className="value token-time" style={{ color: secondsUntilExpire !== null && secondsUntilExpire <= 10 ? '#d32f2f' : '#28a745' }}>
                {secondsUntilExpire !== null ? `${secondsUntilExpire}s` : '...'}
              </span>
            </div>
            <div className="dashboard-info">
              <span className="label">Token hiện tại:</span>
              <span className="value">{session.accessToken.substring(0, 30)}...</span>
            </div>
            
            {secondsUntilExpire !== null && secondsUntilExpire <= 10 && secondsUntilExpire > 0 && (
              <p style={{ color: "#d32f2f", fontWeight: "bold", marginTop: "10px", fontSize: "13px" }}>
                Cảnh báo: Token sắp hết hạn! Hệ thống sẽ tự động đăng xuất nếu không refresh.
              </p>
            )}
            
            {session.error && (
              <p style={{ color: "#d32f2f", fontWeight: "bold", marginTop: "10px", fontSize: "13px" }}>
                Lỗi: {session.error} - Vui lòng đăng nhập lại.
              </p>
            )}
          </div>

          <div style={{ marginBottom: "20px", fontSize: "14px", color: "#333" }}>
            <strong>Demo Refresh Token:</strong>
            <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
              <li style={{ padding: "4px 0" }}>Nhấn "Lấy danh sách lớp" khi token còn hạn để gọi API.</li>
              <li style={{ padding: "4px 0" }}>Đợi đếm ngược hiển thị token hết hạn hoặc gần hết.</li>
              <li style={{ padding: "4px 0" }}>Nhấn lại nút, NextAuth sẽ tự động gọi refresh token ngầm và lấy token mới trước khi gọi API.</li>
              <li style={{ padding: "4px 0" }}>Có thể mở Console F12 để theo dõi log quá trình refresh.</li>
            </ul>
          </div>

          <div className="buttons-group">
            <button
              onClick={handleFetchClassList}
              disabled={loading}
              className="btn btn-primary"
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Đang tải dữ liệu..." : "Lấy danh sách lớp"}
            </button>
            <button
              onClick={() => signOut()}
              className="btn btn-danger"
            >
              Đăng Xuất
            </button>
          </div>

          {classList && (
            <div className="result-box" style={{ display: 'block' }}>
              <h5>Kết quả trả về từ API giả lập:</h5>
              <pre>
                {JSON.stringify(classList, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
