import { combineReducers } from "redux";
import transactions from "./transactionReducer";
import products from "./productReducer";
import profile from "./profileReducer";
import watchlist from "./watchlistReducer";
import portfolio from "./productReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  transactions,
  products,
  profile,
  portfolio,
  watchlist,
  apiCallsInProgress
});

export default rootReducer;
