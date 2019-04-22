import React from "react";
import { Jumbotron } from "react-bootstrap";
import "./WalletSummary.css";

const portfolioCcySymbol = "£";

function sum(data, key) {
  return data.reduce((a, b) => a + (b[key] || 0), 0);
}

function totalFormatter(cell) {
  return `${portfolioCcySymbol}` + cell.toLocaleString();
}

class WalletSummary extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <Jumbotron>
        <h1 className="text-center"> {totalFormatter(sum(data, "total"))}</h1>
      </Jumbotron>
    );
  }
}

export default WalletSummary;
