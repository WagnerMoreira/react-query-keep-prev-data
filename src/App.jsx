import { Suspense, useState } from "react";
import useTodos from "./hooks/useTodos";

const Loading = () => <div>Loading...</div>;

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Todos />
    </Suspense>
  );
}

function Todos() {
  const [page, setPage] = useState(1);
  const [response, create, destroy] = useTodos(page);

  return (
    <div className="container">
      <div className="todos">
        <ul>
          {response.data?.map((todo) => (
            <li key={todo.id}>
              {todo.name}{" "}
              <button onClick={() => destroy(todo.id)}>delete</button>
            </li>
          ))}
        </ul>

        <button
          onClick={() =>
            create({
              id: Date.now(),
              name: `New Todo ${Date.now()}`,
            })
          }
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
            setPage((old) => old + 1);
          }}
          disabled={page === 4}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default App;
