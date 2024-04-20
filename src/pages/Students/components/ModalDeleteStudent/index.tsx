import { useState } from "react";

import { Modal, Button } from "react-bootstrap";

import { queryClient } from "../../../../App";
import { Student } from "../../../../types/students";
import { useMutationDeleteStudent } from "../../../../hooks/useStudents/useQueryDeleteStudent";

import { ButtonLoading } from "../../../../components/ButtonLoading";
import { Alerts } from "../../../../components/Toast";

interface ModalDeleteStudentProps {
  show: boolean;
  onHide: () => void;
  selectedStudent: Student | null;
}

function ModalDeleteStudent(props: ModalDeleteStudentProps) {
  const studentCpf = props.selectedStudent?.cpf;
  const { mutateAsync } = useMutationDeleteStudent();
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);

  const handleSubmit = async () => {
    if (!studentCpf) {
      return;
    }

    setIsLoadingMutation(true);
    mutateAsync(studentCpf)
      .then(() => {
        Alerts.SUCCESS("Estudante removido com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["GET_STUDENTS"] });
        props.onHide();
      })
      .catch(() => {
        Alerts.ERROR("Houve um erro na sua requisição");
      })
      .finally(() => {
        setIsLoadingMutation(false);
      });
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="header--closeBtn"></Modal.Header>
      <Modal.Body className="flex--items text">
        <h1>Deseja remover o estudante?</h1>
        <div className="button--options">
          <Button type="button" onClick={props.onHide}>
            NÃO
          </Button>
          <ButtonLoading
            type="submit"
            isLoading={isLoadingMutation}
            onClick={handleSubmit}
          >
            SIM
          </ButtonLoading>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDeleteStudent;
