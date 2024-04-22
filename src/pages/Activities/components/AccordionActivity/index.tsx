import { Accordion } from "react-bootstrap";

import { Task } from "../../../../types/tasks";

import { ButtonOptions } from "../../../Students/components/ButtonOptions";

interface Accordionprops {
  index: string;
  activityNumber: string;
  createDate: string;
  studentName: string;
  initialDate: string;
  endDate: string;
  taskName: Task[];
  handleEditActivity: () => void;
  handleDelete: () => void;
}

function AccordionActivity({
  index,
  activityNumber,
  createDate,
  studentName,
  initialDate,
  endDate,
  taskName,
  handleEditActivity,
}: Accordionprops) {
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
              <ButtonOptions
                handleEdit={handleEditActivity}
                handleDelete={function (): void {
                  throw new Error("Function not implemented.");
                }}
                titleEditBtn="Editar Atividade"
                titleDeleteBtn="Apagar Atividade"
              />
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
