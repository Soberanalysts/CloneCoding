const express = require("express");
const app = express();

// 가상의 데이터베이스 (100개의 데이터)
const items = Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

app.get("/offset-pagination", (req, res) => {
    let page = parseInt(req.query.page) || 1; // 기본 페이지 1
    let limit = parseInt(req.query.limit) || 10; // 기본 한 페이지 10개
    let offset = (page - 1) * limit; // 페이지에 따라 오프셋 조정

    const paginatedItems = items.slice(offset, offset + limit);
    res.json({
        page,
        limit,
        total: items.length,
        data: paginatedItems
    });
});

app.get("/cursor-pagination", (req, res) => {
    let limit = parseInt(req.query.limit) || 10; // 기본 한 페이지 10개
    let cursor = parseInt(req.query.cursor) || 0; // 기본 시작점 (첫 번째 데이터)

    // cursor보다 큰 ID 중 limit 개수만큼 가져옴
    const paginatedItems = items.filter(item => item.id > cursor).slice(0, limit);

    res.json({
        limit,
        nextCursor: paginatedItems.length ? paginatedItems[paginatedItems.length - 1].id : null,
        data: paginatedItems
    });
});


app.listen(3000, () => console.log("Server running on port 3000"));
