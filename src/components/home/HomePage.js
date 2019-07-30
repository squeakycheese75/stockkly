// import React from "react";
import React, { Component } from "react";
import { Jumbotron, Button, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// import styles from "../common/Header.css";

// const HomePage = () => {
class HomePage extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    // const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Jumbotron>
          <h4>Welcome to Stockkly</h4>

          <p>
            A simple, mobile-friendly, wealth tracker for the modern hodler.
          </p>
          <p>
            <LinkContainer to="/manage">
              <Button size="sm">Find</Button>
            </LinkContainer>{" "}
            prices and add them to your{" "}
            <LinkContainer to="watching">
              <Button size="sm">WatchList</Button>
            </LinkContainer>{" "}
          </p>
          <p>
            {isAuthenticated() ? (
              <>
                Or, login, build a{" "}
                <LinkContainer to="/wallet">
                  <Button size="sm">Wallet</Button>
                </LinkContainer>
              </>
            ) : (
              <>
                Or,{" "}
                {/* <LinkContainer to="login">
                  <Button size="sm">Login</Button>
                </LinkContainer>{" "} */}
                <LinkContainer to="login">
                  <Nav.Link>
                    <Button
                      // className={styles}
                      size="sm"
                      onClick={isAuthenticated() ? logout : login}
                    >
                      {isAuthenticated() ? "Log Out" : "Log In"}
                    </Button>
                  </Nav.Link>
                </LinkContainer>
                build a wallet
              </>
            )}{" "}
            and track your wealth live!
          </p>
          <p>Stockkly Team</p>
          <p>
            <i>Coming soon.....</i> FX, more crypto, funds, derived data,
            historical charting
          </p>
          <b>
            * If you want to have your start tracking your wealth then you'll
            need to be logged in.{" "}
          </b>
        </Jumbotron>
      </div>
    );
  }
}

export default HomePage;
