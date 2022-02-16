import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

import NavigationBar from "./NavigationBar.js";

export default function ContactUs() {
  const subjectRef = useRef()
  const mailRef = useRef()
  const [info, setInfo] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();



  return (
    <>
      <NavigationBar />
      <br/>
      <br/>
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div
                className=" d-none d-md-flex"
                style={{
                  width: "45%",
                  background:
                    "scroll center url('https://i.pinimg.com/564x/43/ad/31/43ad316fb8212807903fb5616d35f8b3.jpg')",
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="card-body p-4 p-sm-5">
                <h3 className="card-title text-center " style={{ color: "#749CC2" }}>
                  Contact Us
                </h3 >
                <p className="text-center mb-5 ">
                  How can we help you? We will love to hear!
                </p>
                <form >
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      required
                      ref={subjectRef}
                    />
                    <label >Subject</label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea
                      type="text"
                      className="form-control"
                      style={{ height: 200 }}
                      required
                      ref={mailRef}
                    />
                    <label>Message</label>
                  </div>

                  <div className="d-grid mb-2">
                    <button
                      className="btn fw-bold text-uppercase"
                      type="submit"
                      style={{backgroundColor: "#6FB3F8",
                    color: "white"}}
                    onClick={() => window.location = 'mailto:fessenger003@gmail.com'}
                    >
                    Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
