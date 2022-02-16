import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Welcome from "./Welcome";
import Profile from "./Profile"
import History from "./History";
import ContactUs from "./ContactUs";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";



function App() {
  return (
    <>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/home" element={<PrivateRoute />}>
                <Route path="/home" element={<Home />} />
                {/* <Route path="/home/profile" element={<Profile />} /> */}
                <Route path="/home/history" element={<History />} />
                <Route path="/home/contact-us" element={<ContactUs />} />
              </Route>
              <Route path="/" element={<Welcome />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
   </>
  );
}

export default App;

// #749CC2
// #6FB3F8