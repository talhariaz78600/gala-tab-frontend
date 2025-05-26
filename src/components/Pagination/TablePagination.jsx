import React from "react";
import TablePagination from "@mui/material/TablePagination";

const PaginationComponent = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  return (
    <TablePagination
      component="div"
      count={totalPages}
      page={currentPage}
      onPageChange={onPageChange}
      rowsPerPage={itemsPerPage}
      onRowsPerPageChange={onItemsPerPageChange}
    />
  );
};

export default PaginationComponent;
