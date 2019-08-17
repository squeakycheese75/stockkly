import { combineReducers } from "redux";
import transactions from "./transactionReducer";
import products from "./productReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  transactions,
  products,
  apiCallsInProgress
});

export default rootReducer;
