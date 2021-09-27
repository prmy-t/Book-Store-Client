import { Col, Container, Navbar, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <Navbar bg="light" fixed="bottom">
      <Container className="justify-content-center">
        <Row>
          <Col>BookPack - 2021</Col>
        </Row>
      </Container>
    </Navbar>
  );
}
