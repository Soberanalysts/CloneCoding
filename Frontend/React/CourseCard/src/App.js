import "./styles.css";
import CourseCard from "./components/CourseCard";

export default function App() {
  return (
    <div className="App" style={{ padding: 30 }}>
      <CourseCard
        img="https://dst6jalxvbuf5.cloudfront.net/media/images/Course/cover_image/211019_092030/%EC%BD%94%EC%8A%A4%EC%B9%B4%EB%93%9C_.png"
        tags={["디자인", "굿즈", "브랜딩"]}
        title="비즈니스 올인원, 굿즈"
        startPrice={349000}
        types={["동영상강의", "영상"]}
      />
    </div>
  );
}
