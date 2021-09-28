import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from "./cartPage.module.css";
import { cartActions } from "../store/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const increaseQuantity = (id) => {
    dispatch(cartActions.addItemById(id));
  };
  const decreaseQuantity = (id) => {
    dispatch(cartActions.removeItemById(id));
  };
  return (
    <Container className="my-5">
      <Table className={styles.outLine}>
        <thead>
          <tr>
            <th>No</th>
            <th>Book Name</th>
            <th>Book Author</th>
            <th>Quantity</th>
            <th>Book Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>
                <Button
                  disabled={item.quantity === 0}
                  onClick={() => decreaseQuantity(item._id)}
                  size="sm"
                  variant="outline-danger"
                >
                  <FaAngleLeft />
                </Button>{" "}
                <b className="mx-2">{item.quantity}</b>{" "}
                <Button
                  onClick={() => increaseQuantity(item._id)}
                  size="sm"
                  variant="outline-success"
                >
                  <FaAngleRight />
                </Button>
              </td>
              <td>{item.price} ₹</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3">
              <b>Total</b>
            </td>

            <td> {totalQuantity}</td>
            <td> {totalPrice} ₹</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
