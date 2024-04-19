import { Button } from "react-bootstrap";

import IconEdit from "../../../../assets/icons/pencil.svg";
import IconTrash from "../../../../assets/icons/trash.svg";

export const ButtonOptions = () => {
  return (
    <div className="td--actions">
      <div className="body__content--button">
        <Button variant="danger" title="Deletar Estudante">
          <img src={IconTrash} alt="ícone de deletar" />
        </Button>
      </div>
      <div className="body__content--button">
        <Button variant="secondary" title="Editar Estudante">
          <img src={IconEdit} alt="ícone de editar" />
        </Button>
      </div>
    </div>
  );
};
