import { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";

import { CreateStudentSchema } from "../../../../schemas";
import { useQueryGetCourses } from "../../../../hooks/useCourses/useQueryGetCourses";
import { useMutationCreateStudent } from "../../../../hooks/useStudents/useQueryCreateStudent";

import { ButtonLoading } from "../../../../components/ButtonLoading";
import { Alerts } from "../../../../components/Toast";

interface FormDataProps {
  cpf: string;
  name: string;
  registration: string;
  courseId: string;
}

interface ModalCreateStudentProps {
  show: boolean;
  onHide: () => void;
  registration: string;
  cpf: string;
  handleCpfChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegistrationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ModalCreateStudent(props: ModalCreateStudentProps) {
  const { data: courses } = useQueryGetCourses();
  const { mutateAsync } = useMutationCreateStudent();
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (values: FormDataProps) => {
    setIsLoadingMutation(true);

    const formattedValues = {
      ...values,
      cpf: values.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4"),
    };

    mutateAsync(formattedValues)
      .then(() => {
        Alerts.SUCCESS("Estudante Adicionado!");
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
          Cadastro de Estudante
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: "",
            cpf: props.cpf,
            registration: props.registration,
            courseId: "",
          }}
          validationSchema={CreateStudentSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, setFieldValue }) => (
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
                  value={props.cpf}
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
                  value={props.registration}
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

export default ModalCreateStudent;
