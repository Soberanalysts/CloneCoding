const express = require('express');
const cors = require('cors'); // CORS 미들웨어 추가

const app = express();
app.use(cors()); // 모든 도메인에서의 요청 허용

// 특정 도메인만 허용하려면 ↓
// app.use(cors({ origin: "http://127.0.0.1:5500" }));

app.get('/data', (req, res) => {
    res.json({ message: "CORS 문제 해결!" });
});

app.listen(3000, () => console.log("서버 실행 중!"));