import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import ConfirmBooking from "./BookingDetailTab/ConfirmBooking";
import { Link } from "react-router";
import { LiaFilterSolid } from "react-icons/lia";
import BookingRequest from "./BookingDetailTab/BookingRequest";
import DateRangePicker from "../../components/DatePicker/DateRangePicker";
import BasicSelect from "@/components/VendorDashboard/BasicSelect";
import { useGetBookingListCustomerQuery } from "@/api/apiSlice";
import PaginationComponent from "@/components/Pagination/TablePagination";
import Loader from "@/components/loader/Loader";
import { format } from "date-fns";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

const formatDate = (date) => {
  if (!date) return;
  return format(new Date(date), "yyyy-MM-dd");
};

const BookingDetail = () => {
  const [value, setValue] = React.useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [status, setStatus] = useState("booked");

  const { data, isLoading } = useGetBookingListCustomerQuery({
    page: page + 1,
    limit,
    serviceTypeId: selectedType,
    status,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
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
      <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] rounded-lg p-2">
        <div className="">
          <div className="">
            <Box sx={{ width: "100%" }}>
              <div className="sm:p-3">
                <div className="p-3 border-b flex xl:flex-row flex-col justify-between xl:items-center bg-white dark:bg-gray-800 rounded-lg gap-4">
                  <div className="flex lg:flex-row flex-col lg:items-center gap-3">
                    <div>
                      <h4 className="font-semibold md:text-3xl sm:text-xl text-lg dark:text-white">
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
                            label="Booking Request"
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
                  <div className="flex md:flex-row flex-col items-center justify-end gap-3">
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
                <ConfirmBooking data={data?.bookings} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <ConfirmBooking data={data?.bookings} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <ConfirmBooking data={data?.bookings} />
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
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
