import "./App.css";
import { Container } from "react-bootstrap";
import { Switch, Route, useLocation } from "react-router-dom";

//Page_imports
import NavBar from "./components/UI/NavBar";
import Home from "./pages/Home";

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
        </Switch>
      </Container>
    </>
  );
}

export default App;
