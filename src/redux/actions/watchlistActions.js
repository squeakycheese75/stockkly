import * as types from "./actionTypes";
import * as watchlistApi from "../../api/watchlistApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadWatchlistSuccess(watchlist) {
  return { type: types.LOAD_WATCHLIST_SUCCESS, watchlist };
}

export function loadWatchlist() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return watchlistApi
      .getWatchlist()
      .then(watchlist => {
        dispatch(loadWatchlistSuccess(watchlist));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function loadWatchlistWithTickers(tickers) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return watchlistApi
      .getWatchListWithTickers(tickers)
      .then(watchlist => {
        dispatch(loadWatchlistSuccess(watchlist));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
