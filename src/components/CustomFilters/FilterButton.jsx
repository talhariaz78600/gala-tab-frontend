import React, { useContext } from "react";
import Button from "@mui/material/Button";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Box from "@mui/material/Box";
import { ThemeContext } from "../ThemeProvider";

export default function FilterButton({ setOpen, modalFilters }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const appliedFiltersCount = Object.values(modalFilters || {}).filter(
    (value) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "string") return value.trim() !== "";
      return Boolean(value);
    }
  ).length;

  const iconColor = appliedFiltersCount
    ? isDark
      ? "#a3a3a3" // lighter grey for dark mode active filters
      : "#444444" // dark grey for light mode active filters
    : isDark
    ? "#6b7280" // tailwind gray-500 for dark mode no filters
    : "#9ca3af"; // tailwind gray-400 for light mode no filters

  return (
    <Button
      title="filter"
      variant="outlined"
      onClick={() => setOpen(true)}
      sx={{
        minHeight: "40px",
        borderColor: isDark ? "#444" : "black",
        color: isDark ? "white" : "black",
        justifyContent: "flex-start",
        textTransform: "none",
        padding: "8px 12px",
        display: "flex",
        flexWrap: "wrap",
        gap: "5px",
        backgroundColor: isDark ? "#1f2937" : "white",
        "&:hover": {
          borderColor: isDark ? "#888" : "#333",
          backgroundColor: isDark ? "#374151" : "#f3f4f6",
        },
      }}
      startIcon={<FilterAltOutlinedIcon sx={{ color: iconColor }} />}
      endIcon={<ExpandCircleDownIcon sx={{ color: iconColor }} />}
    >
      {!appliedFiltersCount && <span>Filter</span>}
      {appliedFiltersCount > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            alignItems: "center",
            color: isDark ? "#ddd" : "#222",
          }}
        >
          Filters / {appliedFiltersCount}
        </Box>
      )}
    </Button>
  );
}
