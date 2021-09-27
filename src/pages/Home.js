import { Row, Col, Container, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchAll } from "../store/bookSlice";
import { useEffect } from "react";

//Components

import bookStack from "../assets/book-stack.jpg";
import BooksTable from "../components/UI/BooksTable";
export default function Home() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <Container className="my-5 App ">
      <Row className="mb-5">
        <Col lg="3" md="3" sm="3" xs="12" className="text-center">
          <Image fluid src={bookStack} style={{ width: "200px" }} />
        </Col>
        <Col className="align-self-center" lg="9" md="9" sm="9" xs="12">
          <h3>
            Welcome to the <b>Book</b>Pack
          </h3>
          <h5>
            select your favourite Books or authors to explore specific
            collection.
          </h5>
        </Col>
      </Row>
      <Row>
        {books &&
          books.map((book) => (
            <Col lg="4" md="4" sm="4" xs="12" key={book._id}>
              <BooksTable book={book} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}
