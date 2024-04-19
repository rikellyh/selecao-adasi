import { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Modal } from "react-bootstrap";

import { queryClient } from "../../../../App";
import { CreateCourseSchema } from "../../../../schemas";
import { useMutationCreateCourse } from "../../../../hooks/useCourses/useQueryCreateCourse";

import { Alerts } from "../../../../components/Toast";
import { ButtonLoading } from "../../../../components/ButtonLoading";
interface FormDataProps {
  name: string;
}

interface ModalCreateCourseProps {
  show: boolean;
  onHide: () => void;
}

function ModalCreateCourse(props: ModalCreateCourseProps) {
  const { mutateAsync } = useMutationCreateCourse();
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);

  const handleSubmit = async (values: FormDataProps) => {
    setIsLoadingMutation(true);

    mutateAsync(values)
      .then(() => {
        Alerts.SUCCESS("Curso criado com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["GET_COURSES"] });
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
          Digite o nome do curso abaixo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: "" }}
          validationSchema={CreateCourseSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div>
                <label htmlFor="name">Nome do curso</label>
                <Field type="name" name="name" />
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

export default ModalCreateCourse;
