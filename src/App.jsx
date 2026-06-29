import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterPopup from "./components/FilterPopup";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import Pagination from "./components/Pagination";
import ConfirmDelete from "./components/ConfirmDelete";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./api/userService";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Filter Popup
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  // Sorting
  const [sortField, setSortField] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Form
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers();

      const mappedUsers = response.map((user, index) => {
        const names = user.name.split(" ");

        const departments = [
          "IT",
          "Engineering",
          "HR",
          "Finance",
          "Sales",
        ];

        return {
          id: user.id,
          firstName: names[0],
          lastName: names.slice(1).join(" "),
          email: user.email,
          department: departments[index % departments.length],
        };
      });

      setUsers(mappedUsers);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    let data = [...users];

    data = data.filter((user) => {
      const search = searchTerm.toLowerCase();

      const searchMatch =
        user.firstName.toLowerCase().includes(search) ||
        user.lastName.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);

      const filterMatch =
        user.firstName
          .toLowerCase()
          .includes(filters.firstName.toLowerCase()) &&
        user.lastName
          .toLowerCase()
          .includes(filters.lastName.toLowerCase()) &&
        user.email
          .toLowerCase()
          .includes(filters.email.toLowerCase()) &&
        (filters.department === "" ||
          user.department === filters.department);

      return searchMatch && filterMatch;
    });

    data.sort((a, b) => {
      const valueA = a[sortField].toLowerCase();
      const valueB = b[sortField].toLowerCase();

      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

    return data;
  }, [users, searchTerm, filters, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;

  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + pageSize
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleAdd = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);

        setUsers((prev) =>
          prev.map((user) =>
            user.id === editingUser.id
              ? {
                  ...formData,
                  id: editingUser.id,
                }
              : user
          )
        );
      } else {
        const newUser = await createUser(formData);

        setUsers((prev) => [
          {
            ...formData,
            id: newUser.id || Date.now(),
          },
          ...prev,
        ]);
      }

      setShowForm(false);
      setEditingUser(null);
    } catch (err) {
      setError("Unable to save user.");
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUser.id);

      setUsers((prev) =>
        prev.filter(
          (user) => user.id !== selectedUser.id
        )
      );

      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (err) {
      setError("Unable to delete user.");
    }
  };

  if (loading) {
    return (
      <div className="loader">
        Loading Users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    );
  }
    return (
    <div className="app-container">

      <Header onAddUser={handleAdd} />

      <div className="toolbar">

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <button
          className="filter-button"
          onClick={() => setShowFilter(true)}
        >
          Filter Users
        </button>

      </div>

      <FilterPopup
        show={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <UserTable
        users={currentUsers}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />

      {showForm && (
        <UserForm
          user={editingUser}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      )}

      <ConfirmDelete
        isOpen={showDeleteModal}
        userName={
          selectedUser
            ? `${selectedUser.firstName} ${selectedUser.lastName}`
            : ""
        }
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDelete}
      />

    </div>
  );
}

export default App;