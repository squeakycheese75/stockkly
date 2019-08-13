import * as types from "./actionTypes";
import * as transactionApi from "../../api/transactionApi";

export function createTransaction(transaction) {
  return { type: types.CREATE_TRANSACTION, transaction };
}

export function loadTransactionsSuccess(transactions) {
  return { type: types.LOAD_TRANSACTIONS_SUCCESS, transactions };
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
