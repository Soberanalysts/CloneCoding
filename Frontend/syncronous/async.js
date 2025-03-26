function slowOperation() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("완료");
      }, 5000); // 5초 후에 완료
    });
  }
  
  async function asyncTask() {
    console.log("작업 시작");
    const result = await slowOperation();
    console.log("결과:", result);
  }
  
  asyncTask();