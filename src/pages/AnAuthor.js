import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { booksByAuthor } from "../api/get";
import { useState } from "react";
import { Row, Col, Container, Alert } from "react-bootstrap";
import BooksTable from "../components/UI/BooksTable";
export default function AnAuthor() {
  let { auth } = useParams();
  auth = auth.split("-").join(" ");
  const history = useHistory();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const call = async () => {
      const res = await booksByAuthor(auth);
      if (res.data && res.data.error) setError(res.data.error);
      else {
        setBooks(res.data);
      }
    };
    call(auth);
  }, [auth]);
  return (
    <Container className="my-5">
      <Row>
        {books &&
          books.map((book) => (
            <Col lg="4" md="4" sm="4" xs="12" key={book._id}>
              <BooksTable book={book} />
            </Col>
          ))}
      </Row>
      <Row className="justify-content-center">
        {error && (
          <Col lg="8" md="8" sm="8" xs="12">
            <Alert variant="danger" className="text-center">
              {error}
              <br />
              Go{" "}
              <Alert.Link onClick={() => history.push("/")}> back</Alert.Link>
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}
