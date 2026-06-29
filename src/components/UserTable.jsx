import "./UserTable.css";

function UserTable({
  users,
  sortField,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
}) {
  const getSortIcon = (field) => {
    if (sortField !== field) return "↕";
    return sortOrder === "asc" ? "▲" : "▼";
  };

  return (
    <div className="table-container">
      <table className="user-table">

        <thead>
          <tr>

            <th>ID</th>

            <th onClick={() => onSort("firstName")}>
              First Name {getSortIcon("firstName")}
            </th>

            <th onClick={() => onSort("lastName")}>
              Last Name {getSortIcon("lastName")}
            </th>

            <th onClick={() => onSort("email")}>
              Email {getSortIcon("email")}
            </th>

            <th onClick={() => onSort("department")}>
              Department {getSortIcon("department")}
            </th>

            <th>Actions</th>

          </tr>
        </thead>

        <tbody>

          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No Users Found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>

                <td>{user.id}</td>

                <td>{user.firstName}</td>

                <td>{user.lastName}</td>

                <td>{user.email}</td>

                <td>
                  <span className="department-badge">
                    {user.department}
                  </span>
                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => onEdit(user)}
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(user.id)}
                  >
                    🗑 Delete
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>
    </div>
  );
}

export default UserTable;