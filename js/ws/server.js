const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

console.log("✅ WebSocket 서버가 8080번 포트에서 실행 중");

wss.on("connection", function connection(ws) {
  console.log("클라이언트 연결됨");

  ws.on("message", function incoming(message) {
    console.log("📩 받은 메시지:", message.toString());

    // 받은 메시지를 그대로 다시 보냄
    ws.send(`서버 응답: ${message}`);
  });

  ws.send("환영합니다! 메시지를 보내보세요.");
});
