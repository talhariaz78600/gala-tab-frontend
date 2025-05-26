import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Link } from "react-router";
import { LiaFilterSolid } from "react-icons/lia";
import ConfirmBooking from "./TotalBooking/ConfirmBooking";
import DateRangePicker from "../../components/DatePicker/DateRangePicker";
import { useState } from "react";
import {
  useGetBookingListAdminQuery,
  useGetBookingsListVendorQuery,
} from "@/api/apiSlice";
import { format } from "date-fns";
import PaginationComponent from "@/components/Pagination/TablePagination";
import Loader from "@/components/loader/Loader";
import BasicSelect from "@/components/VendorDashboard/BasicSelect";
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
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
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

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.title,
});

const topFilter = [{ title: "" }];

const formatDate = (date) => {
  if (!date) return;
  return format(new Date(date), "yyyy-MM-dd");
};

const TotalBooking = ({ mode }) => {
  const [value, setValue] = React.useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [status, setStatus] = useState("booked");
  const { theme } = React.useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();

  const { data, isLoading } =
    mode === "admin"
      ? useGetBookingsListVendorQuery({
          page: page + 1,
          limit,
          serviceTypeId: selectedType,
          status,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          search: delayedSearch,
        })
      : useGetBookingListAdminQuery({
          page: page + 1,
          limit,
          serviceTypeId: selectedType,
          status,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          search: delayedSearch,
        });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setStatus("booked");
    } else if (newValue === 1) {
      setStatus("pending");
    } else if (newValue === 2) {
      setStatus("completed");
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
    <div>
      <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E] min-h-[calc(100dvh-130px)] rounded-[20px] p-5">
        <div className="">
          <div className="">
            <Box sx={{ width: "100%" }}>
              <div className="">
                <div className="p-3 border-b bg-white dark:bg-gray-800 rounded-lg">
                  <div className="flex xl:flex-row flex-col-reverse xl:items-center gap-4">
                    <div>
                      <h4 className="font-semibold text-xl ">
                        Booking Details
                      </h4>
                    </div>
                    <div>
                      <Box
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",
                          fontFamily: "tt_chocolates",
                        }}
                      >
                        <Tabs
                          sx={{ fontFamily: "tt_chocolates" }}
                          value={value}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                        >
                          <Tab
                            sx={{
                              fontFamily: "tt_chocolates",
                              textTransform: "Capitalize",
                              fontSize: "12px",
                            }}
                            label="Confirm Booking"
                            {...a11yProps(0)}
                          />
                          <Tab
                            sx={{
                              fontFamily: "tt_chocolates",
                              textTransform: "Capitalize",
                              fontSize: "12px",
                            }}
                            label="New Booking Request"
                            {...a11yProps(1)}
                          />
                          <Tab
                            sx={{
                              fontFamily: "tt_chocolates",
                              textTransform: "Capitalize",
                              fontSize: "12px",
                            }}
                            label="Complete Bookings"
                            {...a11yProps(2)}
                          />
                        </Tabs>
                      </Box>
                    </div>
                  </div>
                  <div className="flex flex-wrap-reverse items-center justify-end gap-4">
                    <div className="flex items-center gap-4">
                      <label
                        className="w-full md:min-w-[450px]"
                        htmlFor="search"
                      >
                        <div className="flex items-center bg-white dark:bg-gray-700 p-3 border rounded-[10px]">
                          <IoSearch />
                          <input
                            className="w-full px-2 dark:bg-gray-700"
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
                    <div className="mb-1">
                      <BasicSelect
                        onSelect={(selectedType) =>
                          setSelectedType(selectedType)
                        }
                      />
                    </div>
                    <div>
                      <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        setStartDate={setStartDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <CustomTabPanel value={value} index={0}>
                <ConfirmBooking data={data?.bookings} mode={mode} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <ConfirmBooking data={data?.bookings} mode={mode} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <ConfirmBooking data={data?.bookings} mode={mode} />
              </CustomTabPanel>
              <PaginationComponent
                currentPage={page}
                totalPages={data?.total}
                itemsPerPage={limit}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
              <Loader loading={isLoading} />
            </Box>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default TotalBooking;
