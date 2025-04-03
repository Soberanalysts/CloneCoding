for (var i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log(i); // 모두 4 찍힘!
    }, i * 1000);
  } //콜백 함수가 실행되는 시점에 i를 "기억하는" 게 아니라 "참조"만 했기 때문


  for (var i = 1; i <= 3; i++) {
    (function (j) {
      setTimeout(() => {
        console.log('클로저 적용:',j); // 1, 2, 3
      }, j * 1000);
    })(i); // 클로저로 i 값을 고정
  }


  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log('let 적용:',i); // 1, 2, 3
    }, i * 1000);
  }//let은 각 반복마다 i가 새로 생성되므로 클로저가 i를 정확히 기억함.