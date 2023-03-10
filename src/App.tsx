import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

type Todo = {
  value: string;
  readonly id: number;
};
function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
    setText("");
  };

  const handleEdit = (id: number, value: string) => {
    const deepCopy = todos.map((todo)=>({...todo}))
    const newTodos = deepCopy.map((todo) => {
      if (id === todo.id) {
        todo.value === value;
      }
      return todo;
    });
    setTodos(newTodos);
  };
  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input type="text" value={text} onChange={(e) => handleChange(e)} />
        <input type="submit" value="追加" onSubmit={handleSubmit} />
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.value}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
