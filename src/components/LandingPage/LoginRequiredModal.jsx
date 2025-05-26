import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginRequiredModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    handleClose();
    navigate("/auth/welcome/login");
  };
  

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: { borderRadius: 16, padding: "10px" },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ fontWeight: "bold", fontSize: "1.5rem", textAlign: "center" }}
      >
        🔒 Login Required
      </DialogTitle>

      <DialogContent>
        <Typography
          variant="body1"
          sx={{
            mt: 1,
            textAlign: "center",
            fontSize: "1rem",
            color: "#555",
          }}
        >
          You must be logged in to perform this action.
          <br />
          Please log in to continue.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", mb: 1 }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{
            borderRadius: 10,
            textTransform: "none",
            px: 3,
            py: 1,
            border: "1px solid #000",
            color: "#000",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            borderRadius: 10,
            textTransform: "none",
            px: 3,
            py: 1,
            backgroundColor: "#000",
          }}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginRequiredModal;
