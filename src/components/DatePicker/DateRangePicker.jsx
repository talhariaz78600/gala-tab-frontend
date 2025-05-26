import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Range from "../../assets/img/DateRange.png";
import { IoCaretDownCircleOutline } from "react-icons/io5";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

const formatDateDisplay = (date) => {
  return date?.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

const formatDate = (date) => {
  return date?.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default function DateRangePicker({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selecting, setSelecting] = useState("start");
  const [showCalendar, setShowCalendar] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const isInRange = (day) => {
    const date = new Date(year, month, day);
    return date >= startDate && date <= endDate;
  };

  const isStartOrEnd = (day) => {
    const date = new Date(year, month, day);
    return (
      date?.getTime() === startDate?.getTime() ||
      date?.getTime() === endDate?.getTime()
    );
  };

  const handleDateClick = (day) => {
    const selectedDate = new Date(year, month, day);
    if (selecting === "start") {
      setStartDate(selectedDate);
      setSelecting("end");
    } else {
      if (selectedDate < startDate) {
        setStartDate(selectedDate);
        setEndDate(startDate);
      } else {
        setEndDate(selectedDate);
      }
      setSelecting("start");
    }
  };

  return (
    <div className="relative">
      <div
        className="flex items-center px-1 w-full rounded-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 cursor-pointer"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <div className="bg-lightblue p-2 rounded-sm ">
          <img
            src={Range}
            alt="calendar"
            className="h-7 w-7 max-w-7 object-contain invert dark:invert-0"
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="font-semibold text-gray-800 dark:text-white lg:text-lg text-xs">
            {formatDate(startDate)} -{" "}
            {formatDate(endDate) || "Select Date Range"}
          </span>
          <IoCaretDownCircleOutline className="text-black dark:text-white text-xl ml-3" />
        </div>
      </div>

      {showCalendar && (
        <div className="absolute w-full mt-2 rounded-lg shadow-lg z-20 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600">
          <div className="p-3">
            <div className="flex justify-between items-center mb-4">
              <button onClick={prevMonth} className="text-gray-700 p-0">
                <FaChevronLeft size={16} />
              </button>
              <h6 className="text-sm font-normal mb-0 text-gray-800 dark:text-white">
                {currentDate?.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h6>

              <button onClick={nextMonth} className="text-gray-700 p-0">
                <FaChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-7 text-center mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="h-10"></div>
              ))}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const inRange = isInRange(day);
                const isStartOrEndDay = isStartOrEnd(day);
                return (
                  <div key={day} className="flex justify-center items-center">
                    <div
                      className={`h-8 w-8 flex justify-center items-center rounded-full cursor-pointer 
    ${inRange ? "bg-blue-100 dark:bg-blue-800 text-black dark:text-white" : ""}
    ${
      isStartOrEndDay
        ? "bg-blue-500 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`}
                      onClick={() => handleDateClick(day)}
                    >
                      {day}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
