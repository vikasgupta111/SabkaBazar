import React from "react";
import Form from "react-bootstrap/Form";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../context/userContext";
import { LOGIN } from "../../context/reducer";

import "./signIn.css";

export default function SignIn() {
  const history = useHistory();
  const { dispatch } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [wrongDetails, setWrongdetails] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function validateUser() {
    const registeredEmail = JSON.parse(localStorage.getItem("emailid"));
    const registeredPassword = JSON.parse(localStorage.getItem("password"));

    let formisValid = false;
    if (registeredEmail === email && registeredPassword === password) {
      formisValid = true;
    }
    setErrors("Incorrect EmailID and password");
    return formisValid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateUser()) {
      setEmail("");
      setPassword("");
      setErrors("");
      dispatch({ type: LOGIN });
      history.push("/");
      // alert("Successfully Logged In");
    } else {
      setWrongdetails(true);
    }
  }
  return (
    <div className="loginWrapper">
      <Container>
        <Row>
          <Col md={6}>
            <h3>Login</h3>
            <p>Get access to your Orders,Wishlist and Recommendations.</p>
          </Col>
          <Col md={6}>
            {wrongDetails && (
              <Form.Label className="errorMsg">
                Incorrect email or Password
              </Form.Label>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label className="label">Email</Form.Label>
                <Form.Control
                  className="inputField"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!email && <div className="errorMsg">{errors}</div>}
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label className="label">Password</Form.Label>
                <Form.Control
                  className="inputField"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!password && <div className="errorMsg">{errors}</div>}
              </Form.Group>
              <Button
                className="buttonLogin"
                block
                size="lg"
                type="submit"
                disabled={!validateForm()}
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
