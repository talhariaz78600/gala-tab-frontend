import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Divider,
} from "@mui/material";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Upload } from "lucide-react";
import { useFaqCreateMutation, useFaqUpdateMutation } from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import { toast } from "react-toastify";
import { handleFileUpload } from "@/lib/handleFileUpload";

const defaultValues = {
  question: "",
  faqType: "",
  dataType: "",
  answer: "",
  videoTitle: "",
  videoLink: "",
  videoDescription: "",
};

const AddFaqModal = ({ open, onClose, data }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  console.log("data", data);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  const faqType = useWatch({ control, name: "faqType" });
  const dataType = useWatch({ control, name: "dataType" });

  const isLanding = faqType === "landing";
  const isCustomerOrVendor = faqType === "customer" || faqType === "vendor";
  const isText = dataType === "text";
  const isTraining = dataType === "training";

  const [faqCreate, { isLoading: faqCreateLoading }] = useFaqCreateMutation();
  const [faqUpdate, { isLoading: faqUpdateLoading }] = useFaqUpdateMutation();

  useEffect(() => {
    if (!data && faqType === "landing") {
      setValue("dataType", "text");
      setValue("videoTitle", "");
      setValue("videoLink", "");
      setValue("videoDescription", "");
    }
  }, [faqType]);

  const onSubmit = async (data) => {
    if (data.dataType === "training" && !data.videoLink && !data.videoUpload) {
      toast.error("Please upload a video or paste a link");
      return;
    }

    setIsLoading(true);

    try {
      if (data.dataType === "training" && data.videoUpload) {
        const file = data.videoUpload;
        let uploadedUrl = "";

        if (file && typeof file !== "string") {
          uploadedUrl = await handleFileUpload(
            file,
            setIsLoading,
            setUploadProgress,
            token
          );
        }

        data.videoLink = uploadedUrl;
        data.videoUpload = null;
      }

      const filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== null && value !== undefined && value !== ""
        )
      );

      console.log("Form submitted:", filteredData);
      const response = data?._id
        ? await faqUpdate({ id: data._id, data: filteredData }).unwrap()
        : await faqCreate(filteredData).unwrap();

      if (response.status === "success") {
        toast.success(`FAQ ${data ? "Updated" : "Created"} successfully!`);
      } else {
        toast.error(response.message);
      }

      onClose();
      reset(defaultValues);
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Something went wrong during upload.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        ...defaultValues,
        ...data,
      });
    } else {
      reset(defaultValues);
    }
  }, [data, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-2xl font-bold px-6 pt-6">
        {data ? "Edit" : "Add"} FAQ
      </DialogTitle>
      <DialogContent dividers className="px-6 pb-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1  gap-6">
            <FormControl fullWidth>
              <InputLabel>FAQ For</InputLabel>
              <Controller
                name="faqType"
                control={control}
                rules={{ required: "FAQ type is required" }}
                render={({ field }) => (
                  <Select label="FAQ For" {...field}>
                    <MenuItem value="landing">Landing Page</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                    <MenuItem value="vendor">Vendor</MenuItem>
                  </Select>
                )}
              />
              {errors.faqType && (
                <p className="text-red-500 text-sm mt-1 pl-2">
                  {errors.faqType.message}
                </p>
              )}
            </FormControl>
          </div>

          {isCustomerOrVendor && (
            <div className="mt-6">
              <Typography className="font-semibold mb-2 text-gray-800 dark:text-white">
                Answer Format
              </Typography>
              <Controller
                name="dataType"
                control={control}
                rules={{ required: "Data type is required" }}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel
                      value="text"
                      control={<Radio />}
                      label="Text Answer"
                    />
                    <FormControlLabel
                      value="training"
                      control={<Radio />}
                      label="Training Video"
                    />
                  </RadioGroup>
                )}
              />
            </div>
          )}

          {(isLanding || isText) && (
            <div className="mt-6">
              <Typography className="font-semibold mb-2 text-gray-800 dark:text-white">
                FAQ Question
              </Typography>
              <Controller
                name="question"
                control={control}
                rules={{ required: "Question is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    className="rounded-xl "
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </div>
          )}

          {(isLanding || isText) && (
            <div className="mt-6">
              <Typography className="font-semibold mb-2 text-gray-800 dark:text-white">
                Answer
              </Typography>
              <Controller
                name="answer"
                control={control}
                rules={{ required: "Answer is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    placeholder="Write the answer here..."
                    className="rounded-xl"
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </div>
          )}

          {isTraining && (
            <div className="mt-8 space-y-6">
              <Divider />

              {/* Video Title */}
              <Controller
                name="videoTitle"
                control={control}
                rules={{ required: "Video title is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Video Title"
                    fullWidth
                    className="rounded-xl"
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              {/* Video Description */}
              <Controller
                name="videoDescription"
                control={control}
                rules={{ required: "Video description is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Video Description"
                    fullWidth
                    multiline
                    minRows={3}
                    className="rounded-xl"
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              {/* Video Input: Either URL or Upload */}
              <div className="space-y-4">
                <Typography className="font-semibold text-gray-800 dark:text-white">
                  Video Upload or Link (Only one allowed)
                </Typography>

                {/* Video URL input */}
                <Controller
                  name="videoLink"
                  control={control}
                  rules={{
                    validate: (value, formValues) => {
                      if (value && formValues.videoUpload) {
                        return "Choose either link or upload, not both";
                      }
                      if (!value && !formValues.videoUpload) {
                        return "Provide a video link or upload a file";
                      }
                      return true;
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Paste Video URL"
                      fullWidth
                      className="rounded-xl"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setValue("videoUpload", null);
                      }}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />

                {/* Video upload input */}
                <Controller
                  name="videoUpload"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label
                        htmlFor="upload-video"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border border-gray-300 w-fit"
                      >
                        <Upload size={18} />
                        Upload Video File
                      </label>
                      <input
                        id="upload-video"
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          field.onChange(e.target.files[0]);
                          setValue("videoLink", "");
                        }}
                        className="hidden"
                      />
                      {field.value && (
                        <p className="mt-2 text-sm text-gray-600">
                          {field.value.name}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          )}
        </form>
      </DialogContent>
      <DialogActions className="px-6 pb-6">
        <Button
          onClick={onClose}
          sx={{ color: "#000", border: "1px solid #000" }}
          className="rounded-xl px-4 py-2 shadow-sm"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#000", color: "white" }}
          className="rounded-xl px-6 py-2 shadow-md"
          onClick={handleSubmit(onSubmit)}
        >
          Save FAQ
        </Button>
      </DialogActions>
      <Loader loading={isLoading || faqCreateLoading || faqUpdateLoading} />
    </Dialog>
  );
};

export default AddFaqModal;
