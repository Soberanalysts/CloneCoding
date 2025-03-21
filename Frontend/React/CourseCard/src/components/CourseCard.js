import "./CourseCard.css";

function CourseCard({ img, tags, title, startPrice, types }) {
  return (
    <div className="CourseCard">
      <div className="cover">
        <img alt="" src={img} />
      </div>
      <div className="info">
        <ul className="tags">
          {tags.map((item, i) => (
            <li key={i} className="tag">
              {item}
            </li>
          ))}
        </ul>
        <h4 className="name">{title}</h4>
        <p className="price">
          {startPrice.toLocaleString()}원부터
          {/* <span class="type vodklass">{startPrice}</span> */}
        </p>
        <ul className="types">
          {types.map((item,i) => (
            <li key={i} className="type">
              {item}
            </li>
          ))}
          {/* <li className="type">동영상강의</li> */}
        </ul>
      </div>
    </div>
  );
}

export default CourseCard;
