import React from "react";
import { Link } from "react-router";
import { FaPlus } from "react-icons/fa6";
import Del from "../../assets/img/del.png";
import Edit from "../../assets/img/edit.png";
import GoCal from "../../assets/img/go-cal.png";
import List from "../../assets/img/list-detail2.png";
import DateRangePicker from "../../components/DatePicker/DateRangePicker";
import BookingService from "./BookingService";
import ServiceQuickFilter from "../../components/adminDashboard/ServiceQuickFilter";
import DeletePopup from "../../components/DeletePopup";

const ServiceManagement = () => {
  const columns = [
    { Header: "Service Name" },
    { Header: "Vendor Type" },
    { Header: "Total Cost" },
    { Header: "Total Booking" },
    { Header: "Status" },
    { Header: "Action" },
  ];

  const AllUsersData = [
    {
      ServiceName: "Decoration wedding",
      Image: List,
      VendorType: "Decorations",
      TotalCost: "$:300",
      TotalBooking: "10 / this month",
      status: "Booked",
    },
  ];
  return (
    <div>
      <div className="bg-[#F7F7F7] min-h-[calc(100dvh-130px)] rounded-[20px]">
        <div className="border-b p-5 flex xl:flex-row flex-col xl:items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <h4 className="text-3xl font-medium">Services Listings</h4>
            </div>
            <div className="ms-auto flex items-center gap-4">
              <div>
                <ServiceQuickFilter />
              </div>
              <div className="xl:hidden">
                <Link to="/admin-dashboard/new-service">
                  <FaPlus className="border rounded-full bg-white p-3 text-5xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-4">
            <div className="hidden xl:block">
              <Link to="/admin-dashboard/new-service">
                <FaPlus className="border rounded-full bg-white p-3 text-5xl" />
              </Link>
            </div>
            <div>
              <DateRangePicker />
            </div>
            <div>
              <BookingService />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto p-5">
          <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th
                    className="bg-black text-white text-left px-4 py-5 text-lg first:rounded-s-[10px] last:rounded-e-[10px] font-medium"
                    key={index}
                  >
                    {col.Header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-medium">
              {AllUsersData.map((row, index) => (
                <tr key={index}>
                  <td className="p-4 bg-white rounded-s-[10px]">
                    <div className="flex gap-2 items-center">
                      <img
                        className="w-[180px] max-w-[180px] aspect-[2/1] rounded-[10px] object-cover"
                        src={row.Image}
                        alt=""
                      />
                      <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                        {row.ServiceName}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 bg-white ">{row.VendorType}</td>
                  <td className="p-4 bg-white ">{row.TotalCost}</td>
                  <td className="p-4 bg-white ">{row.TotalBooking}</td>
                  <td className="p-4 bg-white">
                    <p className="p-4 bg-white text-[#34A853]">{row.status}</p>
                  </td>
                  <td className="p-4 bg-white rounded-e-[10px]">
                    <div className="flex items-center gap-3 justify-center">
                      <Link
                        to="/admin-dashboard/calendar"
                        className="bg-[#E5E5E5] p-3 rounded-lg"
                      >
                        <img
                          src={GoCal}
                          alt=""
                          className="w-5 h-5 max-w-[20px] object-contain"
                        />
                      </Link>
                      <Link
                        to="/admin-dashboard/service-detail"
                        className="bg-[#E5E5E5] p-3 rounded-lg"
                      >
                        <img
                          src={Edit}
                          alt=""
                          className="w-5 h-5 max-w-[20px] object-contain"
                        />
                      </Link>
                      <DeletePopup/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;
