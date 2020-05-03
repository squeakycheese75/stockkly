import React from "react";
import { Jumbotron, Container, ListGroup } from "react-bootstrap";
// import PropTypes from "prop-types";
import "./HowToWallet.css";

const HowToWallet = () => {
  return (
    <div className="jumboheader">
      <Jumbotron>
        <Container>
          <h3>How to build your wallet tracker:</h3>
          <ListGroup variant="flush">
            <ListGroup.Item variant="info">
              1.{" "}
              <b>
                <i>Login</i>
              </b>{" "}
              or create an account.
            </ListGroup.Item>
            <ListGroup.Item variant="dark">
              2. Click the "
              <b>
                <i>Add to Transaction</i>
              </b>
              " button from either the Transactions page or from a Product.
            </ListGroup.Item>
            <ListGroup.Item variant="dark">
              3. Fill in the Trade details and press "
              <b>
                <i>Save</i>
              </b>
              ".
            </ListGroup.Item>
          </ListGroup>
          <br></br>
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
