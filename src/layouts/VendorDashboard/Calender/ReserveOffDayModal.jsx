import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  useCalendarReserveMutation,
  useGetSelectServiceListQuery,
} from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import { toast } from "react-toastify";

const services = [
  { id: 1, name: "Service A" },
  { id: 2, name: "Service B" },
];

export default function ReserveOffDayModal({ open, onClose, type }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      start: null,
      end: null,
    },
  });

  const { data, isLoading } = useGetSelectServiceListQuery();

  const [reserveBooking, { isLoading: isReserveLoading }] =
    useCalendarReserveMutation();

  const isReserve = type === "reserve";
  const tomorrow = dayjs().add(1, "day");

  const onSubmit = async (data) => {
    if (dayjs(data.end).isBefore(dayjs(data.start))) {
      setError("end", {
        type: "manual",
        message: "End date cannot be before start date.",
      });
      return;
    }

    const payload = {
      ...data,
      type: isReserve ? "reserved" : "off",
    };

    try {
      const response = await reserveBooking(payload).unwrap();
      if (response.status === "success") {
        toast.success(`${isReserve ? "Reserved" : "Off"} successfully!`);
        onClose();
        reset();
      } else {
        toast.error(response.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "Failed to submit. Please try again."
      );
    }
  };

  const handleCancel = () => {
    onClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{isReserve ? "Reserve Day" : "Off Day"}</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent dividers className="space-y-4">
            <TextField
              fullWidth
              label="Title"
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <Controller
              name="start"
              control={control}
              rules={{ required: "Start time is required" }}
              render={({ field }) => (
                <DateTimePicker
                  label="Start"
                  value={field.value}
                  onChange={field.onChange}
                  minDate={tomorrow}
                  slotProps={{
                    textField: {
                      error: !!errors.start,
                      helperText: errors.start?.message,
                      InputLabelProps: { style: { color: "#000" } },
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#000" },
                          "&:hover fieldset": { borderColor: "#000" },
                          "&.Mui-focused fieldset": { borderColor: "#000" },
                        },
                        "& .MuiInputLabel-root": { color: "#000" },
                      },
                      fullWidth: true,
                    },
                  }}
                />
              )}
            />

            <Controller
              name="end"
              control={control}
              rules={{ required: "End time is required" }}
              render={({ field }) => (
                <DateTimePicker
                  label="End"
                  value={field.value}
                  onChange={field.onChange}
                  minDate={tomorrow}
                  slotProps={{
                    textField: {
                      error: !!errors.end,
                      helperText: errors.end?.message,
                      InputLabelProps: { style: { color: "#000" } },
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#000" },
                          "&:hover fieldset": { borderColor: "#000" },
                          "&.Mui-focused fieldset": { borderColor: "#000" },
                        },
                        "& .MuiInputLabel-root": { color: "#000" },
                      },
                      fullWidth: true,
                    },
                  }}
                />
              )}
            />

            {isReserve && (
              <TextField
                fullWidth
                select
                label="Service"
                defaultValue=""
                {...register("serviceId", { required: "Service is required" })}
                error={!!errors.serviceId}
                helperText={errors.serviceId?.message}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        overflowY: "auto",
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">Select a service</MenuItem>
                {data?.data?.map((service) => (
                  <MenuItem key={service._id} value={service._id}>
                    {service.title}
                  </MenuItem>
                ))}
              </TextField>
            )}

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Reason"
              {...register("reason", { required: "Reason is required" })}
              error={!!errors.reason}
              helperText={errors.reason?.message}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCancel} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
        <Loader loading={isLoading || isReserveLoading} />
      </LocalizationProvider>
    </Dialog>
  );
}
