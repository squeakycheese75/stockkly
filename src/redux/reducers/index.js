import { combineReducers } from "redux";
import transactions from "./transactionReducer";
import products from "./productReducer";

const rootReducer = combineReducers({
  transactions,
  products
});

export default rootReducer;
