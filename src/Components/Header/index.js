import "./style.scss";

function Header({ setPopupActive }) {
  return (
    <div className="header-container">
      <div className="header-left">
        <h2 className="header-title">Tasks</h2>
        <div className="total-tasks" title={`total task 10`}>
          10
        </div>
      </div>
      <div className="header-right">
        <button
          className="add-task-btn"
          type="submit"
          tabIndex={0}
          onClick={() => setPopupActive(true)}
        >
          ADD TASK
        </button>
      </div>
    </div>
  );
}

export default Header;
