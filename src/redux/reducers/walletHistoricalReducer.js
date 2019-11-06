import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function walletHistoricalReducer(
  state = initalState.walletChart,
  action
) {
  switch (action.type) {
    case types.LOAD_WALLET_CHART_SUCCESS:
      return action.walletChart;
    default:
      return state;
  }
}
