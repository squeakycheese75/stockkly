import * as types from "./actionTypes";
import * as profileApi from "../../api/profileApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadProfileSuccess(profile) {
  return { type: types.LOAD_PROFILE_SUCCESS, profile };
}

export function updateProfileSuccess(profile) {
  return { type: types.UPDATE_PROFILE_SUCCESS, profile };
}

export function createProfileSuccess(profile) {
  return { type: types.CREATE_PROFILE_SUCCESS, profile };
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
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveProfile(profile) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return profileApi
      .saveProfile(profile)
      .then(console.log("saved profile: ", profile))
      .then(savedProfile => {
        profile.id
          ? dispatch(updateProfileSuccess(savedProfile))
          : dispatch(createProfileSuccess(savedProfile));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
