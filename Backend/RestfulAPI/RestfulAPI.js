const express = require("express");
const app = express();
app.use(express.json());

let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

// ✅ RESTful API 예제
app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (user) res.json(user);
    else res.status(404).json({ message: "User not found" });
});

app.post("/users", (req, res) => {
    const { name } = req.body;
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const user = users.find(u => u.id === id);
    if (user) {
        user.name = name;
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(u => u.id !== id);
    res.json({ message: "User deleted" });
});

app.listen(4000, () => console.log("RestfulAPI Server running on port 4000"));

// # RESTful한 방식 (HTTP 메서드 활용)
// GET http://localhost:4000/users/1  # 특정 사용자 조회
// POST http://localhost:4000/users   # 새로운 사용자 추가 (JSON body 필요)
// PUT http://localhost:4000/users/2  # 특정 사용자 수정 (JSON body 필요)
// DELETE http://localhost:4000/users/2  # 특정 사용자 삭제