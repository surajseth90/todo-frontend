import { useEffect, useState } from "react";
import "./style.scss";
import { BASE_API } from "../../helper";

function Todo({ todos, setTodos, popupActive, setPopupActive }) {
  const [selectedTask, setSelectedTask] = useState({});
  // const [isVisibleColorTiles, setIsVisibleColorTiles] = useState(false);

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
    if (id === selectedTask._id) {
      setSelectedTask({});
    }
  };

  // const updateTodo = async (id) => {
  //   console.log("updateTodo", id);
  //   console.log("selectedTask", selectedTask);
  //   const data = await fetch(BASE_API + "/todo/update/" + id, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       title: selectedTask.title,
  //       detail: selectedTask.detail,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((dataa) =>
  //       setTodos((todos) =>
  //         todos.map((todo) => {
  //           if (todo._id === dataa._id) {
  //             todo.title = dataa.title;
  //             todo.detail = dataa.detail;
  //           }

  //           return todo;
  //         })
  //       )
  //     )
  //     .catch((err) => console.error("Error: ", err));
  //   setSelectedTask({});
  // };

  return (
    <div className="todo-view">
      <div className="task-list-container">
        <div className="task-list">
          {todos.length > 0 ? (
            todos.map((todo, key) => (
              <div
                className={`task ${key === 0 ? "" : "task_"} ${
                  todo?.complete ? " is-complete" : ""
                }`}
                key={key}
              >
                <button
                  className="title-btn"
                  onClick={() => completeTask(todo?._id)}
                >
                  <div className="task-text text-title" title={todo?.title}>
                    {todo?.title}
                  </div>
                  <div className="task-text text-detail">{todo?.detail}</div>
                </button>
                {/* <button
                  className="update-bg-color"
                  title="Background options"
                  onClick={() => setIsVisibleColorTiles(!isVisibleColorTiles)}
                >
                  {isVisibleColorTiles ? (
                    <div className="color-tiles"></div>
                  ) : null}
                </button> */}
                <button
                  className="delete-todo"
                  onClick={() => deleteTask(todo?._id)}
                  title="Delete task"
                ></button>
              </div>
            ))
          ) : (
            <p>You currently have no tasks</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
