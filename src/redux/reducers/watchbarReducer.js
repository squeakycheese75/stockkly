import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function watchbarReducer(state = initalState.watchbar, action) {
  switch (action.type) {
    case types.LOAD_WATCHBAR_SUCCESS:
      return action.watchbar;
    default:
      return state;
  }
}
