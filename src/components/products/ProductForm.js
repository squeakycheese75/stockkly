import React from "react";
import PropTypes from "prop-types";
import ProductSummary from "./components/ProductSummary";
import ProductChart from "./components/ProductChart";
import TransactionTable from "../transactions/components/TransactionTable";
import styles from "./ProductForm.css";
import { Link } from "react-router-dom";
import LoginPrompt from "../common/LoginPrompt";

const ProductForm = ({
  profile,
  transactions,
  product,
  price,
  ticker,
  pricesHistorical,
  onDelete,
  updateProfile,
  auth,
  errors = {}
}) => {
  return (
    <div className={styles}>
      <form className="form">
        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}
        <ProductSummary product={product} price={price} />
        <br />
        <h6>Chart:</h6>
        <ProductChart
          pid={ticker}
          chartData={{
            x:
              pricesHistorical && pricesHistorical.data
                ? Object.keys(pricesHistorical.data)
                : [],
            y:
              pricesHistorical && pricesHistorical.data
                ? Object.values(pricesHistorical.data)
                : [],
            pid: ticker
          }}
        />
        <br />
        <h6>Transactions:</h6>
        <TransactionTable
          transactions={transactions}
          onDeleteClick={onDelete}
        />
        {profile && profile.watchList.includes(ticker) ? (
          <>
            {" "}
            <button
              type="button"
              className="btn btn-outline-danger"
              disabled={!auth.isAuthenticated()}
              onClick={() => {
                let newProfile = Object.assign({}, profile, {
                  watchList: profile.watchList.filter(
                    item => item.toLowerCase() !== ticker.toLowerCase()
                  )
                });
                updateProfile(newProfile);
              }}
            >
              Remove from watchList
            </button>
          </>
        ) : (
          <>
            {" "}
            <button
              type="button"
              className="btn btn-primary"
              disabled={!auth.isAuthenticated()}
              // onClick={() => onRemoveWatchlist(profile)}
              onClick={() => {
                let newProfile = Object.assign({}, profile, {
                  watchList: profile.watchList.concat(ticker)
                });
                updateProfile(newProfile);
              }}
            >
              Add to WatchList
            </button>
          </>
        )}{" "}
        <Link to="/transaction">
          <button
            type="button"
            disabled={!auth.isAuthenticated()}
            className="btn btn-primary"
            style={{ marginLeft: "auto" }}
          >
            Add Transaction
          </button>
        </Link>
        {!auth.isAuthenticated()}
        {<LoginPrompt />}
      </form>
    </div>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
  price: PropTypes.object.isRequired,
  ticker: PropTypes.string.isRequired,
  pricesHistorical: PropTypes.object.isRequired,
  errors: PropTypes.object
};

export default ProductForm;
