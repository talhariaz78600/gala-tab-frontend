import ImageSelect from "../../components/VendorDashboard/ImageSelect";
import React, { useState } from "react";
import stripe from "../../assets/img/stripe.png";
import paypal from "../../assets/img/paypal-logo.png";
import payoneer from "../../assets/img/payoneer.png";
import paytm from "../../assets/img/paytm.png";
import worldpay from "../../assets/img/worldpay.png";
import guestimg from "../../assets/img/guest-img2.png";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function PayOut() {
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedGuest, setSelectedGuest] = useState("");

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const Bankoptions = [
    {
      value: "Stripe",
      img: stripe,
    },
    {
      value: "Paypal",
      img: paypal,
    },
    {
      value: "payoneer",
      img: payoneer,
    },
    {
      value: "paytm",
      img: paytm,
    },
    {
      value: "worldpay",
      img: worldpay,
    },
  ];

  const guestoptions = [
    {
      value: "Guest1",
      label: "Guest1",
      img: guestimg,
    },
    {
      value: "Guest2",
      label: "Guest2",
      img: guestimg,
    },
    {
      value: "Guest3",
      label: "Guest3",
      img: guestimg,
    },
    {
      value: "Guest4",
      label: "Guest4",
      img: guestimg,
    },
    {
      value: "Guest5",
      label: "Guest5",
      img: guestimg,
    },
  ];

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  const handleGuestChange = (event) => {
    setSelectedGuest(event.target.value);
  };

  return (
    <form action="/vendor-dashboard/PayOut-Details">
      <div className="min-h-[calc(100dvh-130px)] flex flex-col bg-[#F7F7F7] rounded-[20px] p-5">
        <div>
          <div className="flex items-center gap-2">
            <div>
              <Link to="/vendor-dashboard/PayOut-Details"><IoMdArrowRoundBack className="bg-white text-black p-2 shadow-sm rounded-full text-4xl" /></Link>
            </div>
            <h4 className="text-[20px] leading-normal sm:text-[24px] font-semibold">
              Add Payment Received Payment Details
            </h4>
          </div>
          <div className="max-w-[1000px] grid sm:grid-cols-2 gap-6 mt-8">
            <ImageSelect
              label="Select Bank"
              options={Bankoptions}
              value={selectedBank}
              onChange={handleBankChange}
              imgClass="me-3"
            />
            <ImageSelect
              label="Select Guest"
              options={guestoptions}
              value={selectedGuest}
              onChange={handleGuestChange}
              imgClass="me-3 size-8 rounded-full object-cover"
            />
            <TextField
              sx={{
                borderRadius: "10px",
                borderColor: "#D5D5D5",
                backgroundColor: "#ffffff",
                boxShadow: "0px 8px 24px 0px #00000012",
                height: "100%",
                fontFamily: "tt_chocolates",
                "& .MuiInputBase-root": {
                  borderRadius: "10px",
                  fontFamily: "tt_chocolates",
                },
              }}
              id="No.of-bill"
              label="Number of Bill"
              variant="outlined"
            />
            <TextField
              sx={{
                borderRadius: "10px",
                borderColor: "#D5D5D5",
                backgroundColor: "#ffffff",
                boxShadow: "0px 8px 24px 0px #00000012",
                fontFamily: "tt_chocolates",
                height: "100%",
                "& .MuiInputBase-root": {
                  borderRadius: "10px",
                  fontFamily: "tt_chocolates",
                },
              }}
              id="TotalAmount"
              label="Total Amount"
              variant="outlined"
            />
          </div>
        </div>
        <div className="mt-auto">
          <div className="mt-16 flex flex-wrap justify-center sm:justify-start items-center gap-8">
            <button
              type="button"
              onClick={() =>
                handleNavigation("/vendor-dashboard/PayOut-Details")
              }
              className="py-3 px-4 font-medium min-w-[120px] border bg-[#E7E7E7] border-[#D5D5D5] rounded-full"
            >
              Cancel
            </button>
            <button className="py-3 px-4 font-medium min-w-[120px] border bg-black border-black text-white rounded-full shadow-[0px_10px_17px_0px_#FD636312}">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
