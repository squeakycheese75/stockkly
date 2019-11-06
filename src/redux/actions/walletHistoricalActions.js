import * as types from "./actionTypes";
import * as walletApi from "../../api/walletApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadWalletChartSuccess(walletChart) {
  return { type: types.LOAD_WALLET_CHART_SUCCESS, walletChart };
}

export function loadWalletChart() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return walletApi
      .getWalletChart()
      .then(walletChart => {
        dispatch(loadWalletChartSuccess(walletChart));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
