import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link , useNavigate} from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { Alert } from "react-bootstrap";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState("");
  const {signUp} = useUserAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await signUp(email,password);
      navigate("/")
    }catch(err) {
      setError(err.message)
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="p-4 box">
          <h2 className="m-3 d-flex justify-content-center ">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert> }
          <Form className="p-2" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                Enter a valid email address
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
          <hr />
          <div className="m-3 d-flex justify-content-center ">
            Already have an account? <Link to="/">Log In</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
