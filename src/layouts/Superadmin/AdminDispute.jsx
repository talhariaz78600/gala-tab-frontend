import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UserDisputeTable from "../../components/adminDashboard/UserDisputeTable";
import VendorDisputeTable from "../../components/adminDashboard/VendorDisputeTable";
import { useGetAdminDisputeListQuery } from "@/api/apiSlice";
import { useState } from "react";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";
import PaginationComponent from "@/components/Pagination/TablePagination";
import Loader from "@/components/loader/Loader";
import { IoSearch } from "react-icons/io5";
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
      {value === index && <Box sx={{ padding: "20px" }}>{children}</Box>}
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

export default function AdminDispute() {
  const [value, setValue] = React.useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [role, setRole] = useState("vendor");
  const { theme } = React.useContext(ThemeContext);
  const isDarkMode = theme === "dark";
  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();
  const { data, isLoading } = useGetAdminDisputeListQuery({
    page: page + 1,
    limit,
    userRole: role,
    search: delayedSearch,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setRole("vendor");
    } else if (newValue === 1) {
      setRole("customer");
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="min-h-[calc(100dvh-130px)] bg-[#F7F7F7] dark:bg-[#1E1E1E] rounded-[20px]">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", padding: "20px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              sx: {
                backgroundColor: "#3551B6",
                height: "5px",
                borderRadius: "99px",
              },
            }}
            sx={{
              backgroundColor: isDarkMode ? "#2A2A2A" : "#ffffff",
              border: "1px solid #E7E7E7",
              borderRadius: "10px",
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
            <Tab label="Vendors" {...a11yProps(0)} />
            <Tab label="Users" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <div className="p-[20px]">
          <div className="flex flex-wrap justify-end gap-4">
            <label className="w-full md:max-w-[450px]" htmlFor="search">
              <div className="flex items-center bg-white dark:bg-gray-800 p-3 border rounded-[10px]">
                <IoSearch />
                <input
                  className="w-full px-2 dark:bg-gray-800"
                  type="search"
                  name="search"
                  id="search"
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </label>
          </div>
        </div>
        <CustomTabPanel value={value} index={0}>
          <VendorDisputeTable data={data?.data} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <VendorDisputeTable data={data?.data} />
        </CustomTabPanel>

        <PaginationComponent
          currentPage={page}
          totalPages={data?.totalDisputes}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
        <Loader loading={isLoading} />
      </Box>
    </div>
  );
}
