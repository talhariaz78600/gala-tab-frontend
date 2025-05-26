import { useContext, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { useUpdateDefaultPricingMutation } from "@/api/apiSlice";
import Loader from "../loader/Loader";
import { ThemeContext } from "../ThemeProvider";

export default function DefaultPriceModal({
  handleClose,
  currentDafaultID,
  currentDefaultPrice,
}) {
  const [newDefaultPrice, setNewDefaultPrice] = useState("");
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const [updateDefaultPricing, { isLoading }] =
    useUpdateDefaultPricingMutation();

  const handleSave = async () => {
    if (!newDefaultPrice) {
      toast.error("New default price cannot be empty!");
      return;
    }

    try {
      const res = await updateDefaultPricing({
        id: currentDafaultID,
        data: { pricingPercentage: newDefaultPrice },
      }).unwrap();

      if (res?.status === "success") {
        toast.success("Default Pricing Percentage updated successfully!");
        handleClose();
      } else {
        toast.error(res?.message || "Failed to update Default pricing.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Dialog
        open
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: isDark ? "#121212" : "white",
            color: isDark ? "white" : "black",
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle
          className="flex items-center justify-between font-bold text-2xl"
          sx={{ color: isDark ? "white" : "black" }}
        >
          Set New Default Pricing
          <IconButton
            onClick={handleClose}
            sx={{ color: isDark ? "gray" : "gray.700" }}
          >
            <IoCloseCircle className="text-3xl" />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          className="space-y-6"
          sx={{ color: isDark ? "#ccc" : "#444" }}
        >
          <div>
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: isDark ? "#bbb" : "#555" }}
            >
              Current Default Price
            </p>
            <div
              className="w-full p-3 border rounded-lg font-semibold text-center"
              style={{
                backgroundColor: isDark ? "#1e1e1e" : "#f3f4f6",
                borderColor: isDark ? "#444" : "#d1d5db",
                color: isDark ? "white" : "black",
              }}
            >
              {currentDefaultPrice} %
            </div>
          </div>

          <div>
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: isDark ? "#bbb" : "#555" }}
            >
              New Default Price (%)
            </p>
            <TextField
              fullWidth
              type="number"
              value={newDefaultPrice}
              onChange={(e) => setNewDefaultPrice(e.target.value)}
              placeholder="Enter new default price"
              variant="outlined"
              size="small"
              InputProps={{
                sx: {
                  bgcolor: isDark ? "#1e1e1e" : "white",
                  color: isDark ? "white" : "black",
                  "& fieldset": {
                    borderColor: isDark ? "#555" : "black",
                  },
                  "&:hover fieldset": {
                    borderColor: isDark ? "#888" : "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: isDark ? "#aaa" : "black",
                  },
                  input: {
                    color: isDark ? "white" : "black",
                  },
                },
              }}
            />
          </div>
        </DialogContent>

        <DialogActions className="p-4">
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              backgroundColor: isDark ? "#333" : "black",
              "&:hover": {
                backgroundColor: isDark ? "#555" : "#333",
              },
              paddingX: 2,
              paddingY: 1,
              fontSize: "16px",
              borderRadius: "8px",
              textTransform: "capitalize",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      ;
      <Loader loading={isLoading} />
    </>
  );
}
