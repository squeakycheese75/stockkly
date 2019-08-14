import * as types from "./actionTypes";
import * as transactionApi from "../../api/transactionApi";

export function loadTransactionsSuccess(transactions) {
  return { type: types.LOAD_TRANSACTIONS_SUCCESS, transactions };
}

export function updateTransactionSuccess(transaction) {
  return { type: types.UPDATE_TRANSACTION_SUCCESS, transaction };
}

export function createTransactionSuccess(transaction) {
  return { type: types.CREATE_TRANSACTION_SUCCESS, transaction };
}

export function loadTransactions() {
  return function(dispatch) {
    return transactionApi
      .getTransactions()
      .then(transactions => {
        dispatch(loadTransactionsSuccess(transactions));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveTransaction(transaction) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    return transactionApi
      .saveTransaction(transaction)
      .then(savedTransaction => {
        transaction.id
          ? dispatch(updateTransactionSuccess(savedTransaction))
          : dispatch(createTransactionSuccess(savedTransaction));
      })
      .catch(error => {
        throw error;
      });
  };
}
