import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FiSun, FiMoon, FiPlus, FiCalendar, FiX, FiLock } from "react-icons/fi";
import {
  useCalenderModeUpdateMutation,
  useDeleteCalenderBookingMutation,
  useGetCalenderBookingsListQuery,
} from "@/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "@/store/authSlice";
import ReserveOffDayModal from "./ReserveOffDayModal";
import Loader from "@/components/loader/Loader";
import dayjs from "dayjs";
import { RiDeleteBinLine } from "react-icons/ri";
import DeletePopup from "@/components/DeletePopup";

moment.updateLocale("en", {
  week: {
    dow: 0,
  },
});

const localizer = momentLocalizer(moment);

const BookingCalendar = ({ date }) => {
  const user = useSelector((state) => state.auth.user);
  const [modalType, setModalType] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [visibleDate, setVisibleDate] = React.useState(
    date ? new Date(date) : new Date()
  );

  const { data, isLoading: isCalenderLoading } =
    useGetCalenderBookingsListQuery({ filterdate: visibleDate });

  const [deleteCalenderBooking, { isLoading: isDeleteLoading }] =
    useDeleteCalenderBookingMutation();

  const events = data?.alldata || [];

  const handleClose = () => setModalType(null);

  const dispatch = useDispatch();

  const [sleepMode, setSleepMode] = useState(false);

  const [updateCalenderMode, { isLoading }] = useCalenderModeUpdateMutation();

  const eventStyleGetter = (event) => {
    const baseStyle = {
      borderRadius: "12px",
      margin: "2px 0",
      border: "none",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      padding: "0",
      color: "white",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.2s ease",
      opacity: sleepMode ? 0.7 : 1,
      height: "auto",
      minHeight: "60px",
      overflow: "hidden",
    };

    switch (event.type) {
      case "booking":
        return {
          style: {
            ...baseStyle,
            backgroundColor: event.status === "booked" ? "#373738" : "#ff9e00",
            borderLeft: `4px solid ${
              event.status === "booked" ? "#000" : "#cc7e00"
            }`,
          },
        };
      case "reserved":
        return {
          style: {
            ...baseStyle,
            backgroundColor: "#4a5568",
            borderLeft: "4px solid #2d3748",
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 100%)",
          },
        };
      case "off":
        return {
          style: {
            ...baseStyle,
            backgroundColor: "#c53030",
            borderLeft: "4px solid #9b2c2c",
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
          },
        };
      default:
        return { style: baseStyle };
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCalenderBooking(deleteOpen);
      toast.success("Deleted successfully!");
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Please try again.");
    }
  };

  const CustomEvent = ({ event }) => {
    return (
      <div className="h-full ">
        {event.type === "booking" ? (
          <div className="flex flex-col h-full p-2">
            <div className="flex items-center justify-between">
              {/* Booking Detail */}
              <div className="flex items-center mb-2">
                {(() => {
                  const coverMedia = event?.serviceimg?.find((m) => m.cover);
                  if (!coverMedia) return null;

                  return coverMedia.type === "video" ? (
                    <video
                      src={coverMedia.url || "/video-default.png"}
                      className="w-10 h-10 rounded-sm mr-2 border-2 object-cover border-white"
                      controls={false}
                    />
                  ) : (
                    <img
                      src={coverMedia.url || "/video-default.png"}
                      alt="Cover"
                      className="w-10 h-10 rounded-sm mr-2 border-2 object-cover border-white"
                    />
                  );
                })()}

                <div>
                  <p className="font-semibold text-sm truncate">
                    {event.servicename}
                  </p>
                  <p className="text-xs opacity-80">$ {event.totalPrice}</p>
                </div>
              </div>
              {/* User Detail */}
              <div className="flex items-center mb-2">
                <img
                  src={event?.userPhoto || "/default-image.jpg"}
                  alt={event.userName}
                  className="w-8 h-8 rounded-full mr-2 border-2 border-white"
                />
                <div>
                  <p className="font-semibold text-sm truncate">
                    {event.userName}
                  </p>
                  <p className="text-xs opacity-80">{event.email}</p>
                </div>
              </div>
            </div>
            <div className="mt-auto text-xs flex justify-between items-center">
              <span>
                {moment(event.start).format("MMM D, YYYY h:mm A")} -{" "}
                {moment(event.end).format("MMM D, YYYY h:mm A")}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  event.status === "booked" ? "bg-[#18843d]" : "bg-orange-700"
                }`}
              >
                {event.status}
              </span>
            </div>
          </div>
        ) : event.type === "reserved" ? (
          <div className="flex flex-col h-full p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2">
                <div className="bg-white bg-opacity-20 p-1.5 rounded-lg">
                  <FiLock className="text-white" size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{event.title}</p>
                  <p className=" text-xs">{event.servicename}</p>
                </div>
              </div>
              {event.serviceimg?.find((img) => img.cover)?.url && (
                <div className="flex items-center mt-1 gap-2">
                  {(() => {
                    const coverMedia = event?.serviceimg?.find((m) => m.cover);
                    if (!coverMedia || !coverMedia.url) return null;

                    return (
                      <div className="flex items-center mt-1 gap-2">
                        {coverMedia.type === "video" ? (
                          <video
                            src={coverMedia.url}
                            className="w-6 h-6 rounded-sm border border-white border-opacity-30 object-cover"
                            controls={false}
                            muted
                          />
                        ) : (
                          <img
                            src={coverMedia.url}
                            alt="Service"
                            className="w-6 h-6 rounded-sm border border-white border-opacity-30 object-cover"
                          />
                        )}
                        <span className="text-xs opacity-90">
                          Service Reserved
                        </span>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            <p className="text-xs opacity-80 mt-2 line-clamp-2">
              {event.reason}
            </p>
            <div className="flex items-center justify-between">
              <div className="mt-auto pt-2 text-xs opacity-90">
                {moment(event.start).format("MMM D, YYYY h:mm A")} -{" "}
                {moment(event.end).format("MMM D, YYYY h:mm A")}
              </div>
              <div onClick={() => setDeleteOpen(event._id)} className=" p-1">
                <RiDeleteBinLine className="text-white" size={16} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full p-2">
            <div className="flex   justify-between">
              <div className="flex items-start gap-2">
                <div className="bg-white bg-opacity-20 p-1.5 rounded-lg">
                  <FiX className="text-white" size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{event.title}</p>
                  <div className="flex items-center mt-1 gap-2">
                    <FiCalendar className="opacity-70" size={14} />
                    <span className="text-xs opacity-90">Day Off</span>
                  </div>
                </div>
              </div>

              <div onClick={() => setDeleteOpen(event._id)} className=" p-1">
                <RiDeleteBinLine className="text-white" size={16} />
              </div>
            </div>
            <p className="text-xs opacity-80 mt-2 line-clamp-2">
              {event.reason}
            </p>
            <div className="mt-auto pt-2 text-xs opacity-90">
              {moment(event.start).format("MMM D, YYYY h:mm A")} -{" "}
              {moment(event.end).format("MMM D, YYYY h:mm A")}
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleToggle = async () => {
    try {
      const newMode = !sleepMode;
      setSleepMode(newMode);

      const response = await updateCalenderMode({
        SleepMode: newMode,
      }).unwrap();

      if (response?.status === "success") {
        dispatch(updateUser({ ...user, SleepMode: newMode }));
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to update calendar mode.";
      toast.error(errorMessage);
    }
  };

  const handleNavigate = (date) => {
    const newMonth = dayjs(date).startOf("month");

    setVisibleDate(newMonth.format("YYYY-MM-DD"));
  };

  const normalizedEvents = events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  useEffect(() => {
    setSleepMode(user?.SleepMode);
  }, [user]);

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <ReserveOffDayModal
        open={!!modalType}
        type={modalType}
        onClose={handleClose}
      />
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Calendar
            </h2>
            <p className="text-gray-600 dark:text-white mt-1">
              Manage your reservations and availability
            </p>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {!sleepMode && (
              <>
                <button
                  onClick={() => setModalType("reserve")}
                  className="flex items-center bg-black text-white px-4 py-2 rounded-lg  transition-all shadow-sm"
                >
                  <FiPlus className="mr-2" />
                  Reserve Day
                </button>

                <button
                  onClick={() => setModalType("off")}
                  className="flex items-center bg-black text-white px-4 py-2 rounded-lg  transition-all shadow-sm"
                >
                  <FiPlus className="mr-2" />
                  Off Days
                </button>
              </>
            )}

            <label className="flex items-center justify-between w-48 px-4 py-2 bg-white border border-gray-300 rounded-2xl shadow hover:bg-gray-50 transition-all cursor-pointer">
              <div className="flex items-center space-x-2">
                {sleepMode ? (
                  <FiMoon className="text-black" />
                ) : (
                  <FiSun className="text-yellow-500" />
                )}
                <span className="text-sm font-medium text-gray-800">
                  Sleep Mode
                </span>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={sleepMode}
                  onChange={handleToggle}
                />
                <div
                  className={`w-10 h-5 rounded-full transition-colors ${
                    sleepMode ? "bg-black" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 transform ${
                    sleepMode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>
        </div>

        {/* Event Type Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-black mr-2"></div>
              <h3 className="font-medium text-gray-900">Bookings</h3>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Confirmed and pending customer reservations
            </p>
            <div className="flex mt-3">
              <div className="px-2 py-1 bg-[#373738] text-white text-xs rounded mr-2">
                Confirmed
              </div>
              <div className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                Pending
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
              <h3 className="font-medium text-gray-900">Reserved</h3>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Blocked days for Special bookings or other reasons
            </p>
            <div className="mt-3">
              <div className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded inline-block">
                Special Booking
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <h3 className="font-medium text-gray-900">Off Days</h3>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Holidays or days when service is not available
            </p>
            <div className="mt-3">
              <div className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded inline-block">
                Public holiday
              </div>
            </div>
          </div>
        </div>

        <div
          className={`rounded-xl overflow-hidden shadow-lg bg-white p-4 transition-all duration-300 ${
            sleepMode ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          <Calendar
            localizer={localizer}
            events={normalizedEvents}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter}
            components={{
              event: CustomEvent,
            }}
            defaultView="month"
            views={["month", "week", "day"]}
            showAllEvents={true}
            onNavigate={handleNavigate}
            date={visibleDate}
          />
        </div>
      </div>

      <DeletePopup
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />

      <Loader loading={isLoading || isCalenderLoading || isDeleteLoading} />
    </div>
  );
};

export default BookingCalendar;
