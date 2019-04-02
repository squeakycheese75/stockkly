import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const HomePage = () => {
  return (
    <div>
      <Jumbotron>
        <h4>Welcome to Stockkly</h4>
        <p>
          The simple mobile-first app for keeping track of your favourite
          prices.
        </p>
        <p>
          Simply locate prices you want to watch, add them to your tracker and
          sit back. *<p />
        </p>
        <p>
          {" "}
          Enough talking and take me to the prices.{" "}
          <LinkContainer to="pricing">
            <Button>Click!</Button>
          </LinkContainer>
        </p>

        <p>Stockkly Team</p>
        <p>
          <i>Coming soon.....</i> FX, more crypto, funds, derived data,
          historical charting
        </p>
        <b>
          {" "}
          * Oh and it's worth remembering that if you want to have your
          favourite prices saved for next time, you'll need to be logged in.{" "}
        </b>
      </Jumbotron>
    </div>
  );
};

export default HomePage;
