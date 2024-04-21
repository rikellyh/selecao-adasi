import { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Modal } from "react-bootstrap";

import { queryClient } from "../../../../App";
import { CreateActivitySchema } from "../../../../schemas";
import { useQueryGetStudents } from "../../../../hooks/useStudents/useQueryGetStudents";
import { useQueryGetTasks } from "../../../../hooks/useTasks/useQueryGetTasks";
import { useMutationCreateActivities } from "../../../../hooks/useActivities/useQueryCreateActivity";

import { ButtonLoading } from "../../../../components/ButtonLoading";
import { Alerts } from "../../../../components/Toast";

interface FormDataProps {
  studentCpf: string;
  date: string;
  scheduledStart: string;
  scheduledEnd: string;
  taskIds: string[];
}

interface ModalCreateActivityProps {
  show: boolean;
  onHide: () => void;
}

function ModalCreateActivity(props: ModalCreateActivityProps) {
  const { data: students } = useQueryGetStudents();
  const { data: tasks } = useQueryGetTasks();
  const { mutateAsync } = useMutationCreateActivities();
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);

  const handleSubmit = async (values: FormDataProps) => {
    setIsLoadingMutation(true);

    mutateAsync(values)
      .then(() => {
        Alerts.SUCCESS("Atividade Criada!");
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
      size="lg"
      className="modalFormStudent"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cadastro de Atividade
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            studentCpf: "",
            date: "",
            scheduledStart: "",
            scheduledEnd: "",
            taskIds: [],
          }}
          validationSchema={CreateActivitySchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div>
                <label htmlFor="date">Data de criação</label>
                <Field type="date" name="date" />
                <ErrorMessage
                  name="date"
                  className="errorMessage"
                  component="div"
                />
              </div>
              <div className="field--select">
                <label htmlFor="studentCpf">Curso a ser matriculado</label>
                <Field as="select" id="studentCpf" name="studentCpf">
                  <option value="">Selecione o estudante</option>
                  {students &&
                    students.map((student) => (
                      <option value={student.cpf}>{student.name}</option>
                    ))}
                </Field>
                <ErrorMessage
                  name="studentCpf"
                  className="errorMessage"
                  component="div"
                />
              </div>
              <div>
                <select
                  className="form-select"
                  id="multiple-select-field"
                  data-placeholder="Choose anything"
                  multiple
                >
                  {tasks &&
                    tasks.map((task) => (
                      <option value={task.id}>{task.name}</option>
                    ))}
                </select>
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

export default ModalCreateActivity;
