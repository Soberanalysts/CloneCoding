// 부모 클래스
class Animal {
    public void speak() {
        System.out.println("동물이 소리를 냅니다.");
    }
}

// 자식 클래스
class Dog extends Animal {
    @Override
    public void speak() {
        System.out.println("멍멍!");
    }

    public void wagTail() {
        System.out.println("꼬리를 흔들어요 🐶");
    }
}

public class Main {
    public static void main(String[] args) {
        // ✅ 업캐스팅: 자식 객체를 부모 타입으로 참조
        Animal pet = new Dog();  // 업캐스팅 (Animal ← Dog)

        // ✅ 오버라이딩된 메서드 실행
        pet.speak(); // 👉 "멍멍!" 출력됨 (Dog의 speak() 호출)

        // ❌ 부모 타입이므로 Dog에만 있는 메서드는 호출 불가
        // pet.wagTail(); // 컴파일 에러 발생!

        // ✅ 다운캐스팅을 하면 자식 기능도 사용 가능
        if (pet instanceof Dog) {
            Dog realDog = (Dog) pet;  // 다운캐스팅
            realDog.wagTail();        // 👉 "꼬리를 흔들어요 🐶"
        }
    }
}