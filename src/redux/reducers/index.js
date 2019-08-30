import { combineReducers } from "redux";
import transactions from "./transactionReducer";
import products from "./productReducer";
import profile from "./profileReducer";
import prices from "./priceReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  transactions,
  products,
  profile,
  prices,
  apiCallsInProgress
});

export default rootReducer;
