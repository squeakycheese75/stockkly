import { handleResponse, handleError } from './apiUtils';
// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_API_URL + '/api/products/';

export function getProducts() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
