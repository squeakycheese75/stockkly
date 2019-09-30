import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function priceReducer(state = initalState.price, action) {
  switch (action.type) {
    case types.LOAD_PRICE_SUCCESS:
      return action.price;
    case types.RESET_PRICE_SUCCESS:
      return initalState.price;
    default:
      return state;
  }
}
