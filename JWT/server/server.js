const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "mysecretkey"; // JWT 서명용 키 (실제 서비스에서는 환경변수 사용)

// 가짜 사용자 데이터
const users = [{ id: 1, username: "user1", password: "password123" }];

// 로그인 엔드포인트 (JWT 발급)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // JWT 생성 (30분 유효기간)
  const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: "30m" });

  res.json({ token });
});

// 보호된 라우트 (JWT 검증)
app.get("/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    res.json({ message: "Welcome to protected route!", user: decoded });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));