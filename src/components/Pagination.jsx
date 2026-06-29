import "./Pagination.css";

function Pagination({
  currentPage,
  totalPages,
  pageSize,
  setCurrentPage,
  setPageSize,
}) {
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="pagination-container">

      <div className="page-size">

        <label>Rows per page:</label>

        <select
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

      </div>

      <div className="page-controls">

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀ Previous
        </button>

        <span className="page-info">
          Page <strong>{currentPage}</strong> of{" "}
          <strong>{totalPages}</strong>
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next ▶
        </button>

      </div>

    </div>
  );
}

export default Pagination;