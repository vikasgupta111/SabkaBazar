import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { AppContext } from "../../context/userContext";
import { LOGIN } from "../../context/actionTypes";
import validateUser from "../../utilities/UserValidation";
import "./signIn.css";

const schema = yup.object().shape({
  emailId: yup.string().email().required(),
  password: yup.string().min(6).max(15).required(),
});

export default function SignIn() {
  const history = useHistory();
  const [error, setError] = useState("");
  const { dispatch } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (validateUser(data)) {
      setError("");
      dispatch({ type: LOGIN });
      history.push("/");
    } else {
      setError("Wrong Credentials");
    }
  };

  return (
    <div className="signUpWrapper">
      <Container>
        <Row>
          <Col md={6}>
            <h3>Signup</h3>
            <p>We do not share your personal details with anyone.</p>
          </Col>
          <Col md={6}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {error ? (
                <Form.Label className="errorMsg">{error}</Form.Label>
              ) : null}
              <Form.Group size="lg" controlId="emailId">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="inputField"
                  type="email"
                  name="emailId"
                  {...register("emailId")}
                />
                <p className="errorMsg"> {errors.emailId?.message} </p>
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="inputField"
                  type="password"
                  name="password"
                  {...register("password")}
                />
                <p className="errorMsg"> {errors.password?.message} </p>
              </Form.Group>

              <button className="buttonSignUp" block size="lg" type="submit">
                Signup
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
