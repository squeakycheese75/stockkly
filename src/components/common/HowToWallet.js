import React from "react";
import { Jumbotron, Container, ListGroup } from "react-bootstrap";
// import PropTypes from "prop-types";
import "./HowToWallet.css";

const HowToWallet = () => {
  return (
    <div className="jumboheader">
      <Jumbotron>
        <Container>
          {/* <h1>How to build your wallet tracker:</h1>
        <h2>How to build your wallet tracker:</h2> */}

          {/* <h4>How to build your wallet tracker:</h4>
        <h5>How to build your wallet tracker:</h5>
        <h6>How to build your wallet tracker:</h6>
        <p>How to build your wallet tracker:</p> */}

          {/* <ul>
          <li>1. Create an account via the Login button.</li>
          <li>
            2. Click the "Add Transaction" button from either the Transactions
            page or from a Product.
          </li>
          <l1>3. Fill in the Trade details and press "Save".</l1>
          <l1>
            Voila! Your trade will be added to your wallet and tracked live.
          </l1>
        </ul> */}

          <h3>How to build your wallet tracker:</h3>
          <ListGroup variant="flush">
            <ListGroup.Item variant="dark">
              1. Create an account via the Login button.
            </ListGroup.Item>
            <ListGroup.Item variant="dark">
              2. Click the "Add Transaction" button from either the Transactions
              page or from a Product.
            </ListGroup.Item>
            <ListGroup.Item variant="dark">
              3. Fill in the Trade details and press "Save".
            </ListGroup.Item>
            {/* <ListGroup.Item>
            3. Fill in the Trade details and press "Save".
          </ListGroup.Item> */}
          </ListGroup>
          <br></br>
          {/* <h4>
          Voila! Your trade will be added to your wallet and tracked live.
        </h4>
        <h5>
          Voila! Your trade will be added to your wallet and tracked live.
        </h5> */}
          <h6>
            Voila! Your trade will be added to your wallet and tracked live.
          </h6>
          {/* {auth.isAuthenticated() ? <>Auth</> : <>Not auth</>} */}
        </Container>
      </Jumbotron>
    </div>
  );
};

// HowToWallet.propTypes = {
//   auth: PropTypes.object.isRequired
// };

export default HowToWallet;
