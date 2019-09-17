import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/api/watchlist/";

export function getWatchlist() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
