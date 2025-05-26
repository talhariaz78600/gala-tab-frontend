import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Reviewfilters from "../../components/adminDashboard/ReviewFilters";
import { Link } from "react-router";
import ReviewListTable from "../../components/adminDashboard/ReviewListTable";
import Inapropriate from "../../components/adminDashboard/Inapropriate";
import {
  useGetAccountUserQuery,
  useGetAllReviewsListQuery,
  useGetServiceTypeQuery,
} from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import { useState } from "react";
import PaginationComponent from "@/components/Pagination/TablePagination";
import { toast } from "react-toastify";
import CustomFilterDialog from "@/components/CustomFilters/CustomFiltersDialog";
import FilterButton from "@/components/CustomFilters/FilterButton";
import useFilters from "@/components/hooks/useFilter";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";
import { IoSearch } from "react-icons/io5";
import { ThemeContext } from "@/components/ThemeProvider";
import { useContext } from "react";

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

export default function ReviewList() {
  const [value, setValue] = React.useState(0);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [vendorPage, setVendorPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const {
    modalFilters,
    setModalFilters,
    selectedFilters,
    setSelectedFilters,
    handleFiltersApply,
  } = useFilters();
  const [open, setOpen] = useState(false);
  const [allVendors, setAllVendors] = useState([]);
  const [hasMoreVendors, setHasMoreVendors] = useState(true);

  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();

  const { data: serviceTypes, isLoading: serviceTypeLoading } =
    useGetServiceTypeQuery();
  const { data, isLoading } = useGetAllReviewsListQuery({
    page: page + 1,
    limit,
    reviewType: status || modalFilters["Review Type"],
    owners: modalFilters["Service Owners"],
    serviceCategories: modalFilters["Vendor Type"],
    ratings: modalFilters["Rating"],
    search: delayedSearch,
  });
  const { data: vendorData, isLoading: vendorLoading } = useGetAccountUserQuery(
    {
      page: vendorPage + 1,
      limit,
      role: "vendor",
    }
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setStatus(newValue === 0 ? "" : "negative");
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    if (vendorData?.data) {
      setAllVendors((prev) => {
        const newItems = vendorData.data.filter(
          (item) => !prev.some((v) => v._id === item._id)
        );
        return [...prev, ...newItems];
      });

      if (
        vendorData.data.length === 0 ||
        allVendors.length + vendorData.data.length >= vendorData.totalUsers
      ) {
        setHasMoreVendors(false);
      }
    }
  }, [vendorData]);

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E] min-h-[calc(100vh-130px)] rounded-[20px]">
      <Box sx={{ width: "100%" }}>
        <div className="p-5 border-b">
          <div className="flex items-center flex-wrap-reverse justify-between bg-white dark:bg-gray-800 rounded-[10px]">
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
                <Tab label="Review List" {...a11yProps(0)} />
                <Tab label="Reported Reviews" {...a11yProps(1)} />
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
            <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E]  rounded-[20px]">
              <div className="flex items-center flex-wrap gap-4 justify-between p-5 border-b">
                <p className="text-[28px] leading-normal font-semibold">
                  Review List
                </p>
                <div className="ms-auto">
                  <FilterButton
                    setOpen={setOpen}
                    selectedFilters={selectedFilters}
                    modalFilters={modalFilters}
                    setSelectedFilters={setSelectedFilters}
                    setModalFilters={setModalFilters}
                  />
                  <CustomFilterDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    onApply={handleFiltersApply}
                    filtersConfig={[
                      {
                        label: "Vendor Type",
                        data:
                          serviceTypes?.data?.map((item) => ({
                            label: item.name,
                            value: item._id,
                            ...item,
                          })) || [],
                        type: "checkbox",
                        search: true,
                      },
                      {
                        label: "Service Owners",
                        data:
                          allVendors?.map((item) => ({
                            label: item.fullName,
                            value: item._id,
                            ...item,
                          })) || [],
                        type: "checkbox",
                        search: true,
                        paginated: hasMoreVendors,
                        loadMore: () => {
                          if (hasMoreVendors && !vendorLoading) {
                            setVendorPage((prev) => prev + 1);
                          }
                        },
                        loading: vendorLoading,
                      },
                      {
                        label: "Review Type",
                        data: [
                          { label: "Positive", value: "positive" },
                          { label: "Negative", value: "negative" },
                        ],
                        type: "radio",
                      },
                      {
                        label: "Rating",
                        data: [
                          { label: "5", value: "5" },
                          { label: "4", value: "4" },
                          { label: "3", value: "3" },
                          { label: "2", value: "2" },
                          { label: "1", value: "1" },
                        ],
                        type: "checkbox",
                        search: true,
                      },
                    ]}
                    modalFilters={modalFilters}
                  />
                </div>
              </div>
              <div className="p-5">
                <ReviewListTable data={data?.reviews} />
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E]  rounded-[20px]">
              <div className="flex items-center flex-wrap gap-4 justify-between p-5 border-b">
                <p className="text-[28px] leading-normal font-semibold">
                  Reported Review List
                </p>
              </div>
              <div className="p-5">
                <ReviewListTable data={data?.reviews} />
              </div>
            </div>
          </CustomTabPanel>
          <PaginationComponent
            currentPage={page}
            totalPages={data?.totalReviews}
            itemsPerPage={limit}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </Box>
      <Loader loading={isLoading || serviceTypeLoading || vendorLoading} />
    </div>
  );
}
