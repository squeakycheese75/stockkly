import React from "react";
import PropTypes from "prop-types";
import styles from "./WatchBar.css";

function changeFormatter(change) {
  return (
    <>
      {change >= 0 ? (
        <>
          <div className="up_watchbar pl3">
            {" "}
            <i className="material-icons vertical-align-middle up_watchbar">
              arrow_drop_up
            </i>
            {change.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </>
      ) : (
        <>
          <div className="down_watchbar pl3">
            {" "}
            <i className="material-icons vertical-align-middle down_watchbar">
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

function priceFormatter(price, symbol) {
  return (
    <>
      {symbol}
      {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
    </>
  );
}

const WatchBar = ({
  prices = [
    { ticker: "BTC:USD", price: 8000.0, change: 0.11, symbol: "$" },
    { ticker: "LTC:USD", price: 80.0, change: -0.19, symbol: "$" },
    { ticker: "VIX", price: 80.0, change: 0.19, symbol: "$" },
    { ticker: "AAPL", price: 80.0, change: 0.19, symbol: "$" },
    { ticker: "FTSE:100", price: 80.0, change: 0.19, symbol: "£" }
  ],
  error
}) => {
  return (
    <div className="d-flex justify-content-center w-100" style={styles}>
      <div className="d-flex flex-row w-100">
        <div className="flex-column w-5"> </div>
        {prices.map(p => (
          <div className="flex-column w-20">
            <h3 className="text-center">
              <table align="center">
                <tbody>
                  <tr>
                    <td colSpan="2" className="name-large ticker">
                      {p.ticker}
                    </td>
                  </tr>
                  <tr className="price">
                    <td className="pl2">{priceFormatter(p.price, p.symbol)}</td>
                    <td>{changeFormatter(parseFloat(p.change))}</td>
                  </tr>
                </tbody>
              </table>
            </h3>
          </div>
        ))}
        <div className="flex-column w-5"> </div>
      </div>
    </div>
  );
};

WatchBar.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default WatchBar;
