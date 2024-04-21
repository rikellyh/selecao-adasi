import { Accordion } from "react-bootstrap";

import { Task } from "../../../../types/tasks";

interface Accordionprops {
  index: string;
  activityNumber: string;
  createDate: string;
  studentName: string;
  initialDate: string;
  endDate: string;
  taskName: Task[];
}

function AccordionActivity({
  index,
  activityNumber,
  createDate,
  studentName,
  initialDate,
  endDate,
  taskName,
}: Accordionprops) {
  return (
    <Accordion>
      <Accordion.Item eventKey={index}>
        <Accordion.Header>Atividade {activityNumber}</Accordion.Header>
        <Accordion.Body>
          <div>
            <div className="info--data">
              <div>
                <h1>Data de criação: {createDate}</h1>
                <h1>Estudante: {studentName}</h1>
              </div>
              <div>
                <span>Prazo Inicial: {initialDate}</span>
                <span>Prazo Final: {endDate}</span>
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
