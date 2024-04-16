import { Link } from "react-router-dom";

interface cardCourseProps {
  title: string;
}

function CardCourse({ title }: cardCourseProps) {
  return (
    <Link to="/students" className="cardCourse">
      {title}
    </Link>
  );
}

export default CardCourse;
