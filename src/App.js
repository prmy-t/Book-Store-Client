import "./App.css";
import { Container } from "react-bootstrap";
import { Switch, Route, useLocation } from "react-router-dom";

import NavBar from "./components/UI/NavBar";
//Page_imports
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
import AnAuthor from "./pages/AnAuthor";
import Acategory from "./pages/Acategory";
import Footer from "./components/UI/Footer";
import CartPage from "./pages/CartPage";
import { useState } from "react";
import LoginModal from "./components/UI/LoginModal";

function App() {
  const location = useLocation();
  const [showModal, setShowModel] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loginError, setLoginError] = useState();

  const toggleValue = (value, type) => {
    setShowModel(value);
    setModalType(type);
    setLoginError(undefined);
  };
  return (
    <Container>
      <NavBar loginModal={showModal} toggleValue={toggleValue} />
      <LoginModal
        onHide={() => toggleValue(false)}
        loginError={loginError}
        setLoginError={setLoginError}
        type={modalType}
        show={showModal}
      />
      <Switch location={location} key={location.key}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/add-book" exact>
          <AddBook />
        </Route>
        <Route path="/add-book" exact>
          <AddBook />
        </Route>
        <Route path="/cart" exact>
          <CartPage />
        </Route>
        <Route path="/:bookId" exact>
          <BookDetail />
        </Route>
        <Route path="/category/:cat" exact>
          <Acategory />
        </Route>
        <Route path="/author/:auth" exact>
          <AnAuthor />
        </Route>
      </Switch>
      <Footer />
    </Container>
  );
}

export default App;
