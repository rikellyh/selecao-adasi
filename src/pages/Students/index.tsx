import { Container, Table } from "react-bootstrap";

import { useQueryGetStudents } from "../../hooks/useStudents/useQueryGetStudents";

import { ButtonOptions } from "./components/ButtonOptions";

import "./styles.css";

function ListStudents() {
  const { data } = useQueryGetStudents();

  return (
    <Container className="container--table">
      {data && data.length ? (
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>Identidade</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Curso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr>
                <td>{student.registration}</td>
                <td>{student.name}</td>
                <td>{student.cpf}</td>
                <td>{student.course.name}</td>
                <td>
                  <ButtonOptions />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <>
          <h1>Sem estudantes cadastrados ainda!</h1>
        </>
      )}
    </Container>
  );
}

export default ListStudents;
