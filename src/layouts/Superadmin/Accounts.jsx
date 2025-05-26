import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AccountTable from "../../components/adminDashboard/AccountTable";
import { Modal } from "@mui/material";
import PricingModal from "../../components/adminDashboard/PricingModal";
import MessageModal from "../../components/adminDashboard/MessageModal";
import PaginationComponent from "@/components/Pagination/TablePagination";
import { useState } from "react";
import { useGetAccountUserQuery } from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
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

export default function Accounts() {
  const [value, setValue] = React.useState(0);
  const [role, setRole] = useState("vendor");
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [selectedIds, setSelectedIds] = useState([]);
  const { theme } = React.useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();

  const { data, isLoading } = useGetAccountUserQuery({
    page: page + 1,
    limit,
    role,
    search: delayedSearch,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setRole(newValue === 0 ? "vendor" : "customer");
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

            <div className="flex items-center justify-end flex-wrap-reverse gap-4">
              <button
                onClick={handleOpen}
                className="p-3 border border-black bg-black text-white font-medium rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
              >
                Send Mail With Text
              </button>
            </div>
          </div>
        </div>
        <CustomTabPanel value={value} index={0}>
          <AccountTable
            data={data?.data}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AccountTable
            data={data?.data}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </CustomTabPanel>
        <PaginationComponent
          currentPage={page}
          totalPages={data?.totalUsers}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </Box>
      <Loader loading={isLoading} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] bg-white rounded-[20px]">
          <MessageModal
            handleClose={handleClose}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </div>
      </Modal>
    </div>
  );
}
