import * as types from "./actionTypes";
import * as productApi from "../../api/productApi";
import { beginApiCall } from "./apiStatusActions";

export function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

export function loadProducts() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return productApi
      .getProducts()
      .then(products => {
        dispatch(loadProductsSuccess(products));
      })
      .catch(error => {
        throw error;
      });
  };
}
