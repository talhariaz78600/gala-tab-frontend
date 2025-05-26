import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LogsTable from "./LogsTable";
import UserLog from "./UserLog";
import VendorLog from "./VendorLog";
import { useGetAccountUserQuery } from "@/api/apiSlice";
import { useState } from "react";
import Loader from "@/components/loader/Loader";
import PaginationComponent from "@/components/Pagination/TablePagination";
import { IoSearch } from "react-icons/io5";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";
import { ThemeContext } from "@/components/ThemeProvider";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Logs() {
  const [value, setValue] = React.useState(0);
  const [role, setRole] = useState("admin");
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]);

  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();

  const { theme } = React.useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  const { data, isLoading } = useGetAccountUserQuery({
    page: page + 1,
    limit,
    role,
    search: delayedSearch,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setRole(newValue === 0 ? "admin" : newValue === 1 ? "customer" : "vendor");
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] min-h-[calc(100vh-130px)] rounded-[20px]">
      <Box sx={{ width: "100%" }}>
        <div
          className={`p-5 border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div
            className={`flex items-center flex-wrap-reverse justify-between rounded-[10px] ${
              isDarkMode ? "bg-[#2A2A2A]" : "bg-white"
            }`}
          >
            <Box sx={{ maxWidth: "100%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="basic tabs example"
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "capitalize",
                    fontFamily: "tt_chocolates",
                    fontSize: "20px",
                    fontWeight: "500",
                    margin: "15px",
                    color: isDarkMode ? "#fff" : "#000",
                    "&.Mui-selected": {
                      color: "#3551B6",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#3551B6",
                    height: "5px",
                    borderRadius: "999px",
                  },
                }}
              >
                <Tab label="Admin" {...a11yProps(0)} />
                <Tab label="User" {...a11yProps(1)} />
                <Tab label="Vendor" {...a11yProps(2)} />
              </Tabs>
            </Box>
          </div>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap justify-end gap-4">
            <label className="w-full md:max-w-[450px]" htmlFor="search">
              <div className="flex items-center bg-white dark:bg-gray-800 p-3 border rounded-[10px]">
                <IoSearch />
                <input
                  className="w-full px-2 dark:bg-gray-800"
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search Keyword"
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </label>
          </div>
          <CustomTabPanel value={value} index={0}>
            <LogsTable data={data?.data} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <LogsTable data={data?.data} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <LogsTable data={data?.data} />
          </CustomTabPanel>
          <PaginationComponent
            currentPage={page}
            totalPages={data?.totalUsers}
            itemsPerPage={limit}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
          <Loader loading={isLoading} />
        </div>
      </Box>
    </div>
  );
}
