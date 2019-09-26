import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
// import PropTypes from "prop-types";

const HowToWallet = () => {
  return (
    // <div className="form-group">
    <Jumbotron fluid>
      <Container>
        {/* <h1>How to build your wallet tracker:</h1>
        <h2>How to build your wallet tracker:</h2> */}
        <h3>How to build your wallet tracker:</h3>
        {/* <h4>How to build your wallet tracker:</h4>
        <h5>How to build your wallet tracker:</h5>
        <h6>How to build your wallet tracker:</h6>
        <p>How to build your wallet tracker:</p> */}
        <p>
          <ul>
            <li>1. Create an account via the Login button.</li>
            <li>
              2. Click the "Add Transaction" button from either the Transactions
              page or from a Product.
            </li>
            <l1>3. Fill in the Trade details and press "Save".</l1>
            <l1>
              Voila! Your trade will be added to your wallet and tracked live.
            </l1>
          </ul>
        </p>
      </Container>
    </Jumbotron>
  );
};

export default HowToWallet;
