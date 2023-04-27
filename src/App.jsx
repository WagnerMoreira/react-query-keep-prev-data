import { Suspense, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { getTodos, postTodo, deleteTodo } from "./api";

const queryClient = new QueryClient();

const Loading = () => <div>Loading...</div>;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        <Todos />
      </Suspense>
    </QueryClientProvider>
  );
}

function Todos() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const query = useQuery(["todos", page], () => getTodos(page), {
    suspense: true,
    keepPreviousData: true,
  });

  const onAdd = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const onDelete = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div className="container">
      <div className="todos">
        <ul>
          {query.data?.map((todo) => (
            <li key={todo.id}>
              {todo.name}{" "}
              <button onClick={() => onDelete.mutate(todo.id)}>delete</button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            onAdd.mutate({
              id: Date.now(),
              name: "Do Laundry",
            });
          }}
        >
          Add Todo
        </button>
      </div>

      <div className="pagination">
        <button onClick={() => setPage((old) => old - 1)} disabled={page === 1}>
          Previous Page
        </button>
        <span>Current Page: {page}</span>
        <button
          onClick={() => {
            if (!query.isPreviousData) {
              setPage((old) => old + 1);
            }
          }}
          // Disable the Next Page button if we are still using the previous data
          disabled={query.isPreviousData || page === 4}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default App;
