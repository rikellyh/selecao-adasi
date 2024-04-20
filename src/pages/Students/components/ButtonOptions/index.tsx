import { Button } from "react-bootstrap";

import IconEdit from "../../../../assets/icons/pencil.svg";
import IconTrash from "../../../../assets/icons/trash.svg";

interface ButtonOptionsProps {
  handleEdit: () => void;
}

export const ButtonOptions = ({ handleEdit }: ButtonOptionsProps) => {
  return (
    <div className="td--actions">
      <div className="body__content--button">
        <Button variant="danger" title="Deletar Estudante">
          <img src={IconTrash} alt="ícone de deletar" />
        </Button>
      </div>
      <div className="body__content--button">
        <Button
          variant="secondary"
          title="Editar Estudante"
          onClick={handleEdit}
        >
          <img src={IconEdit} alt="ícone de editar" />
        </Button>
      </div>
    </div>
  );
};
