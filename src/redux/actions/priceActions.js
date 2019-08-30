import * as types from "./actionTypes";
import * as pricesApi from "../../api/pricesApi";
import { beginApiCall } from "./apiStatusActions";

export function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

export function loadPrices() {
  return function(dispatch) {
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
