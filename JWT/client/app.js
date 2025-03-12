import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [message, setMessage] = useState("");

  // 로그인 요청
  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "user1", password: "password123" }),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    }
  };

  // 로그아웃 (토큰 삭제)
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  // 보호된 데이터 요청
  const fetchProtectedData = async () => {
    const res = await fetch("http://localhost:5000/protected", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setMessage(data.message || "Unauthorized");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>JWT 로그인 예제</h1>
      {token ? (
        <>
          <p>🔑 로그인 성공! 보호된 데이터에 접근할 수 있습니다.</p>
          <button onClick={fetchProtectedData}>보호된 데이터 가져오기</button>
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>로그아웃</button>
        </>
      ) : (
        <>
          <p>🔒 로그인 필요</p>
          <button onClick={handleLogin}>로그인</button>
        </>
      )}
      {message && <p style={{ marginTop: "20px", color: "green" }}>{message}</p>}
    </div>
  );
}

export default App;
