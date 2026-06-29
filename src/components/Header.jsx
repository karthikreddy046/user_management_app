import "./Header.css";

function Header({ onAddUser }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1>User Management Dashboard</h1>
        <p>Manage users with Search, Filter, Sort & CRUD Operations</p>
      </div>

      <div className="header-right">
        <button
          className="add-user-btn"
          onClick={onAddUser}
        >
          + Add User
        </button>
      </div>
    </header>
  );
}

export default Header;