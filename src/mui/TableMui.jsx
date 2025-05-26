import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Loader from "@/components/loader/Loader";
import { ThemeContext } from "@/components/ThemeProvider";

export default function TableMui({
  th,
  td,
  styleTableTh,
  styleTableContainer,
  styleTableThead,
  headerRounded = true,
  rowRounded = true,
  customFields,
  cellStyles,
  loading,
}) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const renderValue = (row, key) => {
    const custom = customFields?.find((f) => f.name === key);
    return custom ? custom.data(row[key], row) : row[key];
  };

  return (
    <>
      <TableContainer style={styleTableContainer}>
        <Table
          aria-label="styled table"
          style={{ borderCollapse: "separate", borderSpacing: "0px 12px" }}
        >
          <TableHead
            sx={{
              backgroundColor: "#000000",
              ...styleTableThead,
              "& th:first-of-type": {
                borderTopLeftRadius: headerRounded ? "10px" : 0,
                borderBottomLeftRadius: headerRounded ? "10px" : 0,
              },
              "& th:last-of-type": {
                borderTopRightRadius: headerRounded ? "10px" : 0,
                borderBottomRightRadius: headerRounded ? "10px" : 0,
              },
            }}
          >
            <TableRow>
              {Object.entries(th).map(([key, label], index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: 600,
                    color: isDark ? "#ffffff" : "#ffffff",
                    whiteSpace: "nowrap",
                    px: 2,
                    py: 2.5,
                    fontSize: "16px",
                    ...styleTableTh,
                  }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {!loading && (
            <TableBody>
              {td.length > 0 ? (
                td.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    sx={{
                      backgroundColor: isDark ? "#1f2937" : "#ffffff",
                      "& td:first-of-type": {
                        borderTopLeftRadius: rowRounded ? "10px" : 0,
                        borderBottomLeftRadius: rowRounded ? "10px" : 0,
                      },
                      "& td:last-of-type": {
                        borderTopRightRadius: rowRounded ? "10px" : 0,
                        borderBottomRightRadius: rowRounded ? "10px" : 0,
                      },
                    }}
                  >
                    {Object.keys(th).map((key, colIndex) => (
                      <TableCell
                        key={colIndex}
                        sx={{
                          color: isDark ? "#ffffff" : "#010102",
                          px: 2,
                          py: 2,
                          whiteSpace: "nowrap",
                          fontSize: "15px",
                          ...(cellStyles?.[key] || {}),
                        }}
                      >
                        {renderValue(row, key)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={Object.keys(th).length}
                    sx={{
                      textAlign: "center",
                      py: 4,
                      color: isDark ? "#d1d5db" : "#888", // gray-300
                      fontStyle: "italic",
                      fontSize: "16px",
                    }}
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {loading && <Loader loading={loading} />}
    </>
  );
}
