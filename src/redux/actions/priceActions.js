import * as types from "./actionTypes";
import * as pricesApi from "../../api/pricesApi";
import { beginApiCall } from "./apiStatusActions";

export function loadPricesSuccess(prices) {
  return { type: types.LOAD_PRICES_SUCCESS, prices };
}

export function loadPrices() {
  return function(dispatch) {
    // debugger;
    dispatch(beginApiCall());
    return pricesApi
      .getPrices()
      .then(prices => {
        dispatch(loadPricesSuccess(prices));
      })
      .catch(error => {
        throw error;
      });
  };
}
