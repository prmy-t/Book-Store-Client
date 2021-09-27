import {
  Card,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Form,
  Button,
} from "react-bootstrap";

import { useState } from "react";
import { FaBook, FaPencilAlt, FaRupeeSign, FaPlus } from "react-icons/fa";
import { postAddBook } from "../api/post";
export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await postAddBook({
      title,
      author,
      category,
      price,
    });
    if (res.data === "saved") {
      console.log("book saved");
    }
  };
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg="6" md="6" sm="6" xs="12">
          <Card bg="light" className="p-2">
            <Card.Title>Add book</Card.Title>
            <Form>
              <Card.Body>
                <Row className="justify-content-center">
                  <Col lg="8" md="8" sm="8" xs="12">
                    <InputGroup className="my-2">
                      <InputGroup.Text>
                        <FaBook />
                      </InputGroup.Text>
                      <FormControl
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Book Title"
                      />
                    </InputGroup>
                  </Col>
                  <Col lg="8" md="8" sm="8" xs="12">
                    <InputGroup className="my-2">
                      <InputGroup.Text>
                        <FaPencilAlt />
                      </InputGroup.Text>
                      <FormControl
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Book Author"
                      />
                    </InputGroup>
                  </Col>

                  <Col lg="8" md="8" sm="8" xs="12">
                    <Form.Group>
                      <Form.Control
                        onChange={(e) => setCategory(e.target.value)}
                        as="select"
                        aria-label="Default select example"
                      >
                        <option>Select Category</option>
                        <option>Classic</option>
                        <option>Non-Fiction</option>
                        <option>Fiction</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg="8" md="8" sm="8" xs="12">
                    <InputGroup className="my-2">
                      <InputGroup.Text>
                        <FaRupeeSign />
                      </InputGroup.Text>
                      <FormControl
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        placeholder="Book Price"
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Card.Body>
              <Row className="justify-content-end">
                <Col lg="3" md="3" sm="4" xs="4">
                  <Button type="submit" onClick={submitHandler}>
                    <FaPlus className="mb-1 mx-1" />
                    Add
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
