import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function productReducer(state = initalState.products, action) {
  switch (action.type) {
    // case types.CREATE_TRANSACTION:
    //   return [...state, { ...action.transaction }];
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products;
    default:
      return state;
  }
}
