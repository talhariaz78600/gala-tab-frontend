import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  useSubTopicCreateMutation,
  useSubTopicUpdateMutation,
} from "@/api/apiSlice";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";

const AddSubTopicModal = ({ open, onClose, topics, data, selectedTopicId }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    setError,
  } = useForm({
    mode: "onSubmit",
    defaultValues: data || { topicId: selectedTopicId },
  });

  register("description", { required: "Description is required" });

  const description = watch("description");

  const [subTopicCreate, { isLoading: subTopicCreateLoading }] =
    useSubTopicCreateMutation();

  const [subTopicUpdate, { isLoading: subTopicUpdateLoading }] =
    useSubTopicUpdateMutation();

  const handleQuillChange = (value) => {
    setValue("description", value, { shouldValidate: true });
  };

  const handleFormSubmit = async (data) => {
    if (!data.description) {
      return;
    }
    try {
      const response = data?._id
        ? await subTopicUpdate({ id: data?._id, data }).unwrap()
        : await subTopicCreate(data).unwrap();

      if (response?.status === "success") {
        toast.success(
          `Sub-topic ${data?._id ? "updated" : "added"} successfully!`
        );
        reset();
        onClose();
      } else {
        toast.error(
          response?.message ||
            "Something went wrong while saving the sub-topic."
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

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "list",
    "bullet",
    "bold",
    "italic",
    "underline",
    "align",
    "link",
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <div className="flex justify-between items-center px-6 pt-5">
        <DialogTitle className="p-0 font-semibold text-xl text-gray-800 dark:text-white">
          {data?._id ? "Update" : "Add"} Subtopic
        </DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon className="text-gray-500 hover:text-gray-700" />
        </IconButton>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent dividers className="space-y-6 px-6 py-4">
          {/* Select Topic */}
          <FormControl
            fullWidth
            error={!!errors.topicId}
            variant="outlined"
            className="bg-white dark:bg-gray-800"
          >
            <InputLabel id="topic-label">Select Topic</InputLabel>
            <Controller
              name="topicId"
              control={control}
              defaultValue=""
              rules={{ required: "Please select a topic" }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="topic-label"
                  label="Select Topic"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        overflow: "auto",
                      },
                    },
                  }}
                >
                  {topics.map((topic) => (
                    <MenuItem key={topic._id} value={topic._id}>
                      {topic.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>
              {errors.topicId && errors.topicId.message}
            </FormHelperText>
          </FormControl>

          <TextField
            fullWidth
            label="Subtopic Name"
            variant="outlined"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            className="bg-white dark:bg-gray-800"
          />

          {/* Subtopic Title */}
          <TextField
            fullWidth
            label="Subtopic Title"
            variant="outlined"
            {...register("title", { required: "Title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
            className="bg-white dark:bg-gray-800"
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white  mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <ReactQuill
              value={description || ""}
              onChange={handleQuillChange}
              modules={modules}
              formats={formats}
              placeholder="Write your instructions here..."
              className="bg-white  dark:bg-gray-800 "
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message || "Description is required"}
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
            {data?._id ? "Update" : "Add"} Subtopic
          </Button>
        </DialogActions>
      </form>

      <Loader loading={subTopicCreateLoading || subTopicUpdateLoading} />
    </Dialog>
  );
};

export default AddSubTopicModal;
