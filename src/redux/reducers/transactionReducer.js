import * as types from "../actions/actionTypes";

export default function transactionReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_TRANSACTION:
      return [...state, { ...action.transaction }];
    case types.LOAD_TRANSACTIONS_SUCCESS:
      return action.transactions;
    default:
      return state;
  }
}
