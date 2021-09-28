import { Row, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchAll } from "../store/bookSlice";
import { useEffect } from "react";
import { motion } from "framer-motion";
//Components
import BooksTable from "../components/UI/BooksTable";
export default function Home() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  useEffect(() => {
    if (books.length === 0) dispatch(fetchAll());
  }, [dispatch, books.length]);

  //motion variants
  const head = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };
  return (
    <Container className="my-5 App ">
      <Row className="justify-content-center mb-5">
        <Col lg="9" md="9" sm="9" xs="12">
          <motion.h3 variants={head} initial="hidden" animate="visible">
            Welcome to the <b>Book</b>Pack
          </motion.h3>
          <motion.h5
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            select your favourite Books or authors to explore specific
            collection.
          </motion.h5>
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
