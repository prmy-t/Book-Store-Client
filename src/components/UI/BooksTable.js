import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import dog from "../../assets/book.jpg";

export default function BooksTable(props) {
  const history = useHistory();
  const detailsHandler = (id) => {
    history.push(`/${id}`);
  };
  return (
    <Card bg="light" className="p-2 my-2" img="left">
      <div style={{ cursor: "pointer" }} onClick={() => console.log("clicked")}>
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
        onClick={() => detailsHandler(props.book._id)}
      >
        Details
      </Button>
    </Card>
  );
}
