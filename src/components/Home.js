import React, { useState } from "react";


import {
  FloatingLabel,
  Form,
  NavDropdown,
  Nav,
  Navbar,
  Container,
  Button
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../lotties/mail";


export default function Home() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
 
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/Icon.png"
              width="30"
              height="30"
              classNameName="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            Fessenger
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav classNameName="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="/home/profile">Profile</Nav.Link>
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item variant="link" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>

      <div className="container" style={{textAlign: "center"}}>
        <h1>Write to your Future</h1>

        <h6 style={{ color: "#749CC2" }}>
          We remember the past, live in the present, write the future.
        </h6>

        <FloatingLabel
          controlId="floatingInput"
          label="Title of the message"
          className="mt-5"
        >
          <Form.Control type="text" placeholder="name@example.com" />
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea2" label="Message"  className="mt-3">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "200px" }}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Date of receiving mail "
          className="mt-5"
        >
          <Form.Control type="date"  />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Time of receiving mail "
          className="mt-3"
        >
          <Form.Control type="time"  />
        </FloatingLabel>

        <Button style={{backgroundColor: "#6FB3F8"}} className="mt-5 mb-5" size="lg">Send</Button>
      </div>
    </>
  );
}
