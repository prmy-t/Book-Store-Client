import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from "./cartPage.module.css";
import { addItem, userActions } from "../store/userSlice";
import { useCookies } from "react-cookie";
export default function CartPage() {
  const dispatch = useDispatch();
  const [, setCookies] = useCookies();
  const items = useSelector((state) => state.user.cart.items);
  const totalQuantity = useSelector((state) => state.user.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.user.cart.totalPrice);
  const increaseQuantity = async (id) => {
    dispatch(userActions.addItemById(id));
    const res = await dispatch(addItem());
    let user = res.payload.data;

    setCookies("user", user);
  };
  const decreaseQuantity = async (id) => {
    dispatch(userActions.removeItemById(id));
    const res = await dispatch(addItem());
    let user = res.payload.data;

    setCookies("user", user);
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
