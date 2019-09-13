import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as transactionActions from "../../redux/actions/transactionActions";
import * as productActions from "../../redux/actions/productActions";
import PropTypes from "prop-types";
import ProductForm from "./ProductForm";
import Loading from "../common/Loading";

const newProduct = {
  id: null
};

function ManageProductPage({
  products,
  loadProducts,
  transactions,
  loadTransactions,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [loading, setLoading] = useState({ ...props.loading });
  useEffect(() => {
    if (products.length === 0) {
      loadProducts().catch(error => {
        console.log("Loading products failed" + error);
      });
    }

    if (transactions.length === 0) {
      loadTransactions().catch(error => {
        console.log("Loading transactions failed" + error);
      });
    }
    // eslint-disable-next-line
  }, [props.product]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <ProductForm product={product} transactions={transactions} />
        </>
      )}
    </>
  );
}

ManageProductPage.propTypes = {
  loadProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  loadTransactions: PropTypes.func.isRequired,
  transactions: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export function getProductByTicker(products, ticker) {
  return products.find(product => product.ticker === ticker) || null;
}

function mapStateToProps(state, ownProps) {
  const ticker = ownProps.match.params.ticker;
  console.log("passed ticker is: ", ticker);
  console.log("products length: ", state.products.length);
  // if (state.products.length > 0) {
  //   const product = getProductByTicker(
  //     state.products,
  //     ownProps.match.params.ticker
  //   );
  // }
  const product =
    ticker && state.products.length > 0
      ? getProductByTicker(state.products, ticker)
      : newProduct;
  console.log("product ", product);

  const filteredTransactions = state.transactions.filter(
    transaction => transaction.productId === product.id
  );

  return {
    products: state.products,
    transactions:
      filteredTransactions.length === 0
        ? []
        : filteredTransactions.map(transaction => {
            return {
              ...transaction,
              productName: state.products.find(
                p => p.id === transaction.productId
              ).name,
              ticker: state.products.find(p => p.id === transaction.productId)
                .ticker
            };
          }),
    product,
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = {
  loadProducts: productActions.loadProducts,
  loadTransactions: transactionActions.loadTransactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageProductPage);
