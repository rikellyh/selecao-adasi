import { useState } from "react";

import { Accordion } from "react-bootstrap";

import { queryClient } from "../../../../App";
import { Task } from "../../../../types/tasks";
import { useMutationStartActivity } from "../../../../hooks/useActivities/useQueryStartActivity";
import { useMutationEndActivity } from "../../../../hooks/useActivities/useQueryEndActivity";

import { Alerts } from "../../../../components/Toast";
import { ButtonLoading } from "../../../../components/ButtonLoading";
import { ButtonOptions } from "../../../Students/components/ButtonOptions";

interface Accordionprops {
  index: string;
  activityNumber: string;
  createDate: string;
  studentName: string;
  initialDate: string;
  endDate: string;
  verifyStart: string;
  verifyEnd: string;
  taskName: Task[];
  handleEditActivity: () => void;
  handleDeleteActivity: () => void;
}

interface StartActivityProps {
  start: string;
}

interface EndActivityProps {
  end: string;
}

function AccordionActivity({
  index,
  activityNumber,
  createDate,
  studentName,
  initialDate,
  endDate,
  taskName,
  verifyStart,
  verifyEnd,
  handleEditActivity,
  handleDeleteActivity,
}: Accordionprops) {
  const activityId = index;
  const { mutateAsync: requestStart } = useMutationStartActivity();
  const { mutateAsync: requestEnd } = useMutationEndActivity();
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);

  const handleStartActivity = async (values: StartActivityProps) => {
    if (!activityId) {
      return;
    }

    const dataPayload = {
      ...values,
      selectedActivity: index,
    };

    setIsLoadingMutation(true);
    requestStart(dataPayload)
      .then(() => {
        Alerts.SUCCESS("Atividade Iniciada!");
        queryClient.invalidateQueries({ queryKey: ["GET_ACTIVITIES"] });
      })
      .catch(() => {
        Alerts.ERROR("Houve um erro na sua requisição");
      })
      .finally(() => {
        setIsLoadingMutation(false);
      });
  };

  const handleEndActivity = async (values: EndActivityProps) => {
    if (!activityId) {
      return;
    }

    const dataPayload = {
      ...values,
      selectedActivity: index,
    };

    setIsLoadingMutation(true);
    requestEnd(dataPayload)
      .then(() => {
        Alerts.SUCCESS("Atividade Finalizada!");
        queryClient.invalidateQueries({ queryKey: ["GET_ACTIVITIES"] });
      })
      .catch(() => {
        Alerts.ERROR("Houve um erro na sua requisição");
      })
      .finally(() => {
        setIsLoadingMutation(false);
      });
  };

  return (
    <Accordion>
      <Accordion.Item eventKey={index}>
        <Accordion.Header>Atividade {activityNumber}</Accordion.Header>
        <Accordion.Body>
          <div>
            <div className="info--data">
              <div className="info--data--date">
                <span>Prazo Inicial: {initialDate}</span>
                <span>Prazo Final: {endDate}</span>
              </div>
              <div className="info--data--student">
                <h1>Data de criação: {createDate}</h1>
                <h1>Estudante: {studentName}</h1>
              </div>
              <div className="info--data--btnGroup">
                <ButtonLoading
                  isLoading={isLoadingMutation}
                  onClick={() =>
                    handleStartActivity({ start: new Date().toISOString() })
                  }
                  disabled={verifyStart ? true : false}
                >
                  Iniciar
                </ButtonLoading>
                <ButtonLoading
                  variant="danger"
                  isLoading={isLoadingMutation}
                  onClick={() =>
                    handleEndActivity({ end: new Date().toISOString() })
                  }
                  disabled={verifyEnd ? true : false}
                >
                  Finalizar
                </ButtonLoading>
                <ButtonOptions
                  handleEdit={handleEditActivity}
                  handleDelete={handleDeleteActivity}
                  titleEditBtn="Editar Atividade"
                  titleDeleteBtn="Apagar Atividade"
                />
              </div>
            </div>
            <div className="list--taks">
              <p>Tarefas:</p>
              <ul>
                {taskName?.map((task) => (
                  <li>{task?.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionActivity;
