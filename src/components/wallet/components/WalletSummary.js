import React from "react";
import { Jumbotron } from "react-bootstrap";
import "./WalletSummary.css";

function sum(data, key) {
  return data.reduce((a, b) => a + (b[key] || 0), 0);
}

function priceChangeFormatter(change) {
  return (
    <>
      {change >= 0 ? (
        <>
          <div className="up_header pl">
            <i className="material-icons vertical-align-middle up_header">
              arrow_drop_up
            </i>
            {change.toFixed(2).toLocaleString(undefined, {
              minimumFractionDigits: 2
            })}
          </div>
        </>
      ) : (
        <>
          <div className="down_header pl">
            <i className="material-icons vertical-align-middle down_header">
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
        // `${settings.symbol}` +
        // cell.toFixed(2).toLocaleString(undefined, { minimumFractionDigits: 2 })
        <>
          {settings.symbol}
          {cell.toFixed(2).toLocaleString()}
        </>
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
