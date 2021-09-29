import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaUser, FaKey } from "react-icons/fa";
import { signUp, login } from "../../api/post";
import { cartActions } from "../../store/cartSlice";
import { boolsAction } from "../../store/bools";

export default function LoginModal(props) {
  const dispatch = useDispatch();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const error = props.loginError;

  const fNameHandler = (e) => {
    setFname(e.target.value);
  };
  const lastNameHandler = (e) => {
    setLname(e.target.value);
  };
  const userNameHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const formHandler = async (e) => {
    e.preventDefault();
    if (props.type === "Sign Up") {
      const res = await signUp({ fname, lname, email, password });
      console.log(res.data);
    }
    if (props.type === "Login") {
      const res = await login({ fname, lname, email, password });
      if (res.data.error) props.setLoginError("Email or password is wrong!");
      else {
        dispatch(cartActions.placeCart(res.data.user.cart));
        dispatch(boolsAction.setIsLoggedIn(true));
        props.onHide();
      }
    }
  };
  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="md"
      dialogClassName={{ height: "200px" }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.type}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Row className="justify-content-center">
            <Col lg="12" md="12" sm="12" xs="12">
              <Alert size="sm" variant="danger">
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        <Form onSubmit={formHandler} className="my-5">
          {props.type === "Sign Up" && (
            <Row className="justify-content-center">
              <Col lg="5" md="5" sm="5" xs="6">
                <InputGroup>
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                  <FormControl
                    onChange={fNameHandler}
                    placeholder="First name"
                  ></FormControl>
                </InputGroup>
              </Col>
              <Col lg="5" md="5" sm="5" xs="6">
                <InputGroup>
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                  <FormControl
                    onChange={lastNameHandler}
                    placeholder="Last name"
                  ></FormControl>
                </InputGroup>
              </Col>
            </Row>
          )}
          <Row className="my-2 justify-content-center">
            <Col lg="6" md="6" sm="6" xs="12">
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <FormControl
                  onChange={userNameHandler}
                  placeholder="Username"
                ></FormControl>
              </InputGroup>
            </Col>
          </Row>
          <Row className="my-2 justify-content-center">
            <Col lg="6" md="6" sm="6" xs="12">
              <InputGroup>
                <InputGroup.Text>
                  <FaKey />
                </InputGroup.Text>
                <FormControl
                  onChange={passwordHandler}
                  type="password"
                  placeholder={
                    props.type === "Login" ? "Password" : "New Password"
                  }
                ></FormControl>
              </InputGroup>
            </Col>
          </Row>
          <Row className="mt-4 justify-content-end">
            <Col lg="3" md="3" sm="3" xs="6">
              <Button type="submit">{props.type}</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
