import { handleResponse, handleError, getHeader } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/api/profile/";

export function getProfile() {
  return fetch(baseUrl, {
    headers: getHeader()
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveProfile(profile) {
  console.log("profile api received: ", profile);
  return fetch(baseUrl, {
    // method: profile.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    method: "PUT",
    headers: getHeader(),
    body: JSON.stringify(profile)
  })
    .then(handleResponse)
    .catch(handleError);
}
