import { useState } from "react";

import { Modal, Button } from "react-bootstrap";

import { queryClient } from "../../../../App";
import { Course } from "../../../../types/courses";
import { useMutationDeleteCourse } from "../../../../hooks/useCourses/useQueryDeleteCourse";

import { ButtonLoading } from "../../../../components/ButtonLoading";
import { Alerts } from "../../../../components/Toast";

interface ModalDeleteCourseProps {
  show: boolean;
  onHide: () => void;
  selectedCourse: Course | null;
}

function ModalDeleteCourse(props: ModalDeleteCourseProps) {
  const courseId = props.selectedCourse?.id;
  const { mutateAsync } = useMutationDeleteCourse();
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);

  const handleSubmit = async () => {
    if (!courseId) {
      return;
    }

    setIsLoadingMutation(true);
    mutateAsync({
      id: courseId,
      name: "",
    })
      .then(() => {
        Alerts.SUCCESS("Curso deletado com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["GET_COURSES"] });
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
      <Modal.Body className="flex--items">
        <h1>Deseja deletar este curso?</h1>
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

export default ModalDeleteCourse;
