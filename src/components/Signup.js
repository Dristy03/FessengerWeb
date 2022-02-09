import React, { useRef, useState } from "react"
import { Form, Button, Alert} from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import styles from '../styles/Login.module.css'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/home")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
    <div className={styles.bg}>
    <br/>
    <br/>
    <br/>
      <div className={styles.login}>
        <div className={styles.form}>
      
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Control type="email" placeholder="Email" ref={emailRef} required/>
            <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
            <Form.Control type="password" placeholder="Confirm Password" ref={passwordConfirmRef} required />
            {error && <Alert variant="danger">{error}</Alert>}
            <Button disabled={loading} type="submit">Sign Up</Button>
            <p className={styles.message}>Already registered? <Link to="/login">Login</Link></p>
          </Form>
        </div>
      </div>
</div>
    </>
  )
}