import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Row,
  Col,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Image,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  FaPlus,
  FaBook,
  FaUserAlt,
  FaShoppingCart,
  FaUser,
  FaUserPlus,
  FaRegFrown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getNavbarData } from "../../api/get";
import { useHistory } from "react-router";
import backpack from "../../assets/backpack.png";
import { useSelector } from "react-redux";
import dog from "../../assets/dog.jpg";
import { useCookies } from "react-cookie";

function NavBar(props) {
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.bools.isLoggedIn);
  const cartLength = useSelector((state) => state.user.cart.items.length);
  const { fname } = useSelector((state) => state.user);

  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [showBooks, setShowBooks] = useState(false);
  const [showAuthors, setShowAuthors] = useState(false);
  const [, , removeCookie] = useCookies();
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

  const logOutHandler = () => {
    removeCookie("isLoggedIn");
    removeCookie("user");
    removeCookie("token");
    window.location.reload();
  };

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
          {isLoggedIn ? (
            <>
              <Nav>
                <LinkContainer
                  to="/cart"
                  as={motion.div}
                  whileHover={{ scale: 1.1, cursor: "pointer" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Nav.Link>
                    <FaShoppingCart size="15" className="mb-1 mx-1" />
                    Cart({cartLength})
                  </Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                {/* <LinkContainer to="/add-book"> */}
                <NavDropdown
                  title={
                    <span>
                      <Image
                        className="mx-1"
                        size="sm"
                        roundedCircle
                        width="28px"
                        height="28px"
                        src={dog}
                      />
                      {fname}
                    </span>
                  }
                >
                  <NavDropdown.Item as={Link} to="/add-book" className="my-1">
                    {/* <LinkContainer to="/add-book"> */}
                    <FaPlus size="15" className="mb-1 mx-1" />
                    Add Book
                    {/* </LinkContainer> */}
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={logOutHandler}
                    className="my-1 text-danger"
                  >
                    <FaRegFrown size="15" className="mb-1 mx-1" />
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>

                {/* <FaPlus size="15" className="mb-1 mx-1" /> */}

                {/* </Nav.Link> */}
                {/* </LinkContainer> */}
              </Nav>
            </>
          ) : (
            <>
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
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
