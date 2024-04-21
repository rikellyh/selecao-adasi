import { useState } from "react";

import { Modal, Button } from "react-bootstrap";

import { queryClient } from "../../../../../App";
import { Task } from "../../../../../types/tasks";
import { useMutationDeleteTask } from "../../../../../hooks/useTasks/useQueryDeleteTask";

import { ButtonLoading } from "../../../../../components/ButtonLoading";
import { Alerts } from "../../../../../components/Toast";

interface ModalDeleteTaskProps {
  show: boolean;
  onHide: () => void;
  selectedTask: Task | null;
}

function ModalDeleteTask(props: ModalDeleteTaskProps) {
  const taskId = props.selectedTask?.id;
  const { mutateAsync } = useMutationDeleteTask();
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);

  const handleSubmit = async () => {
    if (!taskId) {
      return;
    }

    setIsLoadingMutation(true);
    mutateAsync(taskId)
      .then(() => {
        Alerts.SUCCESS("Tarefa deletada com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["GET_TASKS"] });
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
        <h1>Deseja deletar esta tarefa?</h1>
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

export default ModalDeleteTask;
