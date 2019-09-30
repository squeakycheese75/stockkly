import * as types from "./actionTypes";
import * as walletApi from "../../api/walletApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadWalletSuccess(wallet) {
  return { type: types.LOAD_WALLET_SUCCESS, wallet };
}

export function loadWallet() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return walletApi
      .getWallet()
      .then(wallet => {
        dispatch(loadWalletSuccess(wallet));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
