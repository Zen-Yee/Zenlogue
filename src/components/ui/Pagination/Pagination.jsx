import React from "react";
import "./Pagination.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination() {
  return (
    <div className="pagination-container">
      <div>
        <ChevronLeft />
      </div>
      <div>1</div>
      <div>2</div>
      <div>
        <ChevronRight />
      </div>
    </div>
  );
}

export default Pagination;
