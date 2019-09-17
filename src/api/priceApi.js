import { handleResponse, handleError, getHeader } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/api/prices/";

export function getPrice(ticker) {
  return fetch(baseUrl + ticker, {
    headers: getHeader()
  })
    .then(handleResponse)
    .catch(handleError);
}
