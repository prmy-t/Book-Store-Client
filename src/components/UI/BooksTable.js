// import styles from "./bookstable.module.css";
import { Card, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { boolsAction } from "../../store/bools";

import { addItem, userActions } from "../../store/userSlice";

export default function BooksTable(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies();

  const detailsHandler = (id) => {
    history.push(`/${id}`);
  };
  const cartHandler = async (book) => {
    let user;
    if (cookies.isLoggedIn) {
      dispatch(userActions.addToCart(book));
      const res = await dispatch(addItem());
      user = res.payload.data;
    } else {
      dispatch(boolsAction.setLoginModal([true, "Login", undefined]));
    }

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
