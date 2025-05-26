import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Divider,
  Radio,
  RadioGroup,
  IconButton,
  ListItem,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { ThemeContext } from "../ThemeProvider";

export default function CustomFilterDialog({
  open,
  onClose,
  onApply,
  filtersConfig,
  dateShow,
  modalFilters = {},
  headerFilter,
}) {
  const [filters, setFilters] = useState(() => {
    return filtersConfig.reduce((acc, filter) => {
      acc[filter.label] = filter.type === "radio" ? "" : [];
      return acc;
    }, {});
  });

  const [headerFilters, setHeaderFilters] = useState([]);
  const [searchTerms, setSearchTerms] = useState({}); // per filter search term
  const [dateRange, setDateRange] = useState(null);
  const theme = useContext(ThemeContext);
  const isDark = theme === "dark";

  useEffect(() => {
    if (Object.keys(modalFilters).length > 0) {
      setFilters(modalFilters);
      if (modalFilters.filterdetails) {
        setHeaderFilters(modalFilters.filterdetails);
      } else {
        setHeaderFilters([]);
      }
    }
  }, [modalFilters]);

  const handleSearchChange = (label, value) => {
    setSearchTerms((prev) => ({ ...prev, [label]: value }));
  };

  const handleSelectAllOptions = (label, options) => {
    const allSelected = filters[label]?.length === options.length;
    setFilters((prev) => ({
      ...prev,
      [label]: allSelected ? [] : options.map((option) => option.value),
    }));
  };

  const handleHeaderFilterChange = (value) => {
    setHeaderFilters((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSelectAll = () => {
    if (headerFilters.length === headerFilter.length) {
      setHeaderFilters([]);
    } else {
      setHeaderFilters(headerFilter.map((item) => item.value));
    }
  };

  const handleCheckboxChange = (label, value) => {
    setFilters((prev) => {
      const selected = Array.isArray(prev[label]) ? prev[label] : [];
      return {
        ...prev,
        [label]: selected.includes(value)
          ? selected.filter((v) => v !== value)
          : [...selected, value],
      };
    });
  };

  const handleRadioChange = (label, value) => {
    setFilters((prev) => ({ ...prev, [label]: value }));
  };

  const handleApply = () => {
    if (dateShow) {
      filters.dateRange = dateRange;
    }
    if (headerFilters.length > 0) {
      filters.filterdetails = headerFilters;
    } else {
      delete filters.filterdetails;
    }
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    setFilters(
      filtersConfig.reduce((acc, filter) => {
        acc[filter.label] = filter.type === "radio" ? "" : [];
        return acc;
      }, {})
    );
    setHeaderFilters([]);
    setSearchTerms({});
  };

  return (
    <Dialog
      className="overflow-hidden shadow-[0px_0px_17px_0px_#ECECEC]"
      open={open}
      onClose={onClose}
      maxWidth={
        filtersConfig.length <= 2
          ? "sm"
          : filtersConfig.length >= 3
          ? "lg"
          : "md"
      }
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: isDark ? "#1f2937" : "white",
          color: isDark ? "white" : "black",
          boxShadow: isDark
            ? "0 0 17px 0 #374151" // a darker shadow in dark mode
            : "0 0 17px 0 #ECECEC",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          color: isDark ? "white" : "black",
          borderBottom: `1px solid ${isDark ? "#374151" : "#e0e0e0"}`,
        }}
      >
        Quick Filters
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: isDark ? "#9ca3af" : "grey.text",
            "&:hover": {
              color: isDark ? "white" : "black",
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <Divider sx={{ borderColor: isDark ? "#374151" : "#e0e0e0" }} />
      <DialogContent
        sx={{
          maxHeight: "500px",
          overflowY: "auto",
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: isDark ? "#4b5563" : "#012241",
          },
          color: isDark ? "white" : "black",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {filtersConfig.map(
            ({
              label,
              data,
              search,
              selectAll,
              type,
              paginated,
              loadMore,
              loading,
            }) => {
              const searchTerm = searchTerms[label] || "";
              const filteredData = data?.filter((option) =>
                option?.label?.toLowerCase().includes(searchTerm.toLowerCase())
              );

              return (
                <Box
                  key={label}
                  p={2}
                  border={1}
                  borderColor="inputGray.main"
                  backgroundColor="grey.200"
                  borderRadius={2}
                  sx={{
                    backgroundColor: isDark ? "#374151" : "grey.200",
                    borderColor: isDark ? "#4b5563" : "inputGray.main",
                    color: isDark ? "white" : "black",
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={"1px solid lightgray"}
                    mb={1}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ color: "black" }}
                    >
                      {label}
                    </Typography>
                    {selectAll && type === "checkbox" && (
                      <Button
                        onClick={() =>
                          handleSelectAllOptions(label, filteredData)
                        }
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {filters[label]?.length === filteredData?.length
                          ? "Unselect All"
                          : "Select All"}
                      </Button>
                    )}
                  </Box>

                  {search && (
                    <input
                      type="text"
                      placeholder={`Search ${label}`}
                      value={searchTerm}
                      onChange={(e) =>
                        handleSearchChange(label, e.target.value)
                      }
                      style={{
                        marginBottom: "8px",
                        padding: "4px",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    />
                  )}

                  {filteredData.length > 0 ? (
                    type === "checkbox" ? (
                      <Box
                        onScroll={(e) => {
                          const { scrollTop, scrollHeight, clientHeight } =
                            e.currentTarget;
                          if (scrollTop + clientHeight >= scrollHeight - 20) {
                            if (paginated && loadMore && !loading) {
                              loadMore(); // 🔁 Trigger load more
                            }
                          }
                        }}
                        display="flex"
                        flexDirection="column"
                        gap={1.5}
                        height={300}
                        overflow="auto"
                        sx={{
                          boxSizing: "border-box",
                          "&::-webkit-scrollbar": {
                            width: "8px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#012241",
                            borderRadius: "4px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "#F0F0F0",
                          },
                        }}
                      >
                        {filteredData.map((option) => (
                          <ListItem
                            key={option.value}
                            secondaryAction={
                              <Typography color="gray">
                                {option?.count}
                              </Typography>
                            }
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  sx={{
                                    color: isDark ? "#ccc" : "#333",
                                    "&.Mui-checked": {
                                      color: isDark ? "#90caf9" : "#1976d2",
                                    },
                                  }}
                                  checked={filters[label]?.includes(
                                    option.value
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(label, option.value)
                                  }
                                />
                              }
                              label={option.label}
                              style={{
                                color: "black",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                width: 240,
                              }}
                            />
                          </ListItem>
                        ))}
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={1.5}
                        height={300}
                        overflow="auto"
                        sx={{
                          boxSizing: "border-box",
                          "&::-webkit-scrollbar": {
                            width: "8px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#012241",
                            borderRadius: "4px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "#F0F0F0",
                          },
                        }}
                      >
                        <RadioGroup
                          value={filters[label]}
                          onChange={(e) =>
                            handleRadioChange(label, e.target.value)
                          }
                        >
                          {filteredData.map((option) => (
                            <FormControlLabel
                              key={option.value}
                              value={option.value}
                              control={
                                <Radio
                                  sx={{
                                    color: isDark ? "#ccc" : "#333", // unchecked color: light gray in dark mode, dark gray in light mode
                                    "&.Mui-checked": {
                                      color: isDark ? "#90caf9" : "#1976d2", // checked color: light blue in dark mode, standard blue in light mode
                                    },
                                  }}
                                />
                              }
                              label={option.label}
                            />
                          ))}
                        </RadioGroup>
                      </Box>
                    )
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No Options Available
                    </Typography>
                  )}

                  {paginated && loading && (
                    <Typography
                      variant="caption"
                      textAlign="center"
                      mt={1}
                      color="textSecondary"
                    >
                      Loading more...
                    </Typography>
                  )}
                </Box>
              );
            }
          )}
        </div>
      </DialogContent>
      <Divider sx={{ borderColor: isDark ? "#374151" : "#e0e0e0" }} />
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: isDark ? "#1f2937" : "white",
          borderTop: `1px solid ${isDark ? "#374151" : "#e0e0e0"}`,
          color: isDark ? "white" : "black",
        }}
      >
        <Button
          sx={{
            textTransform: "capitalize",
            color: isDark ? "#9ca3af" : "black",
          }}
          onClick={handleClear}
        >
          Clear All
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
            color: "white",
            backgroundColor: isDark ? "#2563eb" : "#000",
            "&:hover": {
              backgroundColor: isDark ? "#1e40af" : "#333",
            },
          }}
          onClick={handleApply}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
