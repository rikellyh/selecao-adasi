import { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Modal } from "react-bootstrap";

import { queryClient } from "../../../../../App";
import { CreateTaskSchema } from "../../../../../schemas";
import { useMutationCreateTask } from "../../../../../hooks/useTasks/useQueryCreateTask";

import { Alerts } from "../../../../../components/Toast";
import { ButtonLoading } from "../../../../../components/ButtonLoading";

interface FormDataProps {
  name: string;
}

interface ModalCreateTaskProps {
  show: boolean;
  onHide: () => void;
}

function ModalCreateTask(props: ModalCreateTaskProps) {
  const { mutateAsync } = useMutationCreateTask();
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);

  const handleSubmit = async (values: FormDataProps) => {
    setIsLoadingMutation(true);

    mutateAsync(values)
      .then(() => {
        Alerts.SUCCESS("Tarefa criado com sucesso!");
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
          Digite o nome do tarefa abaixo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: "" }}
          validationSchema={CreateTaskSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div>
                <label htmlFor="name">Nome do tarefa</label>
                <Field type="text" name="name" placeholder="Digite a tarefa" />
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

export default ModalCreateTask;
