from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

app = FastAPI()

# CORS 설정 (Express에서 cors() 미들웨어 사용과 동일)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용 (*을 특정 도메인으로 변경 가능)
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

# 미들웨어 추가 (Express의 app.use()와 유사)
@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"요청: {request.method} {request.url}")
    response = await call_next(request)
    return response

# 기본 GET 요청 (Express의 app.get("/")와 동일)
@app.get("/")
async def root():
    return {"message": "Hello, FastAPI!"}

# URL 파라미터 받기 (Express의 app.get("/users/:id")와 동일)
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"user_id": user_id, "name": f"User{user_id}"}

# POST 요청 JSON 받기 (Express의 app.post("/users")와 동일)
class User(BaseModel):
    name: str
    age: int

@app.post("/users/")
async def create_user(user: User):
    return {"message": "User created", "user": user}

# 서버 실행
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
