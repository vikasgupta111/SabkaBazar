import React, { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import { AppContext } from "../../context/userContext";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { LOGIN } from "../../context/actionTypes";

import "./register.css";

let obj = {
  firstname: "",
  lastname: "",
  emailid: "",
  password: "",
  confirmpassword: "",
};

let errorObj = {
  firstname: "",
  lastname: "",
  emailid: "",
  password: "",
  confirmpassword: "",
};

export default function Register() {
  const history = useHistory();
  const [fields, setfields] = useState(obj);
  const [errors, setErrors] = useState(errorObj);
  const { dispatch } = useContext(AppContext);
  const [wrongDetails, setWrongdetails] = useState(false);

  const handleChange = (e) => {
    let val = fields;
    val[e.target.name] = e.target.value;
    setfields((prevState) => ({
      ...prevState,
      val,
    }));
  };

  const submituserSignUpForm = (e) => {
    e.preventDefault();
    let fieldValues = fields;
    if (validateForm(fields)) {
      localStorage.setItem("emailid", JSON.stringify(fieldValues.emailid));
      localStorage.setItem("password", JSON.stringify(fieldValues.password));
      let fields = {};
      fields["firstname"] = "";
      fields["lastname"] = "";
      fields["emailid"] = "";
      fields["password"] = "";
      fields["confirmpassword"] = "";
      setfields(fields);
      dispatch({ type: LOGIN });
      history.push("/");
    } else {
      setWrongdetails(true);
    }
  };

  const validateForm = (par) => {
    let fields = par;
    let errors = {};
    let formIsValid = true;

    if (!fields["firstname"]) {
      formIsValid = false;
      errors["firstname"] = "*Please enter your firstname.";
    }

    if (typeof fields["firstname"] !== "undefined") {
      if (!fields["firstname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstname"] = "*Please enter alphabet characters only.";
      }
    }
    if (!fields["lastname"]) {
      formIsValid = false;
      errors["lastname"] = "*Please enter your lastname.";
    }

    if (typeof fields["lastname"] !== "undefined") {
      if (!fields["lastname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastname"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email-ID.";
    }

    if (typeof fields["emailid"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email-ID.";
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (
        !fields["password"].match(
          /^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
      ) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
      }
    }

    if (!fields["confirmpassword"]) {
      formIsValid = false;
      errors["confirmpassword"] = "*Please enter your password.";
    }
    if (typeof fields["confirmpassword"] !== "undefined") {
      if (
        !fields["confirmpassword"].match(
          /^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
      ) {
        formIsValid = false;
        errors["confirmpassword"] = "*Please enter secure and strong password.";
      }
    }

    setErrors(errors);
    return formIsValid;
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
            {wrongDetails && (
              <Form.Label className="errorMsg">
                password and confirm Password does not match
              </Form.Label>
            )}
            <Form onSubmit={submituserSignUpForm}>
              <Form.Group size="lg" controlId="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="inputField"
                  type="text"
                  name="firstname"
                  value={fields.firstname}
                  onChange={handleChange}
                />
                {!fields.firstname && (
                  <div className="errorMsg">{errors.firstname}</div>
                )}
              </Form.Group>
              <Form.Group size="lg" controlId="lastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className="inputField"
                  type="text"
                  name="lastname"
                  value={fields.lastname}
                  onChange={handleChange}
                />
                {!fields.lastname && (
                  <div className="errorMsg">{errors.lastname}</div>
                )}
              </Form.Group>

              <Form.Group size="lg" controlId="emailid">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="inputField"
                  type="email"
                  name="emailid"
                  value={fields.emailid}
                  onChange={handleChange}
                />
                {!fields.emailid && (
                  <div className="errorMsg">{errors.emailid}</div>
                )}
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="inputField"
                  type="password"
                  name="password"
                  value={fields.password}
                  onChange={handleChange}
                />
                {!fields.password && (
                  <div className="errorMsg">{errors.password}</div>
                )}
              </Form.Group>

              <Form.Group size="lg" controlId="confirmpassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  className="inputField"
                  type="password"
                  name="confirmpassword"
                  value={fields.confirmpassword}
                  onChange={handleChange}
                />
                {!fields.confirmpassword && (
                  <div className="errorMsg">{errors.confirmpassword}</div>
                )}
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
