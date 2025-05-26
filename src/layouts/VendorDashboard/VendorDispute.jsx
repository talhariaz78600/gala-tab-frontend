import * as React from "react";
import { Link } from "react-router";
import DisputeTable from "../../components/VendorDashboard/DisputeTable";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useGetDisputeListQuery } from "@/api/apiSlice";
import PaginationComponent from "@/components/Pagination/TablePagination";
import { useState } from "react";
import Loader from "@/components/loader/Loader";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";
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

export default function VendorDispute({ type }) {
  const [value, setValue] = React.useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [status, setStatus] = useState("");
  const { theme } = React.useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();

  const { data, isLoading } = useGetDisputeListQuery({
    page: page + 1,
    limit,
    search: delayedSearch,
    status,
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 0) {
      setStatus("");
    } else if (newValue === 1) {
      setStatus("Review");
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <Link
          to={
            type === "vendor"
              ? "/vendor-dashboard/add-dispute"
              : "/user-dashboard/add-dispute"
          }
          className="font-medium border border-black bg-white dark:bg-gray-800 py-3 px-5 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
        >
          Add Dispute
        </Link>
      </div>
      <div className="min-h-[calc(100dvh-200px)] mt-5 bg-[#F7F7F7] dark:bg-[#1e1e1e] rounded-[20px]">
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", padding: "20px" }}
          >
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
                backgroundColor: isDarkMode ? "#1E1E1E" : "#F7F7F7",
                border: "1px solid #E7E7E7",
                borderRadius: "10px",
                "& .MuiTab-root": {
                  textTransform: "capitalize",
                  fontFamily: "tt_chocolates",
                  margin: "12px",
                  fontSize: "20px",
                  color: isDarkMode ? "#F7F7F7" : "#1E1E1E",
                  fontWeight: "400",
                },
                "& .Mui-selected": {
                  color: "#3551B6",
                  fontWeight: "600",
                },
              }}
            >
              <Tab label="ALL" {...a11yProps(0)} />
              <Tab label="Under Review" {...a11yProps(1)} />
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
            <DisputeTable data={data?.data} type={type} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <DisputeTable data={data?.data} type={type} />
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
    </div>
  );
}
