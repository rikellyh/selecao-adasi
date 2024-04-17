import { ErrorMessage, Field, Form, Formik } from "formik";
import { Modal, Button } from "react-bootstrap";
import { CreateCourseSchema } from "../../../../schemas";
import { useMutationCreateCourse } from "../../../../hooks/useCourses/useQueryCreateCourse";
import { queryClient } from "../../../../App";
interface FormDataProps {
  name: string;
}

interface ModalCreateCourseProps {
  show: boolean;
  onHide: () => void;
}

function ModalCreateCourse(props: ModalCreateCourseProps) {
  const { mutateAsync } = useMutationCreateCourse();

  const handleSubmit = async (values: FormDataProps) => {
    mutateAsync(values).then(() => {
      queryClient.invalidateQueries({ queryKey: ["GET_COURSES"] });
      props.onHide();
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
              <Button type="submit" disabled={isSubmitting || !isValid}>
                Salvar
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default ModalCreateCourse;
