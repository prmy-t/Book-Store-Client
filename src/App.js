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

function App() {
  const location = useLocation();

  return (
    <Container>
      <NavBar />
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
