import * as types from "./actionTypes";
import * as watchlistApi from "../../api/watchlistApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadWatchBarSuccess(watchbar) {
  return { type: types.LOAD_WATCHBAR_SUCCESS, watchbar };
}

export function loadWatchbar(tickers) {
  return function(dispatch) {
    console.log("In loadWatchbar with " + tickers);
    dispatch(beginApiCall());
    return watchlistApi
      .getWatchListWithTickers(tickers)
      .then(watchbarlist => {
        dispatch(loadWatchBarSuccess(watchbarlist));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
