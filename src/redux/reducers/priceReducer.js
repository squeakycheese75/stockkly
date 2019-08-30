import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function priceReducer(state = initalState.prices, action) {
  switch (action.type) {
    case types.LOAD_PRICES_SUCCESS:
      return action.prices;
    default:
      return state;
  }
}
