import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const HomePage = props => {
  return (
    <div>
      <Jumbotron>
        <h1>Welcome to Stockkly</h1>
        <p>A mobile-first app for keeping track of your favourite prices.</p>
        <p>
          Simply locate the prices you want to watch, add them to your tracker
          and sit back.{" "}
          <i>
            Oh and it's worth remembering that if you want to have you favourite
            prices saved for next time you'll need to be logged in.{" "}
          </i>
        </p>
        <p>
          {" "}
          Enough talking, take me to the prices.
          <LinkContainer to="pricing">
            <Button>Click!</Button>
          </LinkContainer>
        </p>
        <p>
          Coming soon.....FX, crypto, funds, derived data, historical charting
        </p>
      </Jumbotron>
    </div>
  );
};

export default HomePage;
