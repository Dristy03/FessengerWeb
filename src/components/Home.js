import React, { useState, useRef } from "react";

import { FloatingLabel, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../lotties/mail";
import NavigationBar from "./NavigationBar.js";
import { auth, db, storage } from "../firebase";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";

export default function Home() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { format } = require("date-fns");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [counter, setCounterValue] = useState(0);
  const [title, setTitleValue] = useState("");
  const [message, setMessageValue] = useState("");
  const [time, setTimeValue] = useState("");
  const [date, setDateValue] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const titleRef = useRef();
  const messageRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };
  const getCurrentDate = ()=> {

    let newDate = new Date()
    let Tdate = newDate.getDate();
    let Tmonth = newDate.getMonth() + 1;
    let Tyear = newDate.getFullYear();
    
    return `${Tdate}.${Tmonth<10?`0${Tmonth}`:`${Tmonth}`}.${Tyear}`
    }

  async function saveData(counter) {
    console.log(counter);
  
    let newDate = new Date()
    let Tdate = newDate.getDate();
    let Tmonth = newDate.getMonth() + 1;
    let Tyear = newDate.getFullYear();

    const date = new Date(dateRef.current.value);
    const today = format(date, "EEEE, MMM dd, yyyy");
    const year = format(date, "yyyy");
    const month = format(date, "MM");
    const day = format(date, "dd");

    const title = titleRef.current.value;
    const message = messageRef.current.value;

    console.log(today);
    await setDoc(
      doc(db, "Mails", currentUser.email, "Details", counter.toString()),
      {
        Title: title,
        Message: message,
        Date: today,
        Priority: `${Tyear}${Tmonth<10?`0${Tmonth}`:`${Tmonth}`}${Tdate}`,
        Email: currentUser.email,
        CurrentDate: `${Tdate}.${Tmonth<10?`0${Tmonth}`:`${Tmonth}`}.${Tyear}`
      }
    );

    await setDoc(doc(db, "MailDatabase", year, month, day), {
      SentAllMails: false,
    });

    await setDoc(
      doc(
        db,
        "MailDatabase",
        year,
        month,
        day,
        "Emails",
        currentUser.email + counter.toString()
      ),
      {
        Email: currentUser.email,
        Message: message,
        Title: title,
        Date: today,
      }
    );

    updateCounter(counter);
  }

  async function fetchCounter() {
    const docRef = doc(db, "Users", currentUser.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      var data = docSnap.data();
      // setCounterValue(data.MailCounter)
      // console.log(data.MailCounter)
      // console.log(counter)
      saveData(data.MailCounter);
    } else {
      console.log("No such document!");
    }
  }

  async function updateCounter(counter) {
    const counterRef = doc(db, "Users", currentUser.email);

    await updateDoc(counterRef, {
      MailCounter: counter + 1,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const promises = [];
    setLoading(true);
    setError("");

    promises.push(fetchCounter());
    // promises.push(saveData());
    // promises.push(updateCounter());

    Promise.all(promises)
      .then(() => {})
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
        setTitleValue("");
        setMessageValue("");
        setDateValue("");
        setTimeValue("");
        alert("Mail saved!");
      });
  }

  return (
    <>
      <NavigationBar />

      <div>
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>

      <div className="container" style={{ textAlign: "center" }}>
        <h1>Write to your Future</h1>

        <h6 style={{ color: "#749CC2" }}>
          We remember the past, live in the present, write the future.
        </h6>
        <form className="form" onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Title of the message"
            className="mt-5"
          >
            <Form.Control
              type="text"
              ref={titleRef}
              required
              value={title}
              onChange={(e) => setTitleValue(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea2"
            label="Message"
            className="mt-3"
          >
            <Form.Control
              as="textarea"
              ref={messageRef}
              required
              style={{ height: "200px" }}
              value={message}
              onChange={(e) => setMessageValue(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Date of receiving mail "
            className="mt-5"
          >
            <Form.Control
              type="date"
              ref={dateRef}
              required
              value={date}
              min={disablePastDate()}
              onChange={(e) => setDateValue(e.target.value)}
            />
          </FloatingLabel>

          <button
            style={{ backgroundColor: "#6FB3F8" }}
            className="btn mt-5 mb-5"
            size="lg"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}
