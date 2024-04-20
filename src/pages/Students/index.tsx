import { useState } from "react";

import { Button, Container, Table } from "react-bootstrap";

import { Student } from "../../types/students";
import { useQueryGetStudents } from "../../hooks/useStudents/useQueryGetStudents";

import { ButtonOptions } from "./components/ButtonOptions";
import ModalCreateStudent from "./components/ModalCreateStudent";
import ModalEditStudent from "./components/ModalEditStudent";

import "./styles.css";
import ModalDeleteStudent from "./components/ModalDeleteStudent";

function ListStudents() {
  const [modalShowCreateStudent, setModalShowCreateStudent] = useState(false);
  const [modalShowEditStudent, setModalShowEditStudent] = useState(false);
  const [modalShowDeleteStudent, setModalShowDeleteStudent] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
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

  const handleOpenCreateStudentModal = () => setModalShowCreateStudent(true);
  const handleCloseCreateStudentModal = () => {
    setModalShowCreateStudent(false);
    setRegistration("");
    setCpf("");
  };

  const handleCloseEditStudentModal = () => {
    setModalShowEditStudent(false);
    setRegistration("");
    setCpf("");
  };
  const handleOpenEditStudentModal = (studentData: Student) => {
    setModalShowEditStudent(true);
    setSelectedStudent(studentData);
  };

  const handleOpenDeleteStudentModal = (studentData: Student) => {
    setModalShowDeleteStudent(true);
    setSelectedStudent(studentData);
  };
  const handleCloseDeleteStudentModal = () => {
    setModalShowDeleteStudent(false);
  };

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
      <ModalEditStudent
        show={modalShowEditStudent}
        registration={registration}
        cpf={cpf}
        onHide={handleCloseEditStudentModal}
        handleCpfChange={handleCpfChange}
        handleRegistrationChange={handleRegistrationChange}
        selectedStudent={selectedStudent}
      />
      <ModalDeleteStudent
        show={modalShowDeleteStudent}
        onHide={handleCloseDeleteStudentModal}
        selectedStudent={selectedStudent}
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
                  <ButtonOptions
                    key={student.cpf}
                    handleEdit={() => handleOpenEditStudentModal(student)}
                    handleDelete={() => handleOpenDeleteStudentModal(student)}
                  />
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
