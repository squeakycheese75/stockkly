import { handleResponse, handleError, getHeader } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/wallet/";

export function getWallet() {
  return fetch(baseUrl, {
    headers: getHeader().headers
  })
    .then(handleResponse)
    .catch(handleError);
}