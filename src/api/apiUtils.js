import { storage } from "../localStorageWrapper";
export async function handleResponse(response) {
  // console.log(response);
  // if (response.ok && response.status === 204) return response;
  if (response.ok && response.status === 204) return;
  if (response.ok) return response.json();
  // debugger;
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  // debugger;
  console.error("API call failed. " + error);
  throw error;
}

export function getHeader() {
  let token = storage().getItem("access_token") || null;
  let config = {
    headers: { "content-type": "application/json" },
  };

  if (token) {
    config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return config.headers;
}
