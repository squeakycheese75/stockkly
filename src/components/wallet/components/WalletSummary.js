import React from "react";
import { Jumbotron } from "react-bootstrap";
import "./WalletSummary.css";

// const portfolioCcySymbol = "£";

function sum(data, key) {
  return data.reduce((a, b) => a + (b[key] || 0), 0);
}

function priceChangeFormatter(change) {
  return (
    <>
      {change >= 0 ? (
        <>
          <div className="up2">
            <i className="material-icons vertical-align-middle up2">
              arrow_drop_up
            </i>
            {change.toFixed(2).toLocaleString(undefined, {
              minimumFractionDigits: 2
            })}
          </div>
        </>
      ) : (
        <>
          <div className="down2">
            <i className="material-icons vertical-align-middle down2">
              arrow_drop_down
            </i>
            {Math.abs(change)
              .toFixed(2)
              .toLocaleString(undefined, {
                minimumFractionDigits: 2
              })}
          </div>
        </>
      )}
    </>
  );
}

class WalletSummary extends React.Component {
  render() {
    const { data, settings } = this.props;

    function totalFormatter(cell) {
      return (
        `${settings.symbol}` +
        cell.toLocaleString(undefined, { minimumFractionDigits: 2 })
      );
    }

    return (
      <div>
        <Jumbotron>
          <h1 className="text-center">
            <table align="center" className="summary">
              <tbody>
                <tr>
                  <td>{totalFormatter(sum(data, "total"))}</td>
                  <td>{priceChangeFormatter(sum(data, "total_change"))}</td>
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
