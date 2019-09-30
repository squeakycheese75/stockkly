import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import styles from "./ProductInfo.css";

const ProductInfo = ({ product }) => {
  return (
    <>
      <br></br>
      <div className={styles}>
        <table className="tableInfo">
          <tbody>
            <tr>
              {/* <td>
                <Link to={"/product/" + product.ticker}>{product.name}</Link>
              </td> */}
              <td>Name: </td>
              <td>{product.name}</td>
            </tr>
            <tr>
              <td>Exchange:</td>
              <td>{product.exchange}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductInfo;
