import { getAuthHeaders } from "./AuthHelper";

export const get = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const post = async (url: string, body?: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: getAuthHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const put = async (url: string, body?: any) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const remove = async (url: string) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
