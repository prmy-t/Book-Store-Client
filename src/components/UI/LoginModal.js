import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { FaUser, FaKey } from "react-icons/fa";
export default function LoginModal(props) {
  const formHandler = (e) => {
    e.preventDefault();
    console.log(props.type);
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
        <Form onSubmit={formHandler} className="my-5">
          {props.type === "Sign Up" && (
            <Row className="justify-content-center">
              <Col lg="5" md="5" sm="5" xs="6">
                <InputGroup>
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                  <FormControl placeholder="First name"></FormControl>
                </InputGroup>
              </Col>
              <Col lg="5" md="5" sm="5" xs="6">
                <InputGroup>
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                  <FormControl placeholder="Last name"></FormControl>
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
                <FormControl placeholder="Username"></FormControl>
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
