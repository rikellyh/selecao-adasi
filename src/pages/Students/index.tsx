import { Button, Container, Table } from "react-bootstrap";

import IconEdit from "../../assets/icons/pencil.svg";
import IconTrash from "../../assets/icons/trash.svg";

import "./styles.css";

function ListStudents() {
  return (
    <Container className="container--table">
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Julian Castro Cardoso</td>
            <td>123.159.138-87</td>
            <td>Jornalismo</td>
            <td>
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
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default ListStudents;
