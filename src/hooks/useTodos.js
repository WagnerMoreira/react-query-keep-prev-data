import useSWR from "swr";
import { getTodos, postTodo, deleteTodo, updateTodo } from "../api";

export default function useTodos(page) {
  const response = useSWR(["todos", page], () => getTodos(page), {
    suspense: true,
    keepPreviousData: true,
  });

  async function create(data) {
    return await response.mutate(postTodo(data));
  }

  function update(data) {
    return response.mutate(updateTodo(data));
  }

  async function destroy(id) {
    return await response.mutate(deleteTodo(id));
  }

  return [response, create, update, destroy];
}
