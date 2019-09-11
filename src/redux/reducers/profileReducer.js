import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function profileReducer(state = initalState.profile, action) {
  switch (action.type) {
    case types.CREATE_PROFILE_SUCCESS:
      return [...state, { ...action.profile }];
    case types.UPDATE_PROFILE_SUCCESS:
      console.log("In reducer with state.profile:", state.profile);
      console.log("In reducer with action.profile:", action.profile);
      return action.profile;
    case types.LOAD_PROFILE_SUCCESS:
      return action.profile;
    default:
      return state;
  }
}
