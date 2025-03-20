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
