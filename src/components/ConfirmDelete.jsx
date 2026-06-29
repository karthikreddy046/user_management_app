import "./ConfirmDelete.css";

function ConfirmDelete({
  isOpen,
  onClose,
  onConfirm,
  userName,
}) {
  if (!isOpen) return null;

  return (
    <div className="delete-overlay">

      <div className="delete-modal">

        <div className="delete-icon">
          🗑️
        </div>

        <h2>Delete User</h2>

        <p>
          Are you sure you want to delete{" "}
          <strong>{userName || "this user"}</strong>?
        </p>

        <p className="warning">
          This action cannot be undone.
        </p>

        <div className="delete-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmDelete;