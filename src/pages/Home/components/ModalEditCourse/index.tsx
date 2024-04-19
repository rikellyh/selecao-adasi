import { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Modal } from "react-bootstrap";

import { queryClient } from "../../../../App";
import { Course } from "../../../../types/courses";
import { CreateCourseSchema } from "../../../../schemas";
import { useMutationEditCourse } from "../../../../hooks/useCourses/useQueryEditCourse";

import { ButtonLoading } from "../../../../components/ButtonLoading";
import { Alerts } from "../../../../components/Toast";

interface FormDataProps {
  name: string;
}

interface ModalEditCourseProps {
  show: boolean;
  onHide: () => void;
  selectedCourse: Course | null;
}

function ModalEditCourse(props: ModalEditCourseProps) {
  const courseId = props.selectedCourse?.id;
  const { mutateAsync } = useMutationEditCourse();
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);

  const handleSubmit = async (values: FormDataProps) => {
    if (!courseId) {
      return;
    }

    setIsLoadingMutation(true);
    mutateAsync({ ...values, id: courseId })
      .then(() => {
        Alerts.SUCCESS("Curso editado com sucesso!");
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
          Deseja editar o curso?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: props.selectedCourse?.name || "" }}
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

export default ModalEditCourse;
