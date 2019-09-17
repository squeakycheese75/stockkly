import * as types from "./actionTypes";
import * as pricesHistoricalApi from "../../api/pricesHistoricalApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadPricesHistoricalSuccess(pricesHistorical) {
  return { type: types.LOAD_PRICE_HISTORICAL_SUCCESS, pricesHistorical };
}

export function loadPricesHistorical(ticker) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return pricesHistoricalApi
      .getPriceHistorical(ticker)
      .then(pricesHistorical => {
        dispatch(loadPricesHistoricalSuccess(pricesHistorical));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
