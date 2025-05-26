import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { useTopicCreateMutation, useTopicUpdateMutation } from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import { toast } from "react-toastify";

const AddTopicModal = ({ open, onClose, data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({ defaultValues: data || {} });

  const [topicCreate, { isLoading: topicCreateLoading }] =
    useTopicCreateMutation();

  const [topicUpdate, { isLoading: topicUpdateLoading }] =
    useTopicUpdateMutation();

  const handleFormSubmit = async (data) => {
    try {
      const response = data?._id
        ? await topicUpdate({ id: data?._id, data }).unwrap()
        : await topicCreate(data).unwrap();

      if (response?.status === "success") {
        toast.success(`Topic ${data?._id ? "updated" : "added"} successfully!`);
        reset();
        onClose();
      } else {
        toast.error(
          response?.message || "Something went wrong while adding the topic."
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.data?.error && typeof error.data.error === "object") {
        Object.entries(error.data.error).forEach(([field, message]) => {
          if (field !== "Error" && field !== "MongoServerError") {
            setError(field, { type: "manual", message });
          }
        });
      }

      const errorMessage =
        error.data?.message ||
        error.data?.error?.Error ||
        error.error ||
        " Failed. Please try again.";

      setError("root", { type: "manual", message: errorMessage });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <div className="flex justify-between items-center px-6 pt-5">
        <DialogTitle className="p-0 font-semibold text-xl text-gray-800 dark:text-white">
          {data?._id ? "Update" : "Add"} Topic
        </DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon className="text-gray-500 hover:text-gray-700" />
        </IconButton>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent dividers className="space-y-4 px-6 py-4">
          {/* Topic Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Topic Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-gray-300 rounded-xl px-4 text-black py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter topic name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Topic Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700  dark:text-white mb-1">
              Topic Type
            </label>
            <select
              {...register("topicType", { required: "Topic type is required" })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
              defaultValue=""
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
              <option value="other">Other</option>
            </select>
            {errors.topicType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.topicType.message}
              </p>
            )}
          </div>
        </DialogContent>

        <DialogActions className="px-6 pb-4">
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              color: "#000",
              border: "1px solid #000",
              textTransform: "capitalize",
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              textTransform: "capitalize",
            }}
          >
            {data?._id ? "Update" : "Add"} Topic
          </Button>
        </DialogActions>
      </form>

      <Loader loading={topicCreateLoading || topicUpdateLoading} />
    </Dialog>
  );
};

export default AddTopicModal;
