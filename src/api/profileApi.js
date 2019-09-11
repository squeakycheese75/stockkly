import { handleResponse, handleError, getHeader } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/profile/";

export function getProfile() {
  console.log(baseUrl);
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveProfile(profile) {
  return fetch(baseUrl + (profile.id || ""), {
    method: profile.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: getHeader().headers,
    body: JSON.stringify(profile)
  })
    .then(handleResponse)
    .catch(handleError);
}

//   export function deleteTransaction(transactionId) {
//     return fetch(baseUrl + transactionId, {
//       method: "DELETE",
//       header: getHeader().headers
//     })
//       .then(handleResponse)
//       .catch(handleError);
//   }

// export function saveTransaction(transaction) {
//   // console.log("t", transaction);
//   return fetch(baseUrl + (transaction.id || ""), {
//     method: transaction.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
//     // headers: getHeader().headers,
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify(transaction)
//     // body: JSON.stringify(transaction)
//   })
//     .then(handleResponse)
//     .catch(handleError);
// }
