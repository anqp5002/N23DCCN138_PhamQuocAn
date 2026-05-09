import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result.error) {
      setError("Sai tên đăng nhập hoặc mật khẩu");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', minHeight: '80vh', justifyContent: 'center' }}>
      <div className="access-control" style={{ width: '100%', maxWidth: '500px', marginBottom: 0 }}>
        <div className="login-panel">
          <h3>Đăng Nhập - Nhóm 9 (Phạm Quốc An)</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit">Đăng Nhập</button>
            </div>
          </form>
          {error && <p style={{ color: "#d32f2f", marginBottom: "15px", fontWeight: "600" }}>{error}</p>}
          <div className="demo-credentials">
            <p><strong>Thông tin đăng nhập demo:</strong></p>
            <p>Sinh viên: <code>student</code> / <code>123456</code> (ROLE_STUDENT)</p>
            <p>Cố vấn: <code>advisor</code> / <code>123456</code> (ROLE_ADVISOR)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
