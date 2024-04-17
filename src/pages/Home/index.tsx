import { useState } from "react";

import { Container, Button } from "react-bootstrap";

import ModalCreateCourse from "./components/ModalCreateCourse";
import CardCourse from "./components/CardCourse";
import "./styles.css";
import { useQueryGetCourses } from "../../hooks/useCourses/useQueryGetCourses";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const { data } = useQueryGetCourses();

  const handleCloseCreateCourseModal = () => setModalShow(false);
  const handleOpenCreateCourseModal = () => setModalShow(true);

  return (
    <>
      <Container>
        <ModalCreateCourse
          show={modalShow}
          onHide={handleCloseCreateCourseModal}
        />
        <Button className="btn--center" onClick={handleOpenCreateCourseModal}>
          Adicione um novo curso!
        </Button>
        <main className="container--wrapper">
          {data?.map((course) => (
            <CardCourse title={course.name} key={course.id} />
          ))}
        </main>
      </Container>
    </>
  );
};

export default Home;
