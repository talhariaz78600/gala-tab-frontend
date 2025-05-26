import React from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  CircularProgress,
} from "@mui/material";
import { IoFunnelOutline } from "react-icons/io5";
import { useGetServiceTypeQuery } from "@/api/apiSlice";
import { ThemeContext } from "../ThemeProvider";

export default function BasicSelect({ onSelect }) {
  const [type, setType] = React.useState("");
  const { data, isLoading } = useGetServiceTypeQuery();
  const { theme } = React.useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  const handleChange = (event) => {
    setType(event.target.value);
    const selectedItem =
      event.target.value === ""
        ? null
        : data?.data?.find((item) => item._id === event.target.value);
    if (onSelect) {
      onSelect(selectedItem ? selectedItem._id : ""); // Pass empty string for "All"
    }
  };

  return (
    <Box
      sx={{
        minWidth: 120,
        backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
        borderRadius: "8px",
      }}
    >
      <FormControl fullWidth>
        <Select
          id="demo-simple-select"
          value={type}
          onChange={handleChange}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: isDarkMode ? "#bbb" : "#888",
                  }}
                >
                  Select Filter
                </Box>
              );
            }
            if (selected === "") return "All";
            return data?.data?.find((item) => item._id === selected)?.name;
          }}
          startAdornment={
            (type || type === "") && (
              <IoFunnelOutline
                style={{
                  marginRight: 8,
                  fontSize: "30px",
                  color: isDarkMode ? "#ccc" : "#555",
                }}
              />
            )
          }
          sx={{
            fontFamily: "tt_chocolates",
            color: isDarkMode ? "#eee" : "#000",
            "& .MuiSelect-select": {
              paddingTop: "13.5px",
              paddingBottom: "13.5px",
              backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
            },
            "& fieldset": {
              borderColor: isDarkMode ? "#444" : "#ccc",
            },
            "&:hover fieldset": {
              borderColor: isDarkMode ? "#666" : "#888",
            },
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
                backgroundColor: isDarkMode ? "#2b2b2b" : "#fff",
                color: isDarkMode ? "#eee" : "#000",
              },
            },
          }}
        >
          <MenuItem
            value=""
            sx={{
              fontFamily: "tt_chocolates",
              color: isDarkMode ? "#ccc" : "#000",
            }}
          >
            All
          </MenuItem>
          {isLoading ? (
            <MenuItem disabled>
              <CircularProgress size={20} sx={{ marginRight: 1 }} />
              Loading...
            </MenuItem>
          ) : (
            data?.data?.map((item) => (
              <MenuItem
                key={item._id}
                value={item._id}
                sx={{
                  fontFamily: "tt_chocolates",
                  color: isDarkMode ? "#ddd" : "#000",
                }}
              >
                {item.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
