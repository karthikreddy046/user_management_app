import "./SearchBar.css";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search by First Name, Last Name or Email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <button
          className="clear-btn"
          onClick={() => setSearchTerm("")}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;