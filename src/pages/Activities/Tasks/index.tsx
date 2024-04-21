import { useState } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";

import { Task } from "../../../types/tasks";
import { useQueryGetTasks } from "../../../hooks/useTasks/useQueryGetTasks";

import { ButtonOptions } from "../../Students/components/ButtonOptions";
import ModalCreateTask from "./components/ModalCreateTask";
import ModalEditTask from "./components/ModalEditTask";

import "../styles.css";

const Tasks = () => {
  const [modalShowCreateTask, setModalShowCreateTask] = useState(false);
  const [modalShowEditTask, setModalShowEditTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { data } = useQueryGetTasks();

  const handleCloseCreateTaskModal = () => setModalShowCreateTask(false);
  const handleOpenCreateTaskModal = () => setModalShowCreateTask(true);

  const handleCloseEditTaskModal = () => setModalShowEditTask(false);
  const handleOpenEditTaskModal = (taskData: Task) => {
    setModalShowEditTask(true);
    setSelectedTask(taskData);
  };

  return (
    <Container>
      <ModalCreateTask
        show={modalShowCreateTask}
        onHide={handleCloseCreateTaskModal}
      />
      <ModalEditTask
        show={modalShowEditTask}
        onHide={handleCloseEditTaskModal}
        selectedTask={selectedTask}
      />
      <Button className="btn__center" onClick={handleOpenCreateTaskModal}>
        Adicione uma tarefa
      </Button>
      <main className="container--wrapper">
        {data && data.length ? (
          <ListGroup>
            {data.map((task) => (
              <ListGroup.Item key={task.id}>
                <div className="grid--item">
                  <div>
                    <h2>{task.name}</h2>
                  </div>
                  <ButtonOptions
                    key={task.id}
                    titleDeleteBtn="Deletar Tarefa"
                    titleEditBtn="Editar Tarefa"
                    handleEdit={() => handleOpenEditTaskModal(task)}
                    handleDelete={() => console.log(task)}
                  />
                </div>
              </ListGroup.Item>
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
