import * as types from "./actionTypes";
import * as priceApi from "../../api/priceApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadPriceSuccess(price) {
  return { type: types.LOAD_PRICE_SUCCESS, price };
}

export function resetPriceSuccess() {
  return { type: types.RESET_PRICE_SUCCESS };
}

export function loadPrice(ticker) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return priceApi
      .getPrice(ticker)
      .then(price => {
        dispatch(loadPriceSuccess(price));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function resetPrice() {
  return function(dispatch) {
    dispatch(resetPriceSuccess());
  };
}
