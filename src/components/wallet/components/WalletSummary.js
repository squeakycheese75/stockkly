import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";
import "./WalletSummary.css";
import { sum_key_values } from "../../../utils/dataUtils";

class WalletSummary extends React.Component {
  test_add = () => {
    return 10
  }

  totalFormatter = (total, currency) => {
    return (
      <>
        {parseFloat(total).toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: currency,
          style: "currency"
        })}
      </>
    );
  }

  priceChangeFormatter = (change) => {
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

  render() {
    const { data, profile } = this.props;

    return (
      <Link to="/wallettracker" style={{ textDecoration: "none" }}>
        <Jumbotron className="summary">
          <h1 className="text-center">
            <table align="center" className="summary">
              <tbody>
                <tr>
                  <td>{this.totalFormatter(sum_key_values(data, "total"), profile.currency)}</td>
                  <td>{this.priceChangeFormatter(sum_key_values(data, "total_change"))}</td>
                </tr>
              </tbody>
            </table>
          </h1>
        </Jumbotron>
      </Link>
    );
  }
}

export default WalletSummary;
