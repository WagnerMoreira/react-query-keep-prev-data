const API_BASE = "http://localhost:3004";
export const fetcher = (url, options) =>
  fetch(`${API_BASE}/${url}`, options).then((res) => res.json());

export function getTodos(page) {
  const limit = 2;
  const start = (page - 1) * limit;
  return fetcher(`items?_start=${start}&_limit=${limit}`);
}

export const postTodo = (data) =>
  fetcher("items", { method: "POST", body: JSON.stringify(data) });
export const deleteTodo = (id) => fetcher(`items/${id}`, { method: "DELETE" });
