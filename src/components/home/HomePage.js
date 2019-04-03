import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../common/Header.css";

const HomePage = () => {
  return (
    <div style={styles}>
      <Jumbotron>
        <h4>Welcome to Stockkly</h4>
        <p>
          A simple, mobile-first app for keeping track of your favourite prices.
        </p>
        <p>
          Track down prices you want to watch on the{" "}
          <LinkContainer to="manage">
            <Button>Manage</Button>
          </LinkContainer>{" "}
          page, add them to your{" "}
          <LinkContainer to="manage">
            <Button>Prices</Button>
          </LinkContainer>{" "}
          tracker and sit back.*
        </p>
        <p>Stockkly Team</p>
        <p>
          <i>Coming soon.....</i> FX, more crypto, funds, derived data,
          historical charting
        </p>
        <b>
          {" "}
          *It's worth remembering that if you want to have your favourite prices
          saved for next time you'll need to be logged in.{" "}
        </b>
      </Jumbotron>
    </div>
  );
};

export default HomePage;
