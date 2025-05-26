import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoIosCloseCircleOutline } from "react-icons/io";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "15px",
  p: 4,
};

export default function DeletePopup({ open, onClose, onConfirm }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="flex justify-center">
            <IoIosCloseCircleOutline className="text-red-600 text-7xl" />
          </div>
          <div className="mt-3">
            <p className="text-3xl text-center">Are you sure?</p>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#F7F7F7] text-black py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="bg-red-600 text-white py-2 px-4 rounded-md"
            >
              Delete
            </button>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
}
