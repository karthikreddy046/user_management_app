import { useState, useEffect } from "react";
import "./FilterPopup.css";

function FilterPopup({
  show,
  onClose,
  filters,
  setFilters,
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  if (!show) return null;

  const handleChange = (e) => {
    setLocalFilters({
      ...localFilters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    setFilters(localFilters);
    onClose();
  };

  const clearFilters = () => {
    const empty = {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    };

    setLocalFilters(empty);
    setFilters(empty);
    onClose();
  };

  return (
    <div className="filter-overlay">
      <div className="filter-modal">

        <div className="filter-header">
          <h2>Filter Users</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="filter-body">

          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={localFilters.firstName}
            onChange={handleChange}
            placeholder="Enter First Name"
          />

          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={localFilters.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
          />

          <label>Email</label>
          <input
            type="text"
            name="email"
            value={localFilters.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />

          <label>Department</label>
          <select
            name="department"
            value={localFilters.department}
            onChange={handleChange}
          >
            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>

        </div>

        <div className="filter-footer">

          <button
            className="apply-btn"
            onClick={applyFilters}
          >
            Apply Filters
          </button>

          <button
            className="reset-btn"
            onClick={clearFilters}
          >
            Reset
          </button>

        </div>

      </div>
    </div>
  );
}

export default FilterPopup;