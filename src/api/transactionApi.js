import { handleResponse, handleError, getHeader } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/api/transactions/";

export function getTransactions() {
  // console.log(baseUrl);
  return fetch(baseUrl, {
    headers: getHeader()
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveTransaction(transaction) {
  // console.log(baseUrl);
  return fetch(baseUrl + (transaction.id || ""), {
    method: transaction.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: getHeader(),
    // headers: { "content-type": "application/json" },
    body: JSON.stringify(transaction)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteTransaction(transactionId) {
  // console.log(baseUrl);
  return fetch(baseUrl + transactionId, {
    method: "DELETE",
    header: getHeader()
  })
    .then(handleResponse)
    .catch(handleError);
}
