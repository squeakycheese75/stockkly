import React from "react";
import { Jumbotron } from "react-bootstrap";

function sum(data, key) {
  return data.reduce((a, b) => a + (b[key] || 0), 0);
}

class WalletSummary extends React.Component {
  render() {
    // eslint-disable-next-line
    const { data } = this.props;
    // const { isAuthenticated } = this.props.auth;

    return (
      <Jumbotron>
        <h1 className="text-center"> {sum(data, "total")}</h1>
      </Jumbotron>
    );
  }
}

export default WalletSummary;
