import React from "react";
import { Jumbotron, Container, ListGroup } from "react-bootstrap";
// import PropTypes from "prop-types";
import "./HowToWatchlist.css";

const HowToWatchlist = () => {
  return (
    <div className="jumboheader">
      <Jumbotron>
        <Container>
          <h3>How to build your watchlist:</h3>
          <ListGroup variant="flush">
            <ListGroup.Item variant="dark">
              1. Click "
              <b>
                <i>Find</i>
              </b>
              " and locate a product you want to watch.
            </ListGroup.Item>
            <ListGroup.Item variant="dark">
              2. Click the{" "}
              <b>
                <i>Add to Watchlist</i>
              </b>
              "" button from a Product.
            </ListGroup.Item>
            <ListGroup.Item variant="info">
              3.{" "}
              <b>
                <i>Login</i>
              </b>{" "}
              if you want this to be remembered for next time.
            </ListGroup.Item>
          </ListGroup>
          <br />
          <h6>
            Simples. The product will be added to your watchlist and tracked
            live.
          </h6>
        </Container>
      </Jumbotron>
    </div>
  );
};

// HowToWallet.propTypes = {
//   auth: PropTypes.object.isRequired
// };

export default HowToWatchlist;
