import { useState } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";

import { useQueryGetTasks } from "../../../hooks/useTasks/useQueryGetTasks";

import ModalCreateTask from "./components/ModalCreateTask";

import "../styles.css";

const Tasks = () => {
  const [modalShowCreateTask, setModalShowCreateTask] = useState(false);

  const { data } = useQueryGetTasks();

  const handleCloseCreateTaskModal = () => setModalShowCreateTask(false);
  const handleOpenCreateTaskModal = () => setModalShowCreateTask(true);

  return (
    <Container>
      <ModalCreateTask
        show={modalShowCreateTask}
        onHide={handleCloseCreateTaskModal}
      />
      <Button className="btn__center" onClick={handleOpenCreateTaskModal}>
        Adicione uma tarefa
      </Button>
      <main className="container--wrapper">
        {data && data.length ? (
          <ListGroup>
            {data.map((task) => (
              <ListGroup.Item key={task.id}>{task.name}</ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <>
            <h1>Sem tarefas cadastradas ainda!</h1>
          </>
        )}
      </main>
    </Container>
  );
};

export default Tasks;
