import { handleResponse, handleError, getHeader } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/profile";

export function getProfile() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveProfile(profile) {
  return fetch(baseUrl, {
    method: profile.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: getHeader(),
    body: JSON.stringify(profile)
  })
    .then(handleResponse)
    .catch(handleError);
}
