import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { IoCloseCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import {
  useAdvertisementCreateMutation,
  useAdvertisementUpdateMutation,
} from "@/api/apiSlice";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";
import { handleFileUpload } from "@/lib/handleFileUpload";

export default function AdvertisementModal({ open, handleClose, data }) {
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [linkError, setLinkError] = useState("");
  const token = localStorage.getItem("token");

  const [createAdvertisement, { isLoading: isCreating }] =
    useAdvertisementCreateMutation();
  const [updateAdvertisement, { isLoading: isUpdating }] =
    useAdvertisementUpdateMutation();

  const handleSave = async () => {
    if (!image && !link) {
      toast.error("Please add both an image and a link!");
      return;
    }

    try {
      new URL(link);
      setLinkError("");
    } catch (_) {
      setLinkError("Please enter a valid URL");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      let uploadedUrl = "";

      // Upload image if a new image is selected
      if (image && typeof image !== "string") {
        uploadedUrl = await handleFileUpload(
          image,
          setIsLoading,
          setUploadProgress,
          token
        );
      } else if (data?.image && typeof data.image === "string") {
        uploadedUrl = data.image;
      }

      if (!uploadedUrl) {
        toast.error("Failed to upload image.");
        return;
      }

      const response = data
        ? await updateAdvertisement({
            id: data._id,
            data: {
              image: uploadedUrl,
              link,
              imagekey: "39923923",
            },
          }).unwrap()
        : await createAdvertisement({
            image: uploadedUrl,
            link,
            imagekey: "39923923",
          }).unwrap();

      if (response.status === "success") {
        toast.success(`${data ? "Updated" : "Created"} successfully!`);
        setImage(null);
        setLink("");

        handleClose();
      } else {
        toast.error(response?.message || "Failed to save advertisement.");
      }
    } catch (error) {
      console.error(error.data);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setLink(data.link);
      setImage(data.image);
    } else {
      setLink("");
      setImage(null);
    }
  }, [data]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold text-black dark:text-white">
            {data ? "Edit" : "Add"} Advertisement
          </span>
          <IconButton onClick={handleClose}>
            <IoCloseCircle className="text-2xl text-gray-600 dark:text-gray-300" />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-md px-3 py-2 text-sm text-black dark:text-white"
            />

            {/* If an image is selected or already exists, show a preview */}
            {image && typeof image !== "string" && (
              <Box className="mt-3">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="max-w-[200px] object-cover rounded-md"
                />
              </Box>
            )}
            {image && typeof image === "string" && (
              <Box className="mt-3">
                <img
                  src={image}
                  alt="Current Image"
                  className="max-w-[200px] object-cover rounded-md"
                />
              </Box>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Link
            </label>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Enter URL"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              error={!!linkError}
              helperText={linkError}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1f2937" : "white",
                "& .MuiInputBase-root": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1f2937" : "white",
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.common.white
                      : theme.palette.common.black,
                },
                "& .MuiFormHelperText-root": {
                  color: "red",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: (theme) =>
                      theme.palette.mode === "dark" ? "#4b5563" : "#ccc",
                  },
                  "&:hover fieldset": {
                    borderColor: (theme) =>
                      theme.palette.mode === "dark" ? "#6b7280" : "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? theme.palette.common.white
                        : theme.palette.common.black,
                  },
                },
              }}
            />
          </div>
        </DialogContent>

        <DialogActions className="p-4">
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ borderColor: "black", color: "black" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Loader loading={isLoading || isCreating || isUpdating} />
    </>
  );
}
