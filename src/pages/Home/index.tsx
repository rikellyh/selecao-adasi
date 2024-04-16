import { useState } from "react";

import { Container, Button } from "react-bootstrap";

import ModalCreateCourse from "./components/ModalCreateCourse";
import CardCourse from "./components/CardCourse";
import "./styles.css";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Container>
        <ModalCreateCourse
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <Button className="btn--center" onClick={() => setModalShow(true)}>
          Adicione um novo curso!
        </Button>
        <main className="container--wrapper">
          <CardCourse title="bomdia" />
          <CardCourse title="bomdia" />
          <CardCourse title="bomdia" />
          <CardCourse title="bomdia" />
          <CardCourse title="bomdia" />
          <CardCourse title="bomdia" />
        </main>
      </Container>
    </>
  );
};

export default Home;
