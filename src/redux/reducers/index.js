import { combineReducers } from "redux";
import transactions from "./transactionReducer";
import products from "./productReducer";
import profile from "./profileReducer";
import watchlist from "./watchlistReducer";
import wallet from "./walletReducer";
import price from "./priceReducer";
import pricesHistorical from "./pricesHistoricalReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  transactions,
  products,
  profile,
  wallet,
  watchlist,
  apiCallsInProgress,
  price,
  pricesHistorical
});

export default rootReducer;
