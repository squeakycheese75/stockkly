import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as transactionActions from "../../redux/actions/transactionActions";
import * as productActions from "../../redux/actions/productActions";
import PropTypes from "prop-types";
import TransactionForm from "./TransactionForm";
import Loading from "../common/Loading";
import { toast } from "react-toastify";

const newTransaction = {
  ticker: "",
  transtype: "BUY",
  quantity: 1,
  transdate: "",
  price: 1
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
        console.log("Loading transactions failed" + error);
      });
    } else {
      setTransaction({ ...props.transaction });
    }

    if (products.length === 0) {
      loadProducts().catch(error => {
        console.log("Loading products failed" + error);
      });
    }
    // eslint-disable-next-line
  }, [props.transaction]);

  function handleChange(event) {
    const { value, name } = event.target;
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      [name]: name === "productId" ? parseInt(value, 10) : value
    }));
    // setTransaction(prevTransaction => ({
    //   ...prevTransaction,
    //   [name]: name === "productId" ? parseInt(value, 10) : value
    // }));
  }

  function formIsValid() {
    const { ticker, transtype, quantity, transdate } = transaction;
    const errors = {};

    if (!ticker) errors.product = "Product is required";
    if (!transtype) errors.transtype = "Type is required";
    if (!quantity) errors.quantity = "Quantity is required";
    if (!transdate) errors.transdate = "Transaction date is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveTransaction(transaction)
      .then(() => {
        toast.info(
          transaction.id ? "Transaction updated" : "Transaction saved!"
        );
        history.push("/transactions");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function handleCancel(event) {
    event.preventDefault();
    history.goBack();
  }

  // return transactions.length === 0 ||
  return products.length === 0 ? (
    <Loading />
  ) : (
    <TransactionForm
      transaction={transaction}
      errors={errors}
      products={products}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
      cancel={handleCancel}
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

export function getTransactionById(transactions, id) {
  return transactions.find(transaction => transaction.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const transaction =
    id && state.transactions.length > 0
      ? getTransactionById(state.transactions, id)
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
