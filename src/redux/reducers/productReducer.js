import * as types from "../actions/actionTypes";

export default function productReducer(state = [], action) {
  switch (action.type) {
    // case types.CREATE_TRANSACTION:
    //   return [...state, { ...action.transaction }];
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products;
    default:
      return state;
  }
}
