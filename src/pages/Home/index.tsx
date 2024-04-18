import { useState } from "react";

import { Container, Button } from "react-bootstrap";

import { useQueryGetCourses } from "../../hooks/useCourses/useQueryGetCourses";
import ModalCreateCourse from "./components/ModalCreateCourse";
import CardCourse from "./components/CardCourse";

import "./styles.css";

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
        <Button className="btn__center" onClick={handleOpenCreateCourseModal}>
          Adicione um novo curso!
        </Button>
        <main className="container--wrapper">
          {data && data.length ? (
            data.map((course) => (
              <CardCourse title={course.name} key={course.id} />
            ))
          ) : (
            <>
              <h1>Sem cursos cadastrados ainda!</h1>
            </>
          )}
        </main>
      </Container>
    </>
  );
};

export default Home;
