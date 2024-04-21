import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import "./styles.css";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">Home</Link>
            <Link to="/students">Estudantes</Link>
            <Link to="/tasks">Tarefas</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
