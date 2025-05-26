// components/DateRangeModal.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";

const DateRangeModal = ({
  open,
  onClose,
  initialCheckIn,
  initialCheckOut,
  onSave,
}) => {
  const [localCheckIn, setLocalCheckIn] = useState(initialCheckIn);
  const [localCheckOut, setLocalCheckOut] = useState(initialCheckOut);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  useEffect(() => {
    if (open) {
      setLocalCheckIn(initialCheckIn);
      setLocalCheckOut(initialCheckOut);
    }
  }, [open, initialCheckIn, initialCheckOut]);

  const handleSave = () => {
    onSave(localCheckIn, localCheckOut);
    onClose();
  };
  const isInvalid =
    localCheckIn && localCheckOut && dayjs(localCheckIn).isSame(localCheckOut);

  const tomorrow = dayjs();

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.9)" } }}
      PaperProps={{ sx: { backgroundColor: "#fff", borderRadius: 2 } }}
      maxWidth="xs"
      fullWidth
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DialogTitle className="text-black font-semibold text-lg">
          Edit Dates
        </DialogTitle>
        <DialogContent dividers className="flex flex-col gap-4 bg-white">
          <DateTimePicker
            label="Check-in"
            value={localCheckIn}
            onChange={setLocalCheckIn}
            minDateTime={tomorrow}
            slotProps={{
              popper: {
                placement: "right-start",
                modifiers: [
                  {
                    name: "flip",
                    options: {
                      fallbackPlacements: ["left", "right", "bottom"],
                    },
                  },
                  {
                    name: "preventOverflow",
                    options: {
                      padding: 8,
                    },
                  },
                ],
                sx: {
                  "& .MuiPaper-root": {
                    transform: "scale(0.85)",
                    transformOrigin: "right top",
                  },
                },
              },
              desktopPaper: {
                sx: {
                  "& .MuiPickersLayout-root": {
                    width: "auto",
                    minWidth: "unset",
                  },
                },
              },
              textField: {
                InputLabelProps: { style: { color: "#000" } },
                sx: {
                  "& .MuiOutlinedInput-root": {
                    color: "black",
                    "& fieldset": { borderColor: "#000" },
                    "&:hover fieldset": { borderColor: "#000" },
                    "&.Mui-focused fieldset": { borderColor: "#000" },
                  },
                  "& .MuiInputLabel-root": { color: "#000" },
                  "& .MuiInputAdornment-root svg": {
                    color: "#000", // icon color black
                  },
                  "& .MuiIconButton-root": {
                    color: "#000", // icon button color black
                  },
                },
              },
            }}
          />
          <DateTimePicker
            label="Check-out"
            value={localCheckOut}
            onChange={setLocalCheckOut}
            minDateTime={
              localCheckIn && localCheckIn > tomorrow ? localCheckIn : tomorrow
            }
            slotProps={{
              popper: {
                placement: "right-start",
                modifiers: [
                  {
                    name: "flip",
                    options: {
                      fallbackPlacements: ["left", "right", "bottom"],
                    },
                  },
                  {
                    name: "preventOverflow",
                    options: {
                      padding: 8,
                    },
                  },
                ],
                sx: {
                  "& .MuiPaper-root": {
                    transform: "scale(0.85)",
                    transformOrigin: "right top",
                  },
                },
              },
              desktopPaper: {
                sx: {
                  "& .MuiPickersLayout-root": {
                    width: "auto",
                    minWidth: "unset",
                  },
                },
              },
              textField: {
                error: isInvalid,
                helperText: isInvalid
                  ? "Check-out cannot be the same as Check-in."
                  : "",
                InputLabelProps: { style: { color: "#000" } },
                sx: {
                  color: "black",
                  "& .MuiOutlinedInput-root": {
                    color: "black",
                    "& fieldset": { borderColor: "#000" },
                    "&:hover fieldset": { borderColor: "#000" },
                    "&.Mui-focused fieldset": { borderColor: "#000" },
                  },
                  "& .MuiInputLabel-root": { color: "#000" },
                  "& .MuiInputAdornment-root svg": {
                    color: "#000", // icon color black
                  },
                  "& .MuiIconButton-root": {
                    color: "#000", // icon button color black
                  },
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions className="bg-white px-6 pb-4">
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ borderColor: "#000", color: "#000" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isInvalid}
            variant="contained"
            sx={{
              backgroundColor: isDark ? "#fff" : "#000",
              color: isDark ? "#000" : "#fff",
              "&:hover": {
                backgroundColor: isDark ? "#e0e0e0" : "#111",
              },
              "&.Mui-disabled": {
                backgroundColor: isDark ? "#444" : "#ccc",
                color: isDark ? "#888" : "#666",
              },
              textTransform: "none",
              boxShadow: "none",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </LocalizationProvider>
    </Dialog>
  );
};

export default DateRangeModal;
