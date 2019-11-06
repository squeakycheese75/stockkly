import { combineReducers } from "redux";
import transactions from "./transactionReducer";
import products from "./productReducer";
import profile from "./profileReducer";
import watchlist from "./watchlistReducer";
import wallet from "./walletReducer";
import price from "./priceReducer";
import pricesHistorical from "./pricesHistoricalReducer";
import watchbar from "./watchbarReducer";
import apiCallsInProgress from "./apiStatusReducer";
import walletChart from "./walletHistoricalReducer";

const rootReducer = combineReducers({
  transactions,
  products,
  profile,
  wallet,
  watchlist,
  walletChart,
  apiCallsInProgress,
  price,
  pricesHistorical,
  watchbar
});

export default rootReducer;
