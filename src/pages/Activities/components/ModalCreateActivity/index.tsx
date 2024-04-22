import { useState } from "react";

import Select from "react-select";
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
  startDate: string;
  endDate: string;
  selectedOptions: { value: string; label: string }[];
  onHide: () => void;
  handleStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMultiOptionsChange: (
    selectedOptions: { value: string; label: string }[]
  ) => void;
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
            scheduledStart: props.startDate,
            scheduledEnd: props.endDate,
            taskIds: [],
          }}
          validationSchema={CreateActivitySchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, setFieldValue }) => (
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
              <div className="field--select reduceMargin">
                <label htmlFor="studentCpf">
                  Aplicar para o estudante abaixo
                </label>
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
              <div className="field--select reduceMargin">
                <label htmlFor="taskIds">Defina as tarefas</label>
                <Select
                  isMulti
                  id="taskIds"
                  name="taskIds"
                  className="multi--select"
                  placeholder="Selecione uma ou mais tarefas"
                  noOptionsMessage={() => "Sem resultados encontrados"}
                  onChange={(selectedOptions) => {
                    const optionsIds = selectedOptions.map(
                      (option) => option.value
                    );
                    setFieldValue("taskIds", optionsIds);
                  }}
                  options={
                    tasks &&
                    tasks.map((task) => ({
                      value: task.id,
                      label: task.name,
                    }))
                  }
                />
              </div>
              <div className="grid--datetimerange">
                <div>
                  <label htmlFor="scheduledStart">Data de ínicio</label>
                  <input
                    id="scheduledStart"
                    name="scheduledStart"
                    value={props.startDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("scheduledStart", e.target.value);
                      props.handleStartDateChange(e);
                    }}
                    type="datetime-local"
                  />
                </div>
                <div>
                  <label htmlFor="scheduledEnd">Data de Fim</label>
                  <input
                    id="scheduledEnd"
                    name="scheduledEnd"
                    value={props.endDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("scheduledEnd", e.target.value);
                      props.handleEndDateChange(e);
                    }}
                    type="datetime-local"
                  />
                </div>
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
