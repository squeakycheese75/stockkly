import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/holdings/";

export function getHoldings() {
  console.log(baseUrl);
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
