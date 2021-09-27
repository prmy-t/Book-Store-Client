import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { getSingleBook } from "../api/get";

export default function BookDetail() {
  const params = useParams();
  const history = useHistory();
  const bookId = params.bookId;
  const [book, setBook] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const call = async () => {
      const res = await getSingleBook(bookId);

      if (res.data.error) setError(true);
      setBook(res.data);
    };
    call();
  }, [bookId]);

  const redirectToHome = () => {
    history.push("/");
  };

  if (book && error) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg="10" md="10" sm="10" xs="12">
            <Alert variant="danger" className="text-center p-4 h5" show={error}>
              Book not found !
              <div className="my-3">
                {" "}
                click <Alert.Link onClick={redirectToHome}>here</Alert.Link> to
                redirect home.
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }
  if (book.length !== 0 && !error) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg="10" md="10" sm="10" xs="12">
            <Card bg="light" className="p-2">
              <Card.Title>{book.title}</Card.Title>
              <Card.Body>Author: {book.author}</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
  if (book.length === 0 && !error) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg="1" md="1" sm="1" xs="2">
            <Spinner animation="border" variant="secondary" />
          </Col>
        </Row>
      </Container>
    );
  }
}
