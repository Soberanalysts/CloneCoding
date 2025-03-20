// 페이지 콘텐츠 정의
const routes = {
    "/": "<h1>🏠 Home Page</h1><p>Welcome to the Home page!</p>",
    "/about": "<h1>📖 About Page</h1><p>Learn more about us here.</p>",
    "/contact": "<h1>📞 Contact Page</h1><p>Get in touch with us!</p>",
    "/map":"<h1> View Map </h1><p>View this map</p>"
};

const newsData = {
    sports: ["⚽ 축구 경기 결과", "🏀 농구 플레이오프 소식", "⚾ 야구 선수 이적 소식"],
    entertainment: ["🎬 최신 영화 개봉", "🎤 가수 신곡 발표", "📺 인기 드라마 종영"]
};

// 페이지 이동 함수 (해시 라우팅 사용)
function navigateTo(path) {
    window.history.pushState({}, path, window.location.origin + path);
    updateContent();
}

// 현재 경로에 맞게 콘텐츠 업데이트
function updateContent() {
    const appDiv = document.getElementById("app");
    const path = window.location.pathname;
    appDiv.innerHTML = routes[path] || "<h1>404 Not Found</h1><p>Page not found.</p>";
}

function changeCategory(category) {
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = newsData[category].map(item => `<li>${item}</li>`).join("");
}

// 초기값 설정 (스포츠 기사 먼저 보이도록)
changeCategory("sports");


// 뒤로 가기, 앞으로 가기 이벤트 감지
window.onpopstate = updateContent;

// 초기 로드 시 콘텐츠 설정
updateContent();


//SPA는 

//예시 : 네이버 검색창에서 스포츠 -> 연예 기사제목을 확인할 때 