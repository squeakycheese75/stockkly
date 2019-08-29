import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function profileReducer(state = initalState.profile, action) {
  switch (action.type) {
    case types.LOAD_PROFILE_SUCCESS:
      return action.profile;
    default:
      return state;
  }
}
