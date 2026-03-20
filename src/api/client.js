const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080/api";

export function getToken() {
  return localStorage.getItem("quiz_token");
}

export function setToken(token) {
  if (token) {
    localStorage.setItem("quiz_token", token);
  } else {
    localStorage.removeItem("quiz_token");
  }
}

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await response.json() : null;
  const text = !isJson ? await response.text() : null;

  if (!response.ok) {
    const message = data?.error || data?.message || text || "Request failed";
    throw new Error(`${message} (HTTP ${response.status})`);
  }

  return data;
}
