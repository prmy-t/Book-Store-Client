import { useState } from "react";
import "./NavBar";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaPlus, FaBook, FaUserAlt } from "react-icons/fa";
import { useEffect } from "react";
import { getNavbarData } from "../../api/get";
import { useHistory } from "react-router";
import backpack from "../../assets/backpack.png";
export default function NavBar() {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    const call = async () => {
      const data = await getNavbarData();
      if (data !== "error") {
        setCategories(data.categories);
        setAuthors(data.authors);
      }
    };
    call();
  }, []);

  const selectCategory = (category) => {
    history.push(`/category/${category}`);
  };
  const selectAuthor = (author) => {
    author = author.split(" ").join("-");
    history.push(`/author/${author}`);
  };
  const [showBooks, setShowBooks] = useState(false);
  const [showAuthors, setShowAuthors] = useState(false);

  return (
    <Navbar sticky="top" expand="lg" bg="light">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src={backpack}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
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
              {categories &&
                categories.map((category) => (
                  <NavDropdown.Item
                    key={category}
                    onClick={() => selectCategory(category)}
                    className="my-1"
                  >
                    {category}
                  </NavDropdown.Item>
                ))}
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
              {authors &&
                authors.map((author) => (
                  <NavDropdown.Item
                    className="my-1"
                    key={author}
                    onClick={() => selectAuthor(author)}
                  >
                    {author}
                  </NavDropdown.Item>
                ))}
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
