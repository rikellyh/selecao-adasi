import { useState } from "react";

import { Container, Button } from "react-bootstrap";

import { useQueryGetCourses } from "../../hooks/useCourses/useQueryGetCourses";

import ModalCreateCourse from "./components/ModalCreateCourse";
import ModalDeleteCourse from "./components/ModalDeleteCourse";
import ModalEditCourse from "./components/ModalEditCourse";
import CardCourse from "./components/CardCourse";

import "./styles.css";

const Home = () => {
  const [modalShowCreateCourse, setModalShowCreateCourse] = useState(false);
  const [modalShowEditCourse, setModalShowEditCourse] = useState(false);
  const [modalShowDeleteCourse, setModalShowDeleteCourse] = useState(false);

  const { data } = useQueryGetCourses();

  const handleCloseCreateCourseModal = () => setModalShowCreateCourse(false);
  const handleOpenCreateCourseModal = () => setModalShowCreateCourse(true);

  const handleCloseEditCourseModal = () => setModalShowEditCourse(false);
  const handleOpenEditCourseModal = () => setModalShowEditCourse(true);

  const handleCloseDeleteCourseModal = () => setModalShowDeleteCourse(false);
  const handleOpenDeleteCourseModal = () => setModalShowDeleteCourse(true);

  return (
    <>
      <Container>
        <ModalCreateCourse
          show={modalShowCreateCourse}
          onHide={handleCloseCreateCourseModal}
        />
        <ModalEditCourse
          show={modalShowEditCourse}
          onHide={handleCloseEditCourseModal}
        />
        <ModalDeleteCourse
          show={modalShowDeleteCourse}
          onHide={handleCloseDeleteCourseModal}
        />
        <Button className="btn__center" onClick={handleOpenCreateCourseModal}>
          Adicione um novo curso!
        </Button>
        <main className="container--wrapper">
          {data && data.length ? (
            data.map((course) => (
              <CardCourse
                title={course.name}
                key={course.id}
                handleEdit={handleOpenEditCourseModal}
                handleDelete={handleOpenDeleteCourseModal}
              />
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
