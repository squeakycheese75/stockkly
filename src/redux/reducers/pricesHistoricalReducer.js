import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function pricesHistoricalReducer(
  state = initalState.pricesHistorical,
  action
) {
  switch (action.type) {
    case types.LOAD_PRICE_HISTORICAL_SUCCESS:
      return action.pricesHistorical;
    default:
      return state;
  }
}

// export default function priceReducer(state = initalState.price, action) {
//   switch (action.type) {
//     case types.LOAD_PRICE_SUCCESS:
//       return action.price;
//     default:
//       return state;
//   }
// }
