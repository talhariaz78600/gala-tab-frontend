import React from "react";
import TablePagination from "@mui/material/TablePagination";

const Pagination = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const pageStyle = {
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0px 14px 28px 0px rgba(0, 0, 0, 0.06)",
    "& .MuiTablePagination-toolbar>*": {
      fontFamily: "tt_chocolates",
    },
  };
  return (
    <div className="justify-center flex mt-5">
      <TablePagination
        sx={pageStyle}
        component="div"
        count={1}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Pagination;
