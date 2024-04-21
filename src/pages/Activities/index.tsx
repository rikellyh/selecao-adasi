import { Button, Container } from "react-bootstrap";

import { formatDate, formatDateStartAndEnd } from "../../utils/format";
import { useQueryGetActivities } from "../../hooks/useActivities/useQueryGetActivities";

import AccordionActivity from "./components/AccordionActivity";

import "./styles.css";

const Activities = () => {
  const { data } = useQueryGetActivities();

  return (
    <Container>
      <Button className="btn__center">Adicionar atividade</Button>
      <main className="container--wrapper">
        {data && data.length ? (
          <>
            {data.map((activity, index) => (
              <AccordionActivity
                key={activity.id}
                index={activity.id}
                activityNumber={`${index === 0 ? 1 : ""}`}
                createDate={formatDate(activity?.date)}
                studentName={activity.student.name}
                initialDate={formatDateStartAndEnd(activity?.scheduledStart)}
                endDate={formatDateStartAndEnd(activity?.scheduledEnd)}
                taskName={activity.tasks}
              />
            ))}
          </>
        ) : (
          <>
            <h1>Sem Atividades cadastradas ainda!</h1>
          </>
        )}
      </main>
    </Container>
  );
};

export default Activities;
