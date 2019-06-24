// import React from "react";
import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../common/Header.css";

// const HomePage = () => {
class HomePage extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div style={styles}>
        <Jumbotron>
          <h4>Welcome to Stockkly</h4>

          <p>
            A simple, mobile friendly site for keeping track of all your
            favourite prices.
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
                <LinkContainer to="login">
                  <Button size="sm">Login</Button>
                </LinkContainer>{" "}
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
            * If you want to have your favourite prices saved for next time
            you'll need to be logged in.{" "}
          </b>
        </Jumbotron>
      </div>
    );
  }
}

export default HomePage;
