const DEFAULT_API_URL = "http://localhost:5002";

export const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
  
  if (typeof window !== "undefined") {
    // If we're in the browser, try to use the same host as the page but with port 5002
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:5002`;
  }
  
  return DEFAULT_API_URL;
};

export const buildApiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
};

export const buildMediaUrl = (path) => {
  if (!path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return buildApiUrl(path);
};

const extractErrorMessage = async (response) => {
  try {
    const payload = await response.json();
    return payload.message || "Something went wrong while contacting the backend.";
  } catch (error) {
    return `Request failed with status ${response.status}.`;
  }
};

const isFormDataBody = (body) => typeof FormData !== "undefined" && body instanceof FormData;

export const apiRequest = async (path, options = {}) => {
  const headers = new Headers(options.headers || {});

  if (options.body !== undefined && options.body !== null && !isFormDataBody(options.body) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildApiUrl(path), {
    ...options,
    headers,
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response));
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

export const fetchJson = (path, options = {}) => apiRequest(path, options);
