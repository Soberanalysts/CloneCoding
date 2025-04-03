//추상화 : 필요한 기능만 보이게 하고, 복잡한 내부 구현은 숨기는 것

class CoffeeMachine {
    #waterAmount = 0;
    #beans = "";
  
    constructor() {
      console.log("🔧 커피 머신이 준비됐습니다!");
    }
  
    makeAmericano() {
      this.#boilWater();
      this.#extract();
      console.log("☕ 아메리카노 완성!");
    }
  
    #boilWater() {
      console.log("물을 끓이는 중...");
    }
  
    #extract() {
      console.log("원두를 갈고 추출 중...");
    }
  }
  
  const myMachine = new CoffeeMachine();
  myMachine.makeAmericano(); // 우리는 그냥 이 메서드만 알면 됨!


  //이해도 100%, 러닝코스트 10분