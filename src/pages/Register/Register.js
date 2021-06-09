import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { AppContext } from "../../context/userContext";
import { LOGIN } from "../../context/actionTypes";
import "./register.css";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name should be required please"),
  lastName: yup.string().required(),
  emailId: yup.string().email().required(),
  password: yup.string().min(6).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

export default function Register() {
  const history = useHistory();
  const { dispatch } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    localStorage.setItem("emailid", JSON.stringify(data.emailId));
    localStorage.setItem("password", JSON.stringify(data.password));
    dispatch({ type: LOGIN });
    history.push("/");
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
              <Form.Group size="lg" controlId="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="inputField"
                  type="text"
                  name="firstname"
                  {...register("firstName")}
                />
                <p className="errorMsg"> {errors.firstName?.message} </p>
              </Form.Group>
              <Form.Group size="lg" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className="inputField"
                  type="text"
                  name="lastName"
                  {...register("lastName")}
                />
                <p className="errorMsg"> {errors.lastName?.message} </p>
              </Form.Group>
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
              <Form.Group size="lg" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  className="inputField"
                  type="password"
                  name="confirmPassword"
                  {...register("confirmPassword")}
                />
                <p className="errorMsg">
                  {" "}
                  {errors.confirmPassword && "Passwords Should Match!"}{" "}
                </p>
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
