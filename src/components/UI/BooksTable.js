// import styles from "./bookstable.module.css";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import dog from "../../assets/book.jpg";
import { cartActions } from "../../store/cartSlice";

export default function BooksTable(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const detailsHandler = (id) => {
    history.push(`/${id}`);
  };
  const cartHandler = (book) => {
    dispatch(cartActions.addToCart(book));
  };
  return (
    <Card bg="light" className="p-2 my-2" img="left">
      <div
        style={{ cursor: "pointer" }}
        onClick={() => detailsHandler(props.book._id)}
      >
        <Card.Img src={dog} className="mb-2" />
        <Card.Title>{props.book.title}</Card.Title>
        <Card.Body>
          <section className="text-muted">Author: {props.book.author}</section>
          <section className="text-muted">
            Category: {props.book.category}
          </section>
          <section className="text-muted">Price: {props.book.price}</section>
        </Card.Body>
      </div>
      <Button
        variant="outline-secondary"
        onClick={() => cartHandler(props.book)}
      >
        Add to cart
      </Button>
    </Card>
  );
}
