import React from "react";
import { Jumbotron } from "react-bootstrap";
import "./WalletSummary.css";

const portfolioCcySymbol = "£";

function priceChangeFormatter(change, movement) {
  return (
    <div>
      <ul>
        {change > 0 ? (
          <>
            <li className="name up">
              +{change.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              <i className="material-icons vertical-align-middle up">
                arrow_drop_up
              </i>
            </li>
          </>
        ) : (
          <>
            <li className="name down">
              {change.toLocaleString(undefined, { minimumFractionDigits: 2 })}_
              <i className="material-icons vertical-align-middle down">
                arrow_drop_down
              </i>
            </li>
          </>
        )}
        <li className="details">({movement}%)</li>
      </ul>
    </div>
  );
}

function sum(data, key) {
  return data.reduce((a, b) => a + (b[key] || 0), 0);
}

function totalFormatter(cell) {
  return `${portfolioCcySymbol}` + cell.toFixed(2).toLocaleString();
}

class WalletSummary extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <Jumbotron>
          <h1 className="text-center">
            <table align="center" className="summary">
              <tbody>
                <tr>
                  <td>{totalFormatter(sum(data, "total"))}</td>
                  <td>
                    {priceChangeFormatter(sum(data, "total_change"), 1.15)}
                  </td>
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
