import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
// import PropTypes from "prop-types";
import "./LoginPrompt.css";

const LoginPrompt = () => {
  return (
    <div className="jumboheader">
      <Jumbotron>
        <Container>
          {/* <h1>
            To add or remove items from your Watchlist you'll need to Login
          </h1>
          <h2>
            To add or remove items from your Watchlist you'll need to Login
          </h2> */}
          <h3>
            To add transactions to your portfolio or add/remove items from your
            Watchlist, you'll need to Login.
          </h3>
          {/* <h4>
            To add or remove items from your Watchlist you'll need to Login
          </h4>
          <h5>
            To add or remove items from your Watchlist you'll need to Login
          </h5>
          <h6>
            To add or remove items from your Watchlist you'll need to Login
          </h6> */}
        </Container>
      </Jumbotron>
    </div>
  );
};

export default LoginPrompt;
