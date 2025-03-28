const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
// const io = new Server(http);


const io = new Server(http, {
    cors: {
      origin: ["http://localhost:5500", "http://127.0.0.1:5500"], // Live Server 포트
      methods: ["GET", "POST"]
    }
  });


app.use(express.static("public")); // public 폴더 정적 서비스


io.on("connection", (socket) => {
  console.log("👤 사용자 연결됨",socket.id);

  socket.on("chat message", (msg) => {
    console.log("📩 받은 메시지:", msg);
    io.emit("chat message", msg); // 모든 클라이언트에게 전송 (브로드캐스트)
  });

  socket.on("disconnect", () => {
    console.log("❌ 사용자 연결 해제");
  });
});

http.listen(3000, () => {
  console.log("✅ 서버 실행 중: http://localhost:3000");
});
