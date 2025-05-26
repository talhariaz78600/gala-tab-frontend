import React, { useEffect, useState } from "react";
import CarateDark from "../../assets/img/CarateDark.png";
import { Link, useLocation, useNavigate } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  useAddDisputeMutation,
  useLazyGetBookingListCustomerQuery,
  useLazyGetBookingsListVendorQuery,
  useLazyGetDisputePropertiesQuery,
  useUpdateDisputeMutation,
} from "@/api/apiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "@/components/loader/Loader";

export default function VendorAddDispute({ mode = "new" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const { data: disputedata } = location.state || {};

  const [allProperties, setAllProperties] = useState([]);
  const [propertiesPage, setPropertiesPage] = useState(1);
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [formData, setFormData] = useState({
    property: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    property: false,
    description: false,
  });

  const [trigger, { data, isFetching }] =
    user.role === "customer"
      ? useLazyGetBookingListCustomerQuery({
          status: "completed",
        })
      : useLazyGetBookingsListVendorQuery({
          status: "completed",
        });

  const [addDispute, { isLoading: isLoadingDispute }] = useAddDisputeMutation();
  const [updateDispute, { isLoading: isLoadingUpdate }] =
    useUpdateDisputeMutation();

  const fetchPropertiesData = async () => {
    if (propertiesLoading) return;

    setPropertiesLoading(true);
    const response = await trigger({
      page: propertiesPage,
      limit: 10,
      status: "completed",
    });

    if (response?.data) {
      const newData = response.data.bookings;

      // Deduplicate based on property.id
      setAllProperties((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const filteredNew = newData?.filter(
          (item) => !existingIds.has(item.id)
        );
        return [...prev, ...filteredNew];
      });

      setPropertiesCount(response.data.totalCount);
      setPropertiesPage(propertiesPage + 1);
    }

    setPropertiesLoading(false);
  };

  useEffect(() => {
    fetchPropertiesData();
  }, []);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 1;

    if (
      isNearBottom &&
      !propertiesLoading &&
      allProperties.length < propertiesCount
    ) {
      fetchPropertiesData();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { property, description } = formData;

    let isValid = true;
    let newErrors = { property: false, description: false };

    if (!property) {
      newErrors.property = true;
      isValid = false;
    }
    if (!description || description.length < 10) {
      newErrors.description = true;
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log({
        description,
        property,
      });

      try {
        const response =
          mode === "edit"
            ? await updateDispute({
                id: disputedata._id,
                data: { description, property },
              })
            : await addDispute({
                description,
                property,
              });

        if (response.data.status === "success") {
          toast.success(
            `Dispute ${mode === "edit" ? "updated" : "submitted"} successfully!`
          );
          setFormData({
            property: "",
            description: "",
          });
          navigate(-1);
        } else {
          toast.error("Failed to submit dispute. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting dispute:", error);
        toast.error("An error occurred. Please try again later.");
      }
    } else {
      console.error("Form validation failed.");
    }
  };

  useEffect(() => {
    if (disputedata) {
      setFormData({
        property: disputedata.booking?._id || disputedata.booking?.id || "",
        description: disputedata.description || "",
      });
    }
  }, [disputedata]);

  return (
    <>
      <div className="min-h-[calc(100dvh-130px)] flex flex-col bg-[#F7F7F7] dark:bg-[#1e1e1e] rounded-[20px] p-5">
        <div>
          <div className="flex items-center gap-2">
            <div>
              <Link to={-1}>
                <IoMdArrowRoundBack className="bg-white text-black p-2 shadow-sm rounded-full text-4xl" />
              </Link>
            </div>
            <h4 className="text-[20px] leading-normal sm:text-[24px] font-semibold">
              {mode === "new" ? "Add" : "Edit"} Dispute
            </h4>
          </div>

          <div className="max-w-[1000px] mt-8">
            <div>
              <label className="font-medium text-lg ps-3" htmlFor="property">
                Select Booking
              </label>

              <FormControl className="px-0" fullWidth>
                <Select
                  className="rounded-8"
                  name="property"
                  value={formData.property}
                  onChange={handleChange}
                  MenuProps={{
                    PaperProps: {
                      onScroll: handleScroll,
                      style: {
                        maxHeight: "200px",
                        overflowY: "auto",
                      },
                    },
                  }}
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "12px",
                    "& .MuiSelect-icon": {
                      color: "black",
                    },
                  }}
                >
                  {allProperties.length === 0 ? (
                    <MenuItem disabled>No bookings yet</MenuItem>
                  ) : (
                    allProperties.map((property) => (
                      <MenuItem key={property.id} value={property._id}>
                        {property?.service?.title} -{" "}
                        {property?.checkIn &&
                          new Date(property.checkIn).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                      </MenuItem>
                    ))
                  )}

                  {propertiesLoading && (
                    <MenuItem disabled>
                      <CircularProgress size={24} />
                    </MenuItem>
                  )}
                </Select>

                {errors.property && (
                  <p className="text-red-500 text-sm">Property is required</p>
                )}
              </FormControl>
            </div>

            <div className="mt-8">
              <label className="font-medium text-lg ps-3" htmlFor="message">
                Write a Message
              </label>
              <textarea
                className="block w-full resize-none p-4 focus:outline-none text-black border-[0.3px] border-[#D5D5D5] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]"
                rows={10}
                name="description"
                id="message"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">
                  Description must be at least 10 characters
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="mt-16 flex flex-wrap justify-center sm:justify-start items-center gap-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="py-3 px-4 font-medium min-w-[120px] border text-black bg-[#E7E7E7] border-[#D5D5D5] rounded-full"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="py-3 px-4 font-medium min-w-[120px] border bg-black border-black text-white rounded-full shadow-[0px_10px_17px_0px_#FD636312]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <Loader loading={isLoadingDispute || isLoadingUpdate} />
    </>
  );
}
