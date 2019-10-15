import React from "react";
import PropTypes from "prop-types";
import styles from "./WatchBar.css";

function changeFormatter(change, movement) {
  return (
    <>
      {change >= 0 ? (
        <>
          <div className="up_watchbar move">
            {" "}
            <i className="material-icons vertical-align-middle up_watchbar">
              arrow_drop_up
            </i>
            {parseFloat(change).toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}{" "}
            ( +
            {parseFloat(movement).toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
            %)
          </div>
        </>
      ) : (
        <>
          <div className="down_watchbar move">
            {" "}
            <i className="material-icons vertical-align-middle down_watchbar">
              arrow_drop_down
            </i>
            {parseFloat(Math.abs(change)).toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}{" "}
            (
            {parseFloat(movement).toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
            %)
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
      {parseFloat(price).toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}
    </>
  );
}

const WatchBar = ({ prices, error }) => {
  return prices && prices.length > 0 ? (
    <div className="d-flex justify-content-center w-100" style={styles}>
      <div className="d-flex flex-row w-100">
        {/* <div className="flex-column"> </div> */}
        {prices.map(p => (
          <div className="flex-column w-25" key={"watchbaritem-" + p.ticker}>
            <h3 className="text-center">
              <table align="center">
                <tbody>
                  <tr>
                    <td colSpan="2" className="name-large ticker">
                      {p.displayTicker}
                    </td>
                  </tr>
                  <tr className="price">
                    <td className="pl2">{priceFormatter(p.price, p.symbol)}</td>
                  </tr>
                  <tr>
                    {" "}
                    <td>
                      {changeFormatter(
                        parseFloat(p.change),
                        parseFloat(p.movement)
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </h3>
          </div>
        ))}
        {/* <div className="flex-column w-5"> </div> */}
      </div>
    </div>
  ) : (
    <>None</>
  );
};

WatchBar.propTypes = {
  prices: PropTypes.array.isRequired,
  error: PropTypes.string
};

export default WatchBar;
