import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as transactionActions from "../../redux/actions/transactionActions";
import * as productActions from "../../redux/actions/productActions";
import PropTypes from "prop-types";
import ProductForm from "./ProductForm";
import Loading from "../common/Loading";
// import { toast } from "react-toastify";

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
  // const [product, setProduct] = useState({ ...props.product });
  //   const [errors, setErrors] = useState({});
  //   const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState({ ...props.product });
  // const [transactions, setTransactions] = useState({ ...props.transactions });
  useEffect(() => {
    // debugger;
    if (products.length === 0) {
      loadProducts().catch(error => {
        alert("Loading products failed" + error);
      });
    }

    if (transactions.length === 0) {
      loadTransactions().catch(error => {
        alert("Loading transactions failed" + error);
      });
    }
    // eslint-disable-next-line
  }, [props.product]);
  // handleDelete = transaction => {
  //   toast.info("Transaction Deleted!");
  //   this.props.actions.deleteTransaction(transaction).catch(error => {
  //     toast.error("Transaction delete has Failed! " + error.message, {
  //       autoClose: false
  //     });
  //   });
  // };

  return products.length === 0 ? (
    <Loading />
  ) : (
    <>
      <ProductForm product={product} transactions={transactions} />
    </>
  );
}

ManageProductPage.propTypes = {
  loadProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  loadTransactions: PropTypes.func.isRequired,
  transactions: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

export function getProductByTicker(products, ticker) {
  return products.find(product => product.ticker === ticker) || null;
}

function mapStateToProps(state, ownProps) {
  const ticker = ownProps.match.params.ticker;
  const product =
    ticker && state.products.length > 0
      ? getProductByTicker(state.products, ticker)
      : newProduct;

  const filteredTransactions = state.transactions.filter(
    transaction => transaction.productId === product.id
  );

  return {
    product,
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
          })
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
