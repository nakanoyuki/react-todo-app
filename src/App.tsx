import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  deleted: boolean;
};
type Filter = "all" | "checked" | "unchecked" | "deleted";
function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      deleted: false,
    };

    setTodos([newTodo, ...todos]);
    setText("");
  };

  const handleEdit = (id: number, value: string) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = deepCopy.map((todo) => {
      if (id === todo.id) {
        todo.value = value;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleCheck = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleDelete = (id: number, deleted: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.deleted = !deleted;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleSort = (filter: Filter) => {
    setFilter(filter);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "all":
        // 削除されていないもの
        return !todo.deleted;
      case "checked":
        return todo.checked && !todo.deleted;
      case "unchecked":
        return !todo.checked && !todo.deleted;
      case "deleted":
        return todo.deleted;
    }
  });

  const handleEmpty = () => {
    const newTodos = todos.filter((todos) => !todos.deleted);
    setTodos(newTodos);
  };
  return (
    <div className="App">
      <select
        defaultValue="all"
        onChange={(e) => handleSort(e.target.value as Filter)}
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="deleted">ごみ箱</option>
      </select>

      {filter === "deleted" ? (
        <button
          onClick={handleEmpty}
          disabled={todos.filter((todo) => todo.deleted).length === 0}
        >
          ごみ箱を空にする
        </button>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input type="text" value={text} onChange={(e) => handleChange(e)} />
          <input type="submit" value="追加" onSubmit={handleSubmit} />
        </form>
      )}

      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                disabled={todo.deleted}
                checked={todo.checked}
                onChange={(e) => handleCheck(todo.id, todo.checked)}
              />
              <input
                type="text"
                disabled={todo.checked || todo.deleted}
                value={todo.value}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
              <button onClick={() => handleDelete(todo.id, todo.deleted)}>
                {todo.deleted ? "復元" : "削除"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
