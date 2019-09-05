import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function portfolioReducer(
  state = initalState.portfolio,
  action
) {
  switch (action.type) {
    case types.LOAD_PORTFOLIO_SUCCESS:
      return action.portfolio;
    default:
      return state;
  }
}
