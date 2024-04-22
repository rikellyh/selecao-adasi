import { useState } from "react";

import { Container, Button } from "react-bootstrap";

import { Course } from "../../types/courses";
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
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const { data } = useQueryGetCourses();

  const handleCloseCreateCourseModal = () => setModalShowCreateCourse(false);
  const handleOpenCreateCourseModal = () => setModalShowCreateCourse(true);

  const handleCloseEditCourseModal = () => setModalShowEditCourse(false);
  const handleOpenEditCourseModal = (courseData: Course) => {
    setModalShowEditCourse(true);
    setSelectedCourse(courseData);
  };

  const handleCloseDeleteCourseModal = () => setModalShowDeleteCourse(false);
  const handleOpenDeleteCourseModal = (courseData: Course) => {
    setModalShowDeleteCourse(true);
    setSelectedCourse(courseData);
  };

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
          selectedCourse={selectedCourse}
        />
        <ModalDeleteCourse
          show={modalShowDeleteCourse}
          onHide={handleCloseDeleteCourseModal}
          selectedCourse={selectedCourse}
        />
        <Button className="btn__center" onClick={handleOpenCreateCourseModal}>
          Adicione um novo curso!
        </Button>
        <main className="container--wrapper">
          {data && data.length ? (
            data
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((course) => (
                <CardCourse
                  title={course.name}
                  key={course.id}
                  handleEdit={() => handleOpenEditCourseModal(course)}
                  handleDelete={() => handleOpenDeleteCourseModal(course)}
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
