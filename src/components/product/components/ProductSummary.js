import React from "react";
import { Jumbotron } from "react-bootstrap";
import "./ProductSummary.css";

const portfolioCcySymbol = "£";

function priceChangeFormatter(change, movement) {
  return (
    <div>
      <ul>
        {change > 0 ? (
          <>
            <li className="name up">
              {parseFloat(change).toFixed(2)}
              <i className="material-icons vertical-align-middle up">
                arrow_drop_up
              </i>
            </li>
          </>
        ) : (
          <>
            <li className="name down">
              {parseFloat(change).toFixed(2)}
              <i className="material-icons vertical-align-middle down">
                arrow_drop_down
              </i>
            </li>
          </>
        )}
        <li className="details">({parseFloat(movement).toFixed(2)}%)</li>
      </ul>
    </div>
  );
}

// function sum(data, key) {
//   return data.reduce((a, b) => a + (b[key] || 0), 0);
// }

function totalFormatter(cell) {
  return `${portfolioCcySymbol}` + cell;
}

class WalletSummary extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <Jumbotron>
          <h1 className="text-center">
            <table align="center">
              <tbody>
                <tr>
                  <td>{totalFormatter(data["total"])}</td>

                  <td>{priceChangeFormatter(data.price, data.change)}</td>
                </tr>
              </tbody>
            </table>
          </h1>
        </Jumbotron>
      </div>
    );
  }
}

export default WalletSummary;
