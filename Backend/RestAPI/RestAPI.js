const express = require("express");
const app = express();
app.use(express.json());

let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

// ✅ REST 원칙을 따르지 않은 API 예제
app.get("/getUser", (req, res) => {
    const id = parseInt(req.query.id);
    const user = users.find(u => u.id === id);
    if (user) res.json(user);
    else res.status(404).json({ message: "User not found" });
});

app.get("/addUser", (req, res) => {
    const name = req.query.name;
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    res.json(newUser);
});

app.get("/deleteUser", (req, res) => {
    const id = parseInt(req.query.id);
    users = users.filter(u => u.id !== id);
    res.json({ message: "User deleted" });
});

app.listen(3000, () => console.log("RestAPI Server running on port 3000"));
