import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const ScheduleHeader = () => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container fluid>
          <Link to="/" className="nav-link">
            스케쥴
          </Link>
          <Nav className="me-auto">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/schedule" className="nav-link">
              일정관리
            </Link>
            <Link to="/memo" className="nav-link">
              메모관리
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default ScheduleHeader;
