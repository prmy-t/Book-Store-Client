import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchAll } from "../store/bookSlice";
import { useHistory } from "react-router";
import { useEffect } from "react";

export default function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);
  const detailsHandler = (id) => {
    history.push(`/${id}`);
  };
  return (
    <Container className="mt-5 App ">
      <Row className="mb-5">
        <h3>
          Welcome to the <b>Book</b>Pack
        </h3>
        <h5>
          select your favourite Books or authors to explore specific collection.
        </h5>
      </Row>
      <Row>
        {books &&
          books.map((book) => (
            <Col lg="4" md="4" sm="4" xs="12" key={book._id}>
              <Card bg="light" className="p-2 my-2">
                <Card.Title>{book.title}</Card.Title>
                <Card.Body>
                  <section className="text-muted">
                    Author: {book.author}
                  </section>
                  <section className="text-muted">
                    Category: {book.category}
                  </section>
                  <section className="text-muted">Price: {book.price}</section>
                </Card.Body>
                <Button onClick={() => detailsHandler(book._id)}>
                  Details
                </Button>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
