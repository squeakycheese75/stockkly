import * as types from "./actionTypes";
import * as pricesHistoricalApi from "../../api/pricesHistoricalApi";
import { beginApiCall } from "./apiStatusActions";

export function loadPricesHistoricalSuccess(price) {
  return { type: types.LOAD_PRICE_HISTORICAL_SUCCESS, price };
}

export function loadPricesHistorical(ticker) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return pricesHistoricalApi
      .getPriceHistorical(ticker)
      .then(prices => {
        dispatch(loadPricesHistoricalSuccess(prices));
      })
      .catch(error => {
        throw error;
      });
  };
}
