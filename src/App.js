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
import { useEffect } from "react";

import { useCookies } from "react-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { boolsAction } from "./store/bools";
import Login from "./pages/Login";

function App() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies.isLoggedIn && cookies.token) {
      axios.defaults.headers.common["Authorization"] = cookies.token;
      dispatch(userActions.appendUser(cookies.user));
      dispatch(boolsAction.setIsLoggedIn(true));
    } else history.push("/");
  }, [dispatch, history, cookies]);

  return (
    <Container>
      <NavBar />

      <Switch location={location} key={location.key}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login type="Login" />
        </Route>
        <Route path="/sign-up" exact>
          <Login type="Sign Up" />
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
