import { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";

import { Student } from "../../../../types/students";
import { CreateStudentSchema } from "../../../../schemas";
import { useQueryGetCourses } from "../../../../hooks/useCourses/useQueryGetCourses";
import { useMutationEditStudent } from "../../../../hooks/useStudents/useQueryEditStudent";

import { ButtonLoading } from "../../../../components/ButtonLoading";
import { Alerts } from "../../../../components/Toast";

interface FormDataProps {
  cpf: string;
  name: string;
  registration: string;
  courseId: string;
}

interface ModalEditStudentProps {
  show: boolean;
  onHide: () => void;
  registration: string;
  cpf: string;
  selectedStudent: Student | null;
  handleCpfChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegistrationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ModalEditStudent(props: ModalEditStudentProps) {
  const { data: courses } = useQueryGetCourses();
  const { mutateAsync } = useMutationEditStudent();
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (values: FormDataProps) => {
    if (!props.selectedStudent?.cpf) {
      return;
    }

    setIsLoadingMutation(true);

    const formattedValues = {
      ...values,
      cpf:
        values.cpf.slice(0, 11) &&
        values.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4"),
      selectedStudentCpf: props.selectedStudent.cpf,
    };

    mutateAsync(formattedValues)
      .then(() => {
        Alerts.SUCCESS("Estudante editado com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["GET_STUDENTS"] });
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
          Editar Estudante
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: props.selectedStudent?.name || "",
            cpf: props.selectedStudent?.cpf || props.cpf,
            registration:
              props.selectedStudent?.registration || props.registration,
            courseId: props.selectedStudent?.course.id || "",
          }}
          validationSchema={CreateStudentSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, values, setFieldValue }) => (
            <Form>
              <div>
                <label htmlFor="name">Nome do estudante</label>
                <Field type="text" name="name" placeholder="Ex: João Silva" />
                <ErrorMessage
                  name="name"
                  className="errorMessage"
                  component="div"
                />
              </div>
              <div>
                <label htmlFor="cpf">CPF</label>
                <Field
                  type="text"
                  name="cpf"
                  value={props.cpf || values.cpf}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("cpf", e.target.value);
                    props.handleCpfChange(e);
                  }}
                  placeholder="XXX.XXX.XXX-XX"
                />
                <ErrorMessage
                  name="cpf"
                  className="errorMessage"
                  component="div"
                />
              </div>
              <div>
                <label htmlFor="registration">RG</label>
                <Field
                  type="text"
                  name="registration"
                  value={props.registration || values.registration}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("registration", e.target.value);
                    props.handleRegistrationChange(e);
                  }}
                  placeholder="XX.XXX.XXX-X"
                />
                <ErrorMessage
                  name="registration"
                  className="errorMessage"
                  component="div"
                />
              </div>
              <div className="field--select">
                <label htmlFor="courseId">Curso a ser matriculado</label>
                <Field as="select" id="courseId" name="courseId">
                  <option value="">Selecione o curso</option>
                  {courses &&
                    courses.map((course) => (
                      <option value={course.id}>{course.name}</option>
                    ))}
                </Field>
                <ErrorMessage
                  name="courseId"
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

export default ModalEditStudent;
