import { Modal, Button } from "react-bootstrap";

interface ModalDeleteCourseProps {
  show: boolean;
  onHide: () => void;
}

function ModalDeleteCourse(props: ModalDeleteCourseProps) {
  // const { mutateAsync } = useMutationCreateCourse();

  // const handleSubmit = async (values: FormDataProps) => {
  //   mutateAsync(values).then(() => {
  //     queryClient.invalidateQueries({ queryKey: ["GET_COURSES"] });
  //     props.onHide();
  //   });
  // };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Deseja deletar o curso?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button type="button">NÃO</Button>
        <Button type="submit">SIM</Button>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDeleteCourse;
