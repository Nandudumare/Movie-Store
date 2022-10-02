import { Pagination } from "@mui/material";
import React from "react";

const CustomPagination = ({ page, setPage, numOfPages }) => {
  const handlePageChange = (event, page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <Pagination
        onChange={handlePageChange}
        count={numOfPages ? (numOfPages <= 500 ? numOfPages : 500) : 10}
        color="primary"
        page={page}
      />
    </div>
  );
};

export default CustomPagination;
