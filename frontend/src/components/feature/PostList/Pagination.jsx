import "./Pagination.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination(currentPage, totalPages, onSelect) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-container">
      <button
        className="pagination-item"
        onClick={() => onSelect(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-item ${page === currentPage ? "active" : ""}`}
          onClick={() => onSelect(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-item"
        onClick={() => onSelect(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

export default Pagination;
