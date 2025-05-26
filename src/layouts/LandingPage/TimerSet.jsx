import React, { useContext, useEffect } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { ThemeContext } from "@/components/ThemeProvider";

const TimerSet = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [checkInTime, setCheckInTime] = React.useState("");
  const [checkOutTime, setCheckOutTime] = React.useState("");
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Send data to parent only if something is selected
  useEffect(() => {
    onChange({
      date: selectedDate ? selectedDate.format("YYYY-MM-DD") : "",
      checkInTime,
      checkOutTime,
    });
  }, [selectedDate, checkInTime, checkOutTime, onChange]);

  return (
    <div className="bg-white p-1 min-[380px]:p-3 shadow-xl border my-3 rounded-xl">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="overflow-auto">
            <DateCalendar
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              sx={{
                backgroundColor: isDark ? "#1f2937" : "#fff",
                color: isDark ? "#E5E7EB" : "#1F2937",
                borderRadius: "12px",
                boxShadow: isDark ? "0 0 0 1px #374151" : "0 0 0 1px #E5E7EB",
                "& .MuiPickersDay-root": {
                  color: isDark ? "#E5E7EB" : "#1F2937",
                },
                "& .MuiPickersDay-root.Mui-selected": {
                  backgroundColor: isDark ? "#2563EB" : "#1976d2",
                  color: "#fff",
                },
                "& .MuiPickersDay-root:hover": {
                  backgroundColor: isDark ? "#374151" : "#E0E0E0",
                },
                "& .MuiPickersCalendarHeader-root": {
                  backgroundColor: isDark ? "#111827" : "#f9f9f9",
                },
                "& .MuiTypography-root": {
                  color: isDark ? "#F9FAFB" : "#1F2937",
                },
              }}
            />
          </div>

          <div className="lg:col-start-2 lg:col-end-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold mb-2 text-black">
                  Select Check In Time
                </h5>
                <input
                  type="time"
                  value={checkInTime}
                  onChange={(e) => setCheckInTime(e.target.value)}
                  className="border text-black rounded-md px-3 py-2"
                />
              </div>
              <div>
                <h5 className="font-semibold mb-2 text-black">
                  Select Check Out Time
                </h5>
                <input
                  type="time"
                  value={checkOutTime}
                  onChange={(e) => setCheckOutTime(e.target.value)}
                  className="border text-black rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default TimerSet;
