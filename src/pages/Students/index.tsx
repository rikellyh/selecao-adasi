import { useState } from "react";

import { Button, Container, Table } from "react-bootstrap";

import { useQueryGetStudents } from "../../hooks/useStudents/useQueryGetStudents";

import { ButtonOptions } from "./components/ButtonOptions";
import ModalCreateStudent from "./components/ModalCreateStudent";

import "./styles.css";

function ListStudents() {
  const [modalShowCreateStudent, setModalShowCreateStudent] = useState(false);
  const [registration, setRegistration] = useState("");
  const [cpf, setCpf] = useState("");

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    const valueMax = value.slice(0, 9);
    const valueMin = value.slice(0, 8);

    if (valueMax.length === 9) {
      value = valueMax.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
    } else if (valueMin.length === 7 || valueMin.length === 8) {
      value = valueMin.replace(/^(\d{1})(\d{3})(\d{0,3})$/, "$1.$2.$3");
    }

    setRegistration(value);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 11);
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    setCpf(value);
  };

  const handleCloseCreateStudentModal = () => {
    setModalShowCreateStudent(false);
    setRegistration("");
    setCpf("");
  };

  const handleOpenCreateStudentModal = () => setModalShowCreateStudent(true);

  const { data } = useQueryGetStudents();

  return (
    <Container className="container--table">
      <ModalCreateStudent
        show={modalShowCreateStudent}
        registration={registration}
        cpf={cpf}
        onHide={handleCloseCreateStudentModal}
        handleCpfChange={handleCpfChange}
        handleRegistrationChange={handleRegistrationChange}
      />
      <Button className="btn__center" onClick={handleOpenCreateStudentModal}>
        Adicionar estudante
      </Button>
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
