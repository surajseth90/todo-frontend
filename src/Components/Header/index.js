import "./style.scss";
import { PopupMenu } from "react-simple-widgets";

function Header({ setPopupActive, todos }) {
  return (
    <div className="header-container">
      <div className="header-left">
        <h2 className="header-title">Tasks</h2>
        <div className="total-tasks" title={`total task 10`}>
          {todos?.length}
        </div>
      </div>
      <div className="header-right">
        <button
          className="add-task-btn header-right-btn"
          type="submit"
          tabIndex={0}
          onClick={() => setPopupActive(true)}
        >
          ADD TASK
        </button>
        <div className="profile-dropdown-container">
          <PopupMenu>
            <button className="profile-dropdown-btn header-right-btn">
              Profile
            </button>

            <div className="profile-dropdown">
              <div className="card-body">
                <div id="circle-avatar" className="text-center mx-auto mb-4">
                  <span>S</span>
                </div>

                <h5 className="text-center">Suraj Gupta</h5>

                <button className="profile-logout-btn">Logout </button>
              </div>
            </div>
          </PopupMenu>
        </div>
      </div>
    </div>
  );
}

export default Header;
