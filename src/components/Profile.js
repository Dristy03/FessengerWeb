import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Card,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Profile.module.css";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import NavigationBar from "./NavigationBar.js";

export default function Profile() {
  const { updatePassword, updateName, updateBio, upload } = useAuth();

  const [info, setInfo] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, logout } = useAuth();
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(
    "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
  );
  const navigate = useNavigate();
  const [nameValue, setNameValue] = useState("");
  const [bioValue, setBioValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const nameRef = useRef();
  const bioRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const imageRef = useRef();

  function handleChange(e) {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setPhoto(e.target.files[0]);
      setPhotoURL(URL.createObjectURL(e.target.files[0]))
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (passwordRef.current.value !== currentUser.password) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    if (nameRef.current.value) {
      promises.push(updateName(nameRef.current.value));
    }

    if (bioRef.current.value) {
      promises.push(updateBio(bioRef.current.value));
    }

    if (imageRef.current.value) {
      promises.push(upload(photo, currentUser, setLoading));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/home/profile");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
        alert("Profile is updated successfully!");
      });
  }

  useEffect(() => {
    const fetchData = async () => {
    
      const storage = getStorage();
      const imageRef = ref(storage, "images/" + currentUser.email);

      getDownloadURL(imageRef)
        .then((url) => {
          setPhotoURL(url);
        })
        .catch( ()=>{
          setError("Failed to fetch image");
          
        });

      const docRef = doc(db, "Users", currentUser.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        var data = docSnap.data();
        setNameValue(data.Name);
        setBioValue(data.Bio);
        setEmailValue(data.Email);
        setPasswordValue(data.Password);
        setConfirmPasswordValue(data.Password);
        console.log(data);
        // setInfo((arr) => [...arr, data]);
      } else {
        console.log("No such document!");
      }
    };
    fetchData();
  },[]);

 
  return (
    <>
     <NavigationBar/>

      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-3">
            <div className={styles.cardContainer}>
              <img className={styles.imground} src={photoURL} alt="user" />

              <h3>{nameValue}</h3>

              <p>{bioValue}</p>
              <div>
                <button
                  className="btn btn-sm"
                  style={{ color: "black", backgroundColor: "white" }}
                >
                  History
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="tab-content">
              <div className="tab-pane active" id="home">
                <Card className="p-5  mb-5">
                  {/* {info.map((data) => (
                    <> */}
                  <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label for="name">
                          <h6>Name</h6>
                        </label>

                        <Form.Control
                          type="text"
                          className="form-control"
                          ref={nameRef}
                          name="name"
                          onChange={(e) => setNameValue(e.target.value)}
                          defaultValue={nameValue}
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>

                    <div className="form-group mt-3">
                      <div className="col-xs-6">
                        <label for="bio">
                          <h6>Bio</h6>
                        </label>

                        <Form.Control
                          type="text"
                          className="form-control"
                          ref={bioRef}
                          name="bio"
                          onChange={(e) => setBioValue(e.target.value)}
                          defaultValue={bioValue}
                          placeholder="Write something about yourself"
                        />
                      </div>
                    </div>

                    <div className="form-group mt-3">
                      <div className="col-xs-6">
                        <label for="email">
                          <h6>Email Address</h6>
                        </label>
                        <Form.Control
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={(e) => setEmailValue(e.target.value)}
                          value={emailValue}
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <div className="form-group mt-3">
                      <div className="col-xs-6">
                        <label for="image">
                          <h6>Profile picture</h6>
                        </label>

                        <Form.Control
                          type="file"
                          name="image"
                          className="form-control"
                          ref={imageRef}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group mt-3">
                      <div className="col-xs-6">
                        <label for="password">
                          <h6>Password</h6>
                        </label>
                        <Form.Control
                          type="password"
                          className="form-control"
                          ref={passwordRef}
                          name="password"
                          onChange={(e) => setPasswordValue(e.target.value)}
                          defaultValue={passwordValue}
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>
                    <div className="form-group mt-3">
                      <div className="col-xs-6">
                        <label for="password2">
                          <h6>Confirm Password</h6>
                        </label>
                        <Form.Control
                          type="password"
                          className="form-control"
                          name="password2"
                          ref={passwordConfirmRef}
                          onChange={(e) =>
                            setConfirmPasswordValue(e.target.value)
                          }
                          defaultValue={confirmPasswordValue}
                          placeholder="Confirm your password"
                        />
                      </div>
                    </div>

                    <div className="form-group mt-3">
                      <div className="col-xs-12">
                        <br />
                        <button
                          disabled={loading}
                          className="btn"
                          style={{ backgroundColor: "#6FB3F8" }}
                          type="submit"
                        >
                          Save
                        </button>

                        <button
                          className="btn"
                          style={{ backgroundColor: "#b2beb5", marginLeft: 10 }}
                          onClick={() => window.location.reload(false)}
                        >
                          Cancel
                        </button>

                        {/* <Link disabled={loading}
                            className="btn"
                            style={{ backgroundColor: "#b2beb5", marginLeft: 10 }} to="/home/profile">Cancel</Link> */}
                      </div>
                    </div>
                  </form>
                  {/* </>
                  ))} */}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
