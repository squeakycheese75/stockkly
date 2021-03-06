import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";
import "./WalletSummary.css";

function sum(data, key) {
  return data.reduce((a, b) => a + (b[key] || 0), 0);
}

class WalletSummary extends React.Component {
  render() {
    const { data, profile } = this.props;

    function totalFormatter(total) {
      return (
        <>
          {parseFloat(total).toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            currency: profile.currency,
            style: "currency"
          })}
        </>
      );
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
                {parseFloat(change).toLocaleString("en-GB", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </div>
            </>
          ) : (
            <>
              {change === 0 ? (
                <>
                  {" "}
                  <div className="flat_header pl">
                    {parseFloat(Math.abs(change)).toLocaleString("en-GB", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="down_header pl">
                    <i className="material-icons vertical-align-middle down_header">
                      arrow_drop_down
                    </i>
                    {parseFloat(Math.abs(change)).toLocaleString("en-GB", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </>
      );
    }

    return (
      <Link to="/wallettracker" style={{ textDecoration: "none" }}>
        {/* <span className="card" style={{ display: "block" }}> */}
        <Jumbotron className="summary">
          {/* <div className="summary"> */}
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
          {/* </div> */}
        </Jumbotron>
        {/* </span> */}
      </Link>
    );
  }
}

export default WalletSummary;
