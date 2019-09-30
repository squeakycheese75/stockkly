import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import "./HomeHeader.css";

const HomeHeader = () => {
  return (
    <div className="jumboheader">
      <Jumbotron>
        <Container>
          <h1>Welcome to STOCKKLY</h1>
          <h3>
            A simple, mobile-friendly, wealth tracker for the modern portfolio.
          </h3>
          <ul>
            <li>
              {" "}
              Build your portfolio of Shares, Crypto, Funds, Fx and watch you
              wealth live.
            </li>
            <li>Or, add them to your watchlist to track to price.</li>
          </ul>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default HomeHeader;