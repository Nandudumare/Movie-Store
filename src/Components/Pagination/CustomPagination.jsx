import { createTheme, Pagination, ThemeProvider } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

// const darkTheme = createTheme({
//   palette: {
//     type: "light",
//     primary: {
//       main: red[500],
//     },
//   },
// });

const CustomPagination = ({ page, setPage }) => {
  const handlePageChange = (page) => {
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
        onChange={(e) => handlePageChange(e.target.textContent)}
        count={10}
        color="primary"
      />
    </div>
  );
};

export default CustomPagination;
