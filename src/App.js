import TodoView from "../src/Components/TodoView";
import AddTodoPopup from "../src/Components/AddTodoPopup";
import "./main.scss";
import { useState } from "react";
import Header from "./Components/Header";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  return (
    <>
      <div className="app-container">
        <Header setPopupActive={setPopupActive} todos={todos} />
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
      {popupActive ? <div className="overlay"></div> : null}
    </>
  );
}

export default App;
