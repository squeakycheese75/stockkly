import React from "react";
import PropTypes from "prop-types";
import { Jumbotron } from "react-bootstrap";
import "./ProductSummary.css";

const ProductSummary = ({ product, price, error }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  function changeFormatter(change) {
    return (
      <>
        {change >= 0 ? (
          <>
            <div className="up_header pl">
              {" "}
              <i className="material-icons vertical-align-middle up_header">
                arrow_drop_up
              </i>
              {change.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </>
        ) : (
          <>
            <div className="down_header pl">
              {" "}
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

  function priceFormatter(price, symbol) {
    return (
      <>
        {symbol}
        {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </>
    );
  }

  return (
    <div className={wrapperClass}>
      <Jumbotron>
        <h1 className="text-center">
          <table align="center">
            <tbody>
              <tr>
                <td colSpan="2" className="name-large">
                  {product.ticker}
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="details-med">
                  {product.name}
                </td>
              </tr>
              <tr className="price-tr">
                <td className="price-large pl">
                  {priceFormatter(
                    parseFloat(price.price),
                    product.quote.symbol
                  )}
                </td>
                <td>{changeFormatter(parseFloat(price.change))}</td>
              </tr>
            </tbody>
          </table>
        </h1>
      </Jumbotron>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

ProductSummary.propTypes = {
  product: PropTypes.object.isRequired,
  price: PropTypes.object.isRequired,
  error: PropTypes.string
};

export default ProductSummary;
