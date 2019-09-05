import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function watchlistReducer(
  state = initalState.watchlist,
  action
) {
  switch (action.type) {
    case types.LOAD_WATCHLIST_SUCCESS:
      return action.watchlist;
    default:
      return state;
  }
}
