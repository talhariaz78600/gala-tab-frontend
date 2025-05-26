import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useSendPaymenttoVendorMutation } from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";

const PayButtonWithModal = ({ open, handleClose, selectedId }) => {
  const [amount, setAmount] = useState(0);

  const [sendPaymenttoVendor, { isLoading }] = useSendPaymenttoVendorMutation();

  const handlePay = async () => {
    const response = await sendPaymenttoVendor({
      data: { paymentId: selectedId._id, amount },
    }).unwrap();

    if (response.status === "success") {
      toast.success("Payment sent successfully!");
    }

    console.log("Paying amount:", amount);
    handleClose();
  };

  useEffect(() => {
    setAmount(selectedId?.amount);
  }, [selectedId]);

  return (
    <>
      {/* MUI Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Enter Amount
          </Typography>
          <TextField
            fullWidth
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            margin="normal"
          />
          <Button
            fullWidth
            sx={{ mt: 2, backgroundColor: "black", color: "white" }}
            onClick={handlePay}
          >
            Pay
          </Button>
        </Box>
      </Modal>
      <Loader loading={isLoading} />
    </>
  );
};

export default PayButtonWithModal;
