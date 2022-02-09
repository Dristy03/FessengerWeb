import React, { useRef, useState } from "react"
import { Form, Button, Alert} from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import styles from '../styles/Login.module.css'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/home")
    } catch {
      setError("Failed to log in")
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
            
            {error && <Alert variant="danger">{error}</Alert>}
            <Button disabled={loading} type="submit">login</Button>
            <p className={styles.message}>Not registered? <Link to="/signup">Create an account</Link></p>
          </Form>
        </div>
      </div>
      </div>
    </>
  )
}