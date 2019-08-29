import * as types from "./actionTypes";
import * as profileApi from "../../api/profileApi";
import { beginApiCall } from "./apiStatusActions";

export function loadProfileSuccess(profile) {
  return { type: types.LOAD_PROFILE_SUCCESS, profile };
}

export function loadProfile() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return profileApi
      .getProfile()
      .then(profile => {
        dispatch(loadProfileSuccess(profile));
      })
      .catch(error => {
        throw error;
      });
  };
}
