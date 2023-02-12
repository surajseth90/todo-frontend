import { useEffect, useState } from "react";
import "./style.scss";

const BASE_API = "https://todo-app-backed.onrender.com";

function Todo({ todos, setTodos, popupActive, setPopupActive }) {
  const [selectedTask, setSelectedTask] = useState({});

  useEffect(() => {
    GetTasks();
  }, []);

  const GetTasks = async () => {
    await fetch(BASE_API + "/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => console.error("Error: ", error));
  };

  const completeTask = async (id) => {
    const data = await fetch(BASE_API + "/todo/complete/" + id)
      .then((res) => res.json())
      .catch((err) => console.error("Error: ", err));

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };

  const deleteTask = async (id) => {
    const data = await fetch(BASE_API + "/todo/delete/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error is: ", error));
    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
    if (id == selectedTask._id) {
      setSelectedTask({});
    }
  };

  const updateTodo = async (id) => {
    console.log("updateTodo", id);
    console.log("selectedTask", selectedTask);
    const data = await fetch(BASE_API + "/todo/update/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: selectedTask.title,
        detail: selectedTask.detail,
      }),
    })
      .then((res) => res.json())
      .then((dataa) =>
        setTodos((todos) =>
          todos.map((todo) => {
            if (todo._id === dataa._id) {
              todo.title = dataa.title;
              todo.detail = dataa.detail;
            }

            return todo;
          })
        )
      )
      .catch((err) => console.error("Error: ", err));
    setSelectedTask({});
  };

  return (
    <div className="App">
      <div className="title-view">
        <div className="task-list-container">
          <div className="task-list">
            {todos.length > 0 ? (
              todos.map((todo, key) => (
                <div
                  className={`task ${key == 0 ? "" : "task_"} ${
                    todo?.complete ? " is-complete" : ""
                  }`}
                  key={key}
                >
                  <button
                    className="title-btn"
                    onClick={() => completeTask(todo?._id)}
                  >
                    <p className="text">{todo?.title}</p>
                  </button>
                  <div className="task-actions">
                    <button
                      className="delete-todo"
                      onClick={() => deleteTask(todo?._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="view-detail"
                      onClick={() => {
                        setSelectedTask(todo);
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>You currently have no tasks</p>
            )}
          </div>
        </div>

        <div
          className="addPopup"
          role="button"
          onClick={() => setPopupActive(true)}
        >
          +
        </div>
      </div>
      <div className="detail-view">
        {selectedTask?._id ? (
          <div className={`current-task ${selectedTask?._id ? "" : "blur"}`}>
            <form>
              <label htmlFor="edit-title">Title</label>
              <input
                id="edit-title"
                className="current-task-title"
                value={selectedTask?.title}
                onChange={(e) => {
                  let obj = { ...selectedTask };
                  obj.title = e.target.value;
                  setSelectedTask(obj);
                }}
              ></input>
              <label htmlFor="edit-detail">Detail</label>
              <textarea
                id="edit-detail"
                className="current-task-detail"
                value={selectedTask?.detail}
                onChange={(e) => {
                  let obj = { ...selectedTask };
                  obj.detail = e.target.value;
                  setSelectedTask(obj);
                }}
              ></textarea>
            </form>
            <div className="edit-form-btn-container">
              <button
                className="hide-selected-task"
                disabled={!selectedTask?._id}
                onClick={() => setSelectedTask({})}
              >
                Close
              </button>
              <button
                onClick={() => {
                  console.log("selectedTask?._id", selectedTask?._id);
                  // setTimeout(() => {
                  updateTodo(selectedTask?._id);
                  // }, 3000);
                }}
              >
                Update
              </button>
            </div>
          </div>
        ) : null}
      </div>
      {popupActive ? <div className="overlay"></div> : null}
    </div>
  );
}

export default Todo;
