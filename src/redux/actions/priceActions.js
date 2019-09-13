import * as types from "./actionTypes";
import * as priceApi from "../../api/priceApi";
import { beginApiCall } from "./apiStatusActions";

export function loadPriceSuccess(price) {
  return { type: types.LOAD_PRICE_SUCCESS, price };
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
        throw error;
      });
  };
}
