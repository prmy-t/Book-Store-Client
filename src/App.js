import "./App.css";
import { Container } from "react-bootstrap";
import { Switch, Route, useLocation } from "react-router-dom";

import NavBar from "./components/UI/NavBar";
//Page_imports
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";

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
      </Switch>
    </Container>
  );
}

export default App;
