import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import "./HomeHeader.css";

const HomeHeader = () => {
  return (
    <div className="jumboheader">
      <Jumbotron>
        <Container>
          <h2>Welcome to Stockkly</h2>
          <br />
          <h3>
            A simple, mobile-friendly, wealth tracker for the modern portfolio.
          </h3>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default HomeHeader;
