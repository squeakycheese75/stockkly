import { handleResponse, handleError, getHeader } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/transactions/";

export function getTransactions() {
  return fetch(baseUrl, {
    headers: getHeader().headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveTransaction(transaction) {
  return fetch(baseUrl + (transaction.id || ""), {
    method: transaction.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: getHeader().headers,
    body: JSON.stringify(transaction)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteTransaction(transactionId) {
  return fetch(baseUrl + transactionId, {
    method: "DELETE",
    header: getHeader().headers
  })
    .then(handleResponse)
    .catch(handleError);
}
