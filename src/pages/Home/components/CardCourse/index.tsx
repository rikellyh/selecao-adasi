import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import IconSearch from "../../../../assets/icons/search.svg";
import IconEdit from "../../../../assets/icons/pencil.svg";
import IconTrash from "../../../../assets/icons/trash.svg";
interface CardCourseProps {
  title: string;
  handleEdit: () => void;
  handleDelete: () => void;
}

function CardCourse({ title, handleEdit, handleDelete }: CardCourseProps) {
  return (
    <Card className="card__course">
      <Card.Header className="header__title">
        <h2>{title}</h2>
      </Card.Header>
      <Card.Body>
        <div className="body__content">
          <div className="body__content--button">
            <img src={IconSearch} alt="ícone de busca" />
            <Button variant="light">
              <Link to="/activities">Ver Curso</Link>
            </Button>
          </div>
          <div className="body__content--button">
            <img src={IconEdit} alt="ícone de editar" />
            <Button variant="secondary" onClick={handleEdit}>
              Editar Curso
            </Button>
          </div>
          <div className="body__content--button">
            <img src={IconTrash} alt="ícone de deletar" />
            <Button variant="danger" onClick={handleDelete}>
              Apagar Curso
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardCourse;
