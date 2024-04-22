import { useState } from "react";

import Select from "react-select";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Modal } from "react-bootstrap";

import { queryClient } from "../../../../App";
import { Activity } from "../../../../types/activities";
import { CreateActivitySchema } from "../../../../schemas";
import { useQueryGetStudents } from "../../../../hooks/useStudents/useQueryGetStudents";
import { useQueryGetTasks } from "../../../../hooks/useTasks/useQueryGetTasks";
import { useMutationEditActivity } from "../../../../hooks/useActivities/useQueryEditActivity";
import { formatDateStartAndEndEdit } from "../../../../utils/format";

import { ButtonLoading } from "../../../../components/ButtonLoading";
import { Alerts } from "../../../../components/Toast";

interface FormDataProps {
  studentCpf: string;
  date: string;
  scheduledStart: string;
  scheduledEnd: string;
  taskIds: string[];
}

interface ModalEditActivityProps {
  show: boolean;
  startDate: string;
  endDate: string;
  selectedOptions: { value: string; label: string }[];
  selectedActivity: Activity | null;
  onHide: () => void;
  handleStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMultiOptionsChange: (
    selectedOptions: { value: string; label: string }[]
  ) => void;
}

function ModalEditActivity(props: ModalEditActivityProps) {
  const { data: students } = useQueryGetStudents();
  const { data: tasks } = useQueryGetTasks();
  const { mutateAsync } = useMutationEditActivity();

  const [isLoadingMutation, setIsLoadingMutation] = useState(false);

  const activityId = props.selectedActivity?.id;

  const handleSubmit = async (values: FormDataProps) => {
    if (!activityId) {
      return;
    }

    setIsLoadingMutation(true);
    mutateAsync({ ...values, selectedActivity: activityId })
      .then(() => {
        Alerts.SUCCESS("Atividade editada com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["GET_ACTIVITIES"] });
        props.onHide();
      })
      .catch(() => {
        Alerts.ERROR("Tempo não pode ultrapassar 6 horas");
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
          Edição de Atividade
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            studentCpf: props.selectedActivity?.student.cpf || "",
            date: props.selectedActivity?.date || "",
            scheduledStart: props.selectedActivity?.scheduledStart || "",
            scheduledEnd: props.selectedActivity?.scheduledEnd || "",
            taskIds: props.selectedActivity?.tasks.map((task) => task.id) || [],
          }}
          validationSchema={CreateActivitySchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, values, setFieldValue }) => (
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
                  defaultValue={props.selectedActivity?.tasks.map((task) => ({
                    value: task.id,
                    label: task.name,
                  }))}
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
                  // value={values["taskIds"]}
                  // onChange={(selectedOptions) => {
                  //   setFieldValue("taskIds", selectedOptions);
                  // }}
                  // options={tasksOptions}
                />
              </div>
              <div className="grid--datetimerange">
                <div>
                  <label htmlFor="scheduledStart">Data de ínicio</label>
                  <input
                    id="scheduledStart"
                    name="scheduledStart"
                    value={
                      props.startDate ||
                      formatDateStartAndEndEdit(values.scheduledStart)
                    }
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
                    value={
                      props.endDate ||
                      formatDateStartAndEndEdit(values.scheduledEnd)
                    }
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

export default ModalEditActivity;
