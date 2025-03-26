function slowOperation() {
    const start = Date.now();
    while (Date.now() - start < 5000) {
      // 5초 동안 아무것도 안하고 기다림 (CPU 점유)
    }
    return "완료";
  }

function syncTask() {
    const result = slowOperation(); // 느린 작업 (예: 5초)
    console.log("결과:", result);   // → 느린 작업이 끝날 때까지 멈춰있음
  }

  syncTask();