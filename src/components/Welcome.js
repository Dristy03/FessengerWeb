import React from "react";
import { Button, Nav, Navbar, Container } from "react-bootstrap";

import { Link } from "react-router-dom";
import styles from "../styles/Login.module.css";

export default function Welcome() {
  return (
    <>
      <div className={styles.bg}>
        <Nav className="navbar navbar-light ">
          <Link
            className="ms-auto me-3 btn btn-primary text-white shadow"
            to="/login"
            style={{backgroundColor: "#6FB3F8"}}
          >
            {" "}
            Get Started
          </Link>
        </Nav>

        <div className="container " style={{ textAlign: "center" }}>
          <img className="img-fluid" src="Header.png" alt="" />
        </div>
      </div>
    </>
  );
}
