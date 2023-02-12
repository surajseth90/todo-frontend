import TodoView from "../src/Components/TodoView";
import AddTodoPopup from "../src/Components/AddTodoPopup";
import "./main.scss";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  return (
    <div className="app-container">
      <div className="header">
        <h1> Welcome</h1>
      </div>
      <TodoView
        setTodos={setTodos}
        todos={todos}
        popupActive={popupActive}
        setPopupActive={setPopupActive}
      />
      {popupActive ? (
        <AddTodoPopup
          setTodos={setTodos}
          todos={todos}
          popupActive={popupActive}
          setPopupActive={setPopupActive}
        />
      ) : null}
    </div>
  );
}

export default App;
