import "./App.css";
import { Container } from "react-bootstrap";
import { Switch, Route, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NavBar from "./components/UI/NavBar";
import { userActions } from "./store/userSlice";
//Page_imports
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
import AnAuthor from "./pages/AnAuthor";
import Acategory from "./pages/Acategory";
import Footer from "./components/UI/Footer";
import CartPage from "./pages/CartPage";
import { useEffect, useState } from "react";
import LoginModal from "./components/UI/LoginModal";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { boolsAction } from "./store/bools";
import { reFetchUser } from "./api/get";

function App() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModel] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loginError, setLoginError] = useState();
  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies.isLoggedIn && cookies.token) {
      const call = async () => {
        const res = await reFetchUser(cookies.user._id);
        if (res.data) {
          console.log(res.data);
        }
      };
      axios.defaults.headers.common["Authorization"] = cookies.token;
      dispatch(userActions.appendUser(cookies.user));
      dispatch(boolsAction.setIsLoggedIn(true));
      // call();
    } else history.push("/");
  }, [dispatch, history, cookies]);
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
