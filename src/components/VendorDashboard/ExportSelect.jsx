import React, { useContext } from "react";
import { InputLabel, MenuItem, FormControl, Select, Box } from "@mui/material";
import { TfiExport } from "react-icons/tfi";
import { FaFileArrowDown } from "react-icons/fa6";
import { ThemeContext } from "../ThemeProvider";

export default function ExportSelect({ onChange }) {
  const [type, setType] = React.useState("");
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const handleChange = (event) => {
    const selectedType = event.target.value;
    setType(selectedType);
    if (onChange) onChange(selectedType);
    setType("");
  };

  return (
    <Box
      sx={{
        minWidth: 200,
        backgroundColor: isDark ? "#1f2937" : "white",
        color: isDark ? "white" : "black",
        fontFamily: "tt_chocolates",
        borderRadius: 1,
      }}
    >
      <FormControl fullWidth>
        <Select
          labelId="export-select-label"
          id="export-select"
          value={type}
          onChange={handleChange}
          displayEmpty
          sx={{
            fontFamily: "tt_chocolates",
            backgroundColor: isDark ? "#1f2937" : "white",
            color: isDark ? "white" : "black",
            "& .MuiSelect-icon": {
              color: isDark ? "white" : "black",
            },
          }}
        >
          <MenuItem disabled value="">
            Select export type
          </MenuItem>
          <MenuItem value="excel">
            <div
              className="flex items-center"
              style={{ color: isDark ? "white" : "black" }}
            >
              <FaFileArrowDown
                className="me-2"
                style={{ fontSize: "1.2rem" }}
              />{" "}
              Export to Excel
            </div>
          </MenuItem>
          <MenuItem value="pdf">
            <div
              className="flex items-center"
              style={{ color: isDark ? "white" : "black" }}
            >
              <FaFileArrowDown
                className="me-2"
                style={{ fontSize: "1.2rem" }}
              />{" "}
              Export to Pdf
            </div>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
