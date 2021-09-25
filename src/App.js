import "./App.css";
import { Container } from "react-bootstrap";
import { Switch, Route, useLocation } from "react-router-dom";

import NavBar from "./components/UI/NavBar";
//Page_imports
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";

function App() {
  const location = useLocation();
  return (
    <>
      <Container>
        <NavBar />
        <Switch location={location} key={location.key}>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/add-book" exact>
            <AddBook />
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default App;
