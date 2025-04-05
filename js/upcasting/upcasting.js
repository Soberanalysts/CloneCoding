class Animal {
    speak() {
      console.log("동물이 소리를 냅니다.");
    }
  }
  
  class Dog extends Animal {
    speak() {
      console.log("멍멍!");
    }
  
    wagTail() {
      console.log("꼬리를 흔들어요 🐕");
    }
  }
  
  // 🐶 Dog 인스턴스를 만들되, 부모 타입(Animal)으로 업캐스팅!
  const myPet = new Dog();      // 실제 인스턴스는 Dog
  const animalRef = myPet;      // 업캐스팅 (암묵적)
  
  // 🗣️ 오버라이딩된 메서드 실행
  animalRef.speak(); // 👉 "멍멍!" 출력됨! (자식 메서드가 실행됨)
  
  // animalRef.wagTail(); // ❌ Error: Animal 타입에는 wagTail() 없음

  class Cat extends Animal {
    meow() {
      console.log("야옹~");
    }
  }
  
  const cat = new Cat();
  cat.speak(); // 👉 "동물이 소리를 냅니다." (부모의 speak 그대로 사용)