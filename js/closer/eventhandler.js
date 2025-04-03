const idbuttons = document.querySelectorAll("#idmyBtn");
const classbuttons = document.querySelectorAll(".classmyBtn");
const closerbuttons = document.querySelectorAll(".closermyBtn");
const letbuttons = document.querySelectorAll(".letmyBtn")

// for (var i = 0; i < classbuttons.length; i++) {
//     classbuttons[i].addEventListener("click", () => {
//     console.log(`버튼 ${i} 클릭됨`);
//   });
// }

for (var i = 0; i < closerbuttons.length; i++) {
    (function (j) {
        closerbuttons[j].addEventListener("click", () => {
                console.log(`클로저 버튼 ${j+1} 클릭됨`);
              });
    })(i); // 클로저로 i 값을 고정
  }

for (let i = 0; i < letbuttons.length; i++) {
    letbuttons[i].addEventListener("click", () => {
      console.log(`let 버튼 ${i} 클릭됨`);
    });
  }

  function makeClickLogger(name) {
    return function () {
      console.log(`${name} 버튼 클릭됨!`);
    };
  }
//   const handler = makeClickLogger("로그인");

  
//   button?.addEventListener("click", handler);
//-----?.는 if문 쓴것과 같음(한줄로 쓸수 있음)
// if (button) {
//     button.addEventListener("click", handler);
//   }

classbuttons.forEach((btn, i) => {
  const handler = makeClickLogger(`버튼${i + 1}`);
  btn.addEventListener("click", handler);
});

["btn1", "btn2", "btn3"].forEach((id, i) => {
    const btn = document.getElementById(id);
    const handler = makeClickLogger(`id버튼${i + 1}`);
    btn?.addEventListener("click", handler);
  });

  //closer 이해도 80% 러닝코스트 : 1h