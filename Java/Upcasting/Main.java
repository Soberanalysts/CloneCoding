class Animal {
    public void sound() {
        System.out.println("동물이 소리를 냅니다");
    }
}

class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("멍멍!");
        this.wagTail();
    }
    public void wagTail() {
        System.out.println("꼬리를 흔듭니다");
    }
}

class Cat extends Animal {
    @Override
    public void sound() {
        System.out.println("야옹~");
    }
}

public class Main {
    public static void main(String[] args) {
        // ✅ 업캐스팅 (자식 → 부모 타입)
        Animal a1 = new Dog();  // 업캐스팅
        Animal a2 = new Cat();  // 업캐스팅

        a1.sound();  // 🔥 오버라이딩 → "멍멍!" 출력
        a2.sound();  // 🔥 오버라이딩 → "야옹~" 출력

        // a1.wagTail(); // ❌ 에러: Animal 타입에는 wagTail()이 없음

        // ✅ 다운캐스팅을 해야 wagTail() 사용 가능
        if (a1 instanceof Dog) {
            Dog realDog = (Dog) a1;
            realDog.wagTail();  // ✔️ "꼬리를 흔듭니다"
        }
    }
}

// public class Main{
//     public static void main(String[] args) { 
//         A b = new B(); 
//         b.paint(); 
//         b.draw();
//     }
// }
// class A {
//     public void paint() {
//         System.out.print("A의 함수 paint");
//         System.out.print("A");
//         draw();
//     }
    
//     public void draw() {
//         System.out.print("A의 함수 draw");
//         System.out.print("B");
//         draw();
//     }
// }
// class B extends A {
//     public void paint() { 
//         super.draw();
//         System.out.print("B의 함수 paint");
//         System.out.print("C"); 
//         this.draw();
//     }
//     public void draw() {
//         System.out.print("B의 함수 draw");
//         System.out.print("D");
//     }
// }

// BCDBD
//업캐스팅 오버라이딩