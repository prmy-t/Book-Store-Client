import { useEffect, useState } from "react";
import { Row, Col, Container, Alert } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { booksByCategory } from "../api/get";
import BooksTable from "../components/UI/BooksTable";

export default function Acategory() {
  const history = useHistory();
  let { cat } = useParams();
  cat = cat.split("-").join(" ");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const call = async () => {
      const res = await booksByCategory(cat);
      if (res.data && res.data.error) setError(res.data.error);
      else {
        setBooks(res.data);
      }
    };
    call(cat);
  }, [cat]);
  return (
    <Container className="my-5">
      {books && !error && (
        <Row>
          <Col lg="9" md="9" sm="9" xs="12" className="text-end">
            <div className="h5 text-bold">{cat}</div>
          </Col>
        </Row>
      )}

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
