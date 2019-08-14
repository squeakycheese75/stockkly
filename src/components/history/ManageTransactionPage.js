import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as transactionActions from "../../redux/actions/transactionActions";
import * as productActions from "../../redux/actions/productActions";
import PropTypes from "prop-types";
import TransactionForm from "./TransactionForm";
// import { newTransaction } from "../../../tools/mockData";

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
  useEffect(() => {
    if (transactions.length === 0) {
      loadTransactions().catch(error => {
        alert("Loading transactions failed" + error);
      });
    }

    if (products.length === 0) {
      loadProducts().catch(error => {
        alert("Loading products failed" + error);
      });
    }
    // eslint-disable-next-line
  }, []);

  function handleChange(event) {
    console.log(
      "handleChange",
      event.target.value,
      " name ",
      event.target.value
    );
    const { value, name } = event.target;
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      [name]: name === "productId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    // console.log("handleSave", event);
    saveTransaction(transaction).then(() => {
      history.push("/transactions");
    });
  }

  return (
    <TransactionForm
      transaction={transaction}
      errors={errors}
      products={products}
      onChange={handleChange}
      onSave={handleSave}
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

function mapStateToProps(state) {
  return {
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
