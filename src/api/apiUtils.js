export async function handleResponse(response) {
  // debugger;
  if (response.ok) return response.json();
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
  console.error("API call failed. " + error);
  throw error;
}

export function getHeader() {
  let token = localStorage.getItem("access_token") || null;
  let config = {
    headers: { "content-type": "application/json" }
  };

  if (token) {
    config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
  }
  return config.headers;
}
