import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as transactionActions from "../../redux/actions/transactionActions";
import * as productActions from "../../redux/actions/productActions";
import PropTypes from "prop-types";
import TransactionForm from "./TransactionForm";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
// import { tsConstructSignatureDeclaration } from "@babel/types";

const newTransaction = {
  id: null,
  productId: 1,
  type: "Buy",
  quantity: 1
  // trandate: ""
};

function ManageTransactionPage({
  transactions,
  products,
  loadProducts,
  loadTransactions,
  saveTransaction,
  history,
  ...props
}) {
  const [transaction, setTransaction] = useState({ ...props.transaction });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (transactions.length === 0) {
      loadTransactions().catch(error => {
        alert("Loading transactions failed" + error);
      });
    } else {
      setTransaction({ ...props.transaction });
    }

    if (products.length === 0) {
      loadProducts().catch(error => {
        alert("Loading products failed" + error);
      });
    }
    // eslint-disable-next-line
  }, [props.transaction]);

  function handleChange(event) {
    // console.log(
    //   "handleChange",
    //   event.target.value,
    //   " name ",
    //   event.target.value
    // );
    const { value, name } = event.target;
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      [name]: name === "productId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { productId, type, quantity, trandate } = transaction;
    const errors = {};
    // debugger;
    console.log("in formIsValid with ", transaction);

    if (!productId) errors.product = "Product is required";
    // if (!type) errors.type = "Type is required";
    // if (!quantity) errors.quantity = "Quantity is required";
    // if (!trandate) errors.trandate = "Transaction date is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    debugger;
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveTransaction(transaction)
      .then(() => {
        toast.info("Some message");
        history.push("/transactions");
      })
      .catch(error => {
        // console.log("here");
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return transactions.length === 0 || products.length === 0 ? (
    <Loading />
  ) : (
    <TransactionForm
      transaction={transaction}
      errors={errors}
      products={products}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageTransactionPage.propTypes = {
  transaction: PropTypes.object.isRequired,
  loadTransactions: PropTypes.func.isRequired,
  loadProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  saveTransaction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

// export function getTransactionBySlug(transactions, slug) {
//   return transactions.find(transaction => transaction.slug === slug) || null;
// }

export function getTransactionById(transactions, id) {
  return (
    transactions.find(transaction => transaction.id === parseInt(id)) || null
  );
}

function mapStateToProps(state, ownProps) {
  // const slug = ownProps.match.params.slug;
  const id = ownProps.match.params.id;
  const transaction =
    id && state.transactions.length > 0
      ? // ? getTransactionBySlug(state.transactions, slug)
        getTransactionById(state.transactions, id)
      : newTransaction;
  return {
    transaction,
    transactions: state.transactions,
    products: state.products
  };
}

const mapDispatchToProps = {
  loadTransactions: transactionActions.loadTransactions,
  loadProducts: productActions.loadProducts,
  saveTransaction: transactionActions.saveTransaction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageTransactionPage);
