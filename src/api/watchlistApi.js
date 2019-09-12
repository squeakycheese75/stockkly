import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/watchlist/";

export function getWatchlist() {
  console.log(baseUrl);
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

// export function getWatchlist() {
//   return fetch(baseUrl, {
//     headers: { "content-type": "application/json" }
//   })
//     .then(handleResponse)
//     .catch(handleError);
// }
