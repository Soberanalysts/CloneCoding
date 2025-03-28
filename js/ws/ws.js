const socket = new WebSocket("ws://localhost:8080");

const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatLog = document.getElementById("chatLog");

// 서버로부터 메시지 받음
socket.addEventListener("message", function (event) {
  const li = document.createElement("li");
  li.textContent = `📥 서버: ${event.data}`;
  chatLog.appendChild(li);
});

// 버튼 클릭 시 서버로 메시지 전송
sendBtn.addEventListener("click", () => {
  const message = input.value;
  socket.send(message);

  const li = document.createElement("li");
  li.textContent = `📤 나: ${message}`;
  chatLog.appendChild(li);
  input.value = "";
});