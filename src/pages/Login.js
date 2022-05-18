import {
  Alert,
  Button,
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  Form,
} from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaKey,
  FaAngleRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { signUp, login } from "../api/post";
import { userActions } from "../store/userSlice";
import { boolsAction } from "../store/bools";
import axios from "axios";
import { motion } from "framer-motion";
import { useHistory, useLocation } from "react-router";

import useForm from "../helpers/useForm";
import validation from "../helpers/validation";

const Login = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [, setCookies] = useCookies();

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState();

  const { handleChange, handleSubmit, values, errors } = useForm(
    validation,
    props.type
  );

  const formHandler = async (e) => {
    const errors = handleSubmit(e);
    console.log(errors);
    if (!errors) {
      if (props.type === "Sign Up") {
        const res = await signUp({ ...values });
        console.log([res.data]);
        if (res.data.error) setError(res.data.error);
        else
          history.push("/login", {
            note: res.data.note,
          });
      }
      if (props.type === "Login") {
        console.log("errors: ", Object.keys(errors));
        const res = await login({ ...values });

        if (res.data.error) setError(res.data.error);
        else {
          setCookies("user", res.data.user, { path: "/" });
          setCookies("token", res.data.token, { path: "/" });
          setCookies("isLoggedIn", true, { path: "/" });
          axios.defaults.headers.common["Authorization"] = res.data.token;
          dispatch(userActions.appendUser(res.data.user));
          dispatch(boolsAction.setIsLoggedIn(true));
        }
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg="6" md="8" sm="10" xs="12">
          <Card className="p-2" bg="light">
            <Card.Title>{props.type}</Card.Title>
            <Card.Body className="m-2">
              {error && (
                <Row className="justify-content-center">
                  <Col lg="12" md="12" sm="12" xs="12">
                    <Alert size="sm" variant="danger">
                      {error}
                    </Alert>
                  </Col>
                </Row>
              )}
              {location.state && location.state.note && (
                <Row className="justify-content-center">
                  <Col lg="12" md="12" sm="12" xs="12">
                    <Alert size="sm" variant="info">
                      {location.state.note}
                    </Alert>
                  </Col>
                </Row>
              )}
              <Form onSubmit={formHandler}>
                {props.type === "Sign Up" && (
                  <Row className="justify-content-center">
                    <Col lg="6" md="6" sm="6" xs="6">
                      <InputGroup>
                        <InputGroup.Text>
                          <FaUser />
                        </InputGroup.Text>
                        <Form.Control
                          name="fname"
                          value={values.fname}
                          onChange={handleChange}
                          placeholder="First name"
                        />

                        {errors && (
                          <Form.Text className="text-danger">
                            {errors.fname}
                          </Form.Text>
                        )}
                      </InputGroup>
                    </Col>
                    <Col lg="6" md="6" sm="6" xs="6">
                      <InputGroup>
                        <InputGroup.Text>
                          <FaUser />
                        </InputGroup.Text>
                        <Form.Control
                          name="lname"
                          value={values.lname}
                          onChange={handleChange}
                          placeholder="Last name"
                        ></Form.Control>
                      </InputGroup>
                      {errors && (
                        <Form.Text className="text-danger">
                          {errors.lname}
                        </Form.Text>
                      )}
                    </Col>
                  </Row>
                )}
                <Row className="my-2 justify-content-center">
                  <Col lg="9" md="9" sm="10" xs="12">
                    <InputGroup>
                      <InputGroup.Text>
                        <FaEnvelope />
                      </InputGroup.Text>
                      <Form.Control
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                    </InputGroup>
                    {errors && (
                      <Form.Text className="text-danger">
                        {errors.email}
                      </Form.Text>
                    )}
                  </Col>
                </Row>
                <Row className="my-2  justify-content-center">
                  <Col lg="9" md="9" sm="10" xs="12">
                    <InputGroup>
                      <InputGroup.Text>
                        <FaKey />
                      </InputGroup.Text>
                      <Form.Control
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        type={showPass ? "text" : "password"}
                        placeholder={
                          props.type === "Login" ? "Password" : "New Password"
                        }
                      />
                      <Button
                        onClick={() => setShowPass((value) => !value)}
                        variant="outline-secondary"
                      >
                        {showPass ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                    {errors && (
                      <Form.Text className="text-danger">
                        {errors.password}
                      </Form.Text>
                    )}
                  </Col>
                </Row>
                {props.type === "Sign Up" && (
                  <Row className="my-2 justify-content-center">
                    <Col lg="9" md="9" sm="10" xs="12">
                      <InputGroup>
                        <InputGroup.Text>
                          <FaKey />
                        </InputGroup.Text>
                        <Form.Control
                          name="confirmPass"
                          value={values.confirmPass}
                          onChange={handleChange}
                          type="password"
                          placeholder="Confirm password"
                        />
                      </InputGroup>
                      {errors && (
                        <Form.Text className="text-danger">
                          {errors.confirmPass}
                        </Form.Text>
                      )}
                    </Col>
                  </Row>
                )}
                <Row className=" justify-content-end mt-5">
                  <Col lg="4" md="4" sm="5" xs="6">
                    <Button
                      onClick={formHandler}
                      as={motion.div}
                      whileHover={{ scale: 1.1, cursor: "pointer" }}
                      whileTap={{ scale: 0.9 }}
                      type="submit"
                    >
                      {props.type}
                      <FaAngleRight />
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
