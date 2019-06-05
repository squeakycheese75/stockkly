import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../common/Header.css";

// class HomePage extends Component {
//   render() {
//     return()
//   }
// }
// export default HomePage;

const HomePage = () => {
  return (
    <div style={styles}>
      <Jumbotron>
        <h4>Welcome to Stockkly</h4>
        <p>
          A simple, mobile friendly app for keeping track of all your favourite
          prices.
        </p>
        <p>
          <LinkContainer to="manage">
            <Button size="sm">Find</Button>
          </LinkContainer>{" "}
          prices and add them to your{" "}
          <LinkContainer to="manage">
            <Button size="sm">WatchList</Button>
          </LinkContainer>{" "}
        </p>
        <p>
          Or,{" "}
          {/* <LinkContainer to="login">
            <Nav.Link>
              <Button
                className={styles}
                variant="outline-light"
                onClick={isAuthenticated() ? logout : login}
              >
                {isAuthenticated() ? "Log Out" : "Log In"}
              </Button>
            </Nav.Link>
          </LinkContainer>{" "} */}
          and build a{" "}
          <LinkContainer to="prices">
            <Button size="sm">Wallet</Button>
          </LinkContainer>{" "}
        </p>
        {/* <p>
          Get live updates on the{" "}
          <LinkContainer to="prices">
            <Button size="sm">Prices</Button>
          </LinkContainer>{" "}
        </p> */}
        <p>Stockkly Team</p>
        <p>
          <i>Coming soon.....</i> FX, more crypto, funds, derived data,
          historical charting
        </p>
        <b>
          * If you want to have your favourite prices saved for next time you'll
          need to be logged in.{" "}
        </b>
      </Jumbotron>
    </div>
  );
};

export default HomePage;
