import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";


import { db } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import NavigationBar from "./NavigationBar.js";

export default function History() {
  const { updatePassword, updateName, updateBio, upload } = useAuth();

  const [info, setInfo] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const mailRef = collection(db, "Mails", currentUser.email, "Details");
      const docSnap = await getDocs(mailRef);
      docSnap.forEach((doc) => {
  
        console.log(doc.id, " => ", doc.data());
        setInfo((arr) => [...arr, doc.data()]);
      });

      info.reverse();
    }

    fetchData();
  }, []);

  return (
    <>
      <NavigationBar />

      <div className="container" style={{ textAlign: "center", marginTop: 80 }}>
        <h1>History</h1>

        <h6 style={{ color: "#749CC2" }}>
          The work of today is the history of tomorrow
        </h6>
      </div>
      {info.map((data,index) => (
                    
        <div key={index} className="row m-5" >
          <div className="col-lg-6 mx-auto" >
            <blockquote
              className="blockquote  p-4 shadow rounded"
              style={{ position: "relative", fontSize: "1.1rem" }}
            >
                <small style={{float: "right"}}>
                   {data.CurrentDate}
                </small>
                <br/>
              <h5 className="mb-0 mt-2" style={{textAlign: "center", color:"#6FB3F8"}}>
                You have sent a message to your future self!
              </h5>
              <p style={{textAlign: "center", fontSize: 15, marginTop:20, fontFamily:"bold", fontStyle:"bold"}}>
                 Arrival Date : {data.Date}
              </p>
              <footer className="blockquote-footer pt-4 mt-4 border-top">
               Stay Connected
              </footer>
            </blockquote>
          </div>
        
      </div>
      ))}
    </>
  );
}
