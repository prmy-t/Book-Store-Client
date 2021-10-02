// import styles from "./bookstable.module.css";
import { Card, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { addItem, userActions } from "../../store/userSlice";

export default function BooksTable(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [, setCookies] = useCookies();
  // const user = useSelector((state) => state.user);

  const detailsHandler = (id) => {
    history.push(`/${id}`);
  };
  const cartHandler = async (book) => {
    dispatch(userActions.addToCart(book));
    const res = await dispatch(addItem());
    let user = res.payload.data;

    setCookies("user", user);
  };
  return (
    <Card bg="light" className="p-2 my-2" img="left">
      <div
        style={{ cursor: "pointer" }}
        onClick={() => detailsHandler(props.book._id)}
      >
        <Card.Title>{props.book.title}</Card.Title>
        <Card.Body>
          <section className="text-muted">Author: {props.book.author}</section>
          <section className="text-muted">
            Category: {props.book.category}
          </section>
          <section className="text-muted">Price: {props.book.price} ₹</section>
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
