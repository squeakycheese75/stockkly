import { handleResponse, handleError, getHeader } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/api/wallet/";

export function getWallet() {
  // console.log(baseUrl);
  return fetch(baseUrl, {
    headers: getHeader()
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getWalletChart() {
  var chartPath = baseUrl + "historical/";
  // console.log(chartPath);
  return fetch(chartPath, {
    headers: getHeader()
  })
    .then(handleResponse)
    .catch(handleError);
}
