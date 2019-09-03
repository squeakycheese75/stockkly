import React from "react";
import PropTypes from "prop-types";
import { Jumbotron } from "react-bootstrap";
import "./ProductSummary.css";

const ProductSummary = ({ product, error }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
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
                  {/* {priceFormatter(
                    parseFloat(this.state.productPrice.price),
                    symbol
                  )} */}
                  100.00
                </td>
                <td>
                  {/* {changeFormatter(parseFloat(product.price.change))} */}
                  200.00
                </td>
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
