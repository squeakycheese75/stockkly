import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";

const HomePage = props => {
  return (
    <div>
      <Jumbotron>
        <h1>Welcome to Stockkly</h1>
        <p>
          A simple mobile-first site for keeping track of your favourite prices.
        </p>
        <p>
          {" "}
          <Link to="pricing" className="btn btn-primary btn-lg">
            Take me to the Prices
          </Link>
        </p>
        <p>
          Coming soon.....FX, crypto, funds, derived data, historical charting
        </p>
      </Jumbotron>
    </div>
  );
};

export default HomePage;
