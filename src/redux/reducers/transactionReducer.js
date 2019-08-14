import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function transactionReducer(
  state = initalState.transactions,
  action
) {
  switch (action.type) {
    case types.CREATE_TRANSACTION_SUCCESS:
      return [...state, { ...action.transaction }];
    case types.UPDATE_TRANSACTION_SUCCESS:
      return state.map(transaction =>
        transaction.id === action.transaction.id
          ? action.transaction
          : transaction
      );
    case types.LOAD_TRANSACTIONS_SUCCESS:
      return action.transactions;
    default:
      return state;
  }
}
