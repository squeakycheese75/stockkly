import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function walletReducer(state = initalState.wallet, action) {
  switch (action.type) {
    case types.LOAD_WALLET_SUCCESS:
      return action.wallet;
    default:
      return state;
  }
}
