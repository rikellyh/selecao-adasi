import { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Modal } from "react-bootstrap";

import { queryClient } from "../../../../../App";
import { Task } from "../../../../../types/tasks";
import { useMutationEditTask } from "../../../../../hooks/useTasks/useQueryEditTask";

import { ButtonLoading } from "../../../../../components/ButtonLoading";
import { Alerts } from "../../../../../components/Toast";
import { CreateTaskSchema } from "../../../../../schemas";

interface FormDataProps {
  name: string;
}

interface ModalEditTaskProps {
  show: boolean;
  onHide: () => void;
  selectedTask: Task | null;
}

function ModalEditTask(props: ModalEditTaskProps) {
  const taskId = props.selectedTask?.id;
  const { mutateAsync } = useMutationEditTask();
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);

  const handleSubmit = async (values: FormDataProps) => {
    if (!taskId) {
      return;
    }

    setIsLoadingMutation(true);
    mutateAsync({ ...values, id: taskId })
      .then(() => {
        Alerts.SUCCESS("Tarefa editada com sucesso!");
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Deseja editar a tarefa?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: props.selectedTask?.name || "" }}
          validationSchema={CreateTaskSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div>
                <label htmlFor="name">Nome da tarefa</label>
                <Field type="text" name="name" />
                <ErrorMessage
                  name="name"
                  className="errorMessage"
                  component="div"
                />
              </div>
              <ButtonLoading
                type="submit"
                isLoading={isLoadingMutation}
                disabled={isSubmitting || !isValid || isLoadingMutation}
              >
                Salvar
              </ButtonLoading>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default ModalEditTask;
