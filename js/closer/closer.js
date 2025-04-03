//클로저 : 함수가 자신이 선언된 환경(스코프)의 변수에 접근할 수 있는 현상
//외부 함수가 끝나도, 내부 함수는 변수 기억한다

function createCounter() {
    let count = 0; // 이 변수는 외부에서 직접 접근 불가능
  
    return function () {
      count += 1;
      return count;
    };
  }
  
  const counter = createCounter();
  
  console.log(counter()); // 1
  console.log(counter()); // 2
  console.log(counter()); // 3