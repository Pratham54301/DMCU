import { apiRequest, fetchJson } from "@/lib/api";

const withAuthHeaders = (token, headers = {}) => ({
  ...headers,
  Authorization: `Bearer ${token}`
});

export const loginAdminRequest = ({ email, password }) =>
  apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

export const fetchCharactersRequest = (options = {}) => fetchJson("/api/characters", options);

export const createCharacterRequest = (token, formData) =>
  apiRequest("/api/characters", {
    method: "POST",
    headers: withAuthHeaders(token),
    body: formData
  });

export const updateCharacterRequest = (token, characterId, formData) =>
  apiRequest(`/api/characters/${characterId}`, {
    method: "PUT",
    headers: withAuthHeaders(token),
    body: formData
  });

export const deleteCharacterRequest = (token, characterId) =>
  apiRequest(`/api/characters/${characterId}`, {
    method: "DELETE",
    headers: withAuthHeaders(token)
  });

export const fetchBlogsRequest = (options = {}) => fetchJson("/api/blog", options);

export const createBlogRequest = (token, formData) =>
  apiRequest("/api/blog", {
    method: "POST",
    headers: withAuthHeaders(token),
    body: formData
  });

export const updateBlogRequest = (token, blogId, formData) =>
  apiRequest(`/api/blog/${blogId}`, {
    method: "PUT",
    headers: withAuthHeaders(token),
    body: formData
  });

export const deleteBlogRequest = (token, blogId) =>
  apiRequest(`/api/blog/${blogId}`, {
    method: "DELETE",
    headers: withAuthHeaders(token)
  });
