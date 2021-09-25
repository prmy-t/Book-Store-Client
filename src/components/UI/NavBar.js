import { useState } from "react";
import "./NavBar";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaPlus, FaBook, FaUserAlt } from "react-icons/fa";
export default function NavBar() {
  const [showBooks, setShowBooks] = useState(false);
  const [showAuthors, setShowAuthors] = useState(false);
  return (
    <Navbar fixed="top" expand="lg" bg="light">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <b>Book</b>Pack
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={
                <span>
                  <FaBook className="mb-1 mx-1" />
                  Books
                </span>
              }
              show={showBooks}
              onMouseEnter={() => setShowBooks(true)}
              onMouseLeave={() => setShowBooks(false)}
            >
              <NavDropdown.Item className="my-1">Fiction</NavDropdown.Item>
              <NavDropdown.Item className="my-1">Non-Fiction</NavDropdown.Item>
              <NavDropdown.Item className="my-1">Biography</NavDropdown.Item>
              <NavDropdown.Item className="my-1">Spiritual</NavDropdown.Item>
              <NavDropdown.Item className="my-1">Classics</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <span>
                  <FaUserAlt className="mb-1 mx-1" />
                  Authors
                </span>
              }
              show={showAuthors}
              onMouseEnter={() => setShowAuthors(true)}
              onMouseLeave={() => setShowAuthors(false)}
            >
              <NavDropdown.Item className="my-1">
                Haruki Murakami
              </NavDropdown.Item>
              <NavDropdown.Item className="my-1">
                Kanaiyalal Munshi
              </NavDropdown.Item>
              <NavDropdown.Item className="my-1">
                Hanrindra Dave
              </NavDropdown.Item>
              <NavDropdown.Item className="my-1">Dinkar Joshi</NavDropdown.Item>
              <NavDropdown.Item className="my-1">Jules Vern</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <LinkContainer to="add-book">
              <Nav.Link>
                <FaPlus size="15" className="mb-1 mx-1" />
                Add Book
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
