import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
// import PropTypes from "prop-types";

const HowTo = () => {
  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1>Welcome to STOCKKLY</h1>
          <h3>
            A simple, mobile-friendly, wealth tracker for the modern portfolio.
          </h3>

          <p>
            <ul>
              <li>
                {" "}
                Build your portfolio of Shares, Crypto, Funds, Fx and watch you
                wealth live.
              </li>
              <li>Or, add them to your watchlist to track to price.</li>
            </ul>
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default HowTo;
