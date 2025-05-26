import React, { useEffect, useState } from "react";
import CarateDark from "../../assets/img/CarateDark.png";
import { Link, useNavigate } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useGetDisputePropertiesQuery } from "@/api/apiSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function AddDispute() {
  const navigate = useNavigate();
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [allProperties, setAllProperties] = useState([]);
  const [propertiesPage, setPropertiesPage] = useState(1);
  const [propertiesCount, setPropertiesCount] = useState(0);

  const { data, isLoading, isSuccess, isError } =
    useGetDisputePropertiesQuery(propertiesPage);

  const fetchPropertiesData = () => {
    setPropertiesLoading(true);
    // The response from the RTK Query is automatically updated here when using the hook
    if (data) {
      setAllProperties((prev) => [...prev, ...data.data]);
      setPropertiesCount(data.totalCount);
      setPropertiesLoading(false);
      setPropertiesPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchPropertiesData();
  }, [data]);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (
      allProperties.length < propertiesCount &&
      scrollTop + clientHeight >= scrollHeight - 1
    ) {
      fetchPropertiesData();
    }
  };

  return (
    <form action="/user-dashboard/user-disputes">
      <div className="min-h-[calc(100dvh-130px)] flex flex-col bg-[#F7F7F7] rounded-[20px] p-5">
        <div>
          <div className="flex items-center gap-2">
            <div>
              <Link to="/user-dashboard/user-disputes">
                <IoMdArrowRoundBack className="bg-white text-black p-2 shadow-sm rounded-full text-4xl" />
              </Link>
            </div>
            <h4 className="text-[20px] leading-normal sm:text-[24px] font-semibold">
              Add Dispute
            </h4>
          </div>
          <div className="max-w-[1000px] mt-8">
            <FormControl className="px-0" fullWidth>
              <InputLabel id="property-select-label">
                Select Property
              </InputLabel>
              <Select
                className="rounded-4"
                name="property"
                label="Select Property"
                MenuProps={{
                  PaperProps: {
                    onScroll: handleScroll,
                    style: {
                      maxHeight: "200px",
                      overflowY: "auto",
                    },
                  },
                }}
              >
                {allProperties?.map((property) => (
                  <MenuItem key={property.id} value={property.id}>
                    {property.title}
                  </MenuItem>
                ))}
                {propertiesLoading && (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                )}
              </Select>
            </FormControl>
            <div className="mt-8">
              <label className="font-medium text-lg ps-3" htmlFor="message">
                Write a Message
              </label>
              <textarea
                className="block w-full resize-none p-4 focus:outline-none border-[0.3px] border-[#D5D5D5] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]"
                rows={10}
                name="message"
                id="message"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <div className="mt-16 flex flex-wrap justify-center sm:justify-start items-center gap-8">
            <button
              type="button"
              onClick={() => navigate("/user-dashboard/user-disputes")}
              className="py-3 px-4 font-medium min-w-[120px] border bg-[#E7E7E7] border-[#D5D5D5] rounded-full"
            >
              Cancel
            </button>
            <button className="py-3 px-4 font-medium min-w-[120px] border bg-black border-black text-white rounded-full shadow-[0px_10px_17px_0px_#FD636312}">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
