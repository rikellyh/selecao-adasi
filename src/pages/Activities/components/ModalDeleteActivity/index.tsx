import { useState } from "react";

import { Modal, Button } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";

import { Activity } from "../../../../types/activities";
import { useMutationDeleteActivity } from "../../../../hooks/useActivities/useQueryDeleteActivity";

import { ButtonLoading } from "../../../../components/ButtonLoading";
import { Alerts } from "../../../../components/Toast";

interface ModalDeleteActivityProps {
  show: boolean;
  onHide: () => void;
  selectedActivity: Activity | null;
}

function ModalDeleteActivity(props: ModalDeleteActivityProps) {
  const activityId = props.selectedActivity?.id;
  const { mutateAsync } = useMutationDeleteActivity();

  const [isLoadingMutation, setIsLoadingMutation] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    if (!activityId) {
      return;
    }

    setIsLoadingMutation(true);
    mutateAsync(activityId)
      .then(() => {
        Alerts.SUCCESS("Atividade apagada com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["GET_ACTIVITIES"] });
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
        <h1>Deseja apagar a atividade?</h1>
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

export default ModalDeleteActivity;
