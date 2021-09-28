import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  FaPlus,
  FaBook,
  FaUserAlt,
  FaShoppingCart,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { useEffect } from "react";
import { getNavbarData } from "../../api/get";
import { useHistory } from "react-router";
import backpack from "../../assets/backpack.png";
import { useSelector } from "react-redux";
export default function NavBar(props) {
  const history = useHistory();
  const cartLength = useSelector((state) => state.cart.items.length);
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

  //motion variants
  const brand = {
    hover: {
      scale: 1.1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.6,
      },
    },
  };
  return (
    <Navbar sticky="top" expand="lg" bg="light">
      <Container>
        <motion.div variants={brand} whileHover="hover">
          <img
            src={backpack}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <LinkContainer to="/">
            <Navbar.Brand>
              <b> Book</b>
              Pack
            </Navbar.Brand>
          </LinkContainer>
        </motion.div>
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
            <Nav.Link
              onClick={() => props.toggleValue(true, "Login")}
              as={motion.div}
              whileHover={{ scale: 1.1, cursor: "pointer" }}
              whileTap={{ scale: 0.9 }}
            >
              <FaUser size="15" className="mb-1 mx-1" />
              Log in
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              onClick={() => props.toggleValue(true, "Sign Up")}
              to="/cart"
              as={motion.div}
              whileHover={{ scale: 1.1, cursor: "pointer" }}
              whileTap={{ scale: 0.9 }}
            >
              <FaUserPlus color="gray" size="15" className="mb-1 mx-1" />
              Sign up
            </Nav.Link>
          </Nav>
          {/* 
          <Nav>
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart size="15" className="mb-1 mx-1" />
                Cart({cartLength})
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/add-book">
              <Nav.Link>
                <FaPlus size="15" className="mb-1 mx-1" />
                Add Book
              </Nav.Link>
            </LinkContainer>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
