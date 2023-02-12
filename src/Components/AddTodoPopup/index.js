import "./style.scss";
import { useState } from "react";

const BASE_API = "https://todo-app-backed.onrender.com";

function AddTodoPopup({ todos, setTodos, setPopupActive }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");

  const addTask = async () => {
    const data = await fetch(BASE_API + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todoTitle,
        detail: todoDetail,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);
    setPopupActive(false);
    setTodoTitle("");
    setTodoDetail("");
  };
  return (
    <div className="Popup-container">
      <div className="popup">
        <div className="closePopup" onClick={() => setPopupActive(false)}>
          X
        </div>
        <div className="add-todo-details">
          <input
            type="text"
            className="todo-title-input"
            onChange={(e) => setTodoTitle(e.target.value)}
            value={todoTitle}
            placeholder="Title of your task"
            required
          />
          <textarea
            type="text"
            className="todo-detail-input"
            onChange={(e) => setTodoDetail(e.target.value)}
            value={todoDetail}
            placeholder="Detail of your task"
            required
          />
          <div className="add-task">
            <button type="submit" tabIndex={0} onClick={addTask}>
              ADD TASK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodoPopup;
