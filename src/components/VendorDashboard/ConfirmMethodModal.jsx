import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import EmailImg from "../../assets/img/email.png";
import { Modal } from "@mui/material";
import OtpModal from "./OtpModal";

export default function ConfirmMethodModal({ handleClose }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [openOtp, setOpenOtp] = React.useState(false);
  const handleOpenOtp = () => setOpenOtp(true);
  const handleCloseOtp = () => setOpenOtp(false);

  return (
    <div>
      <form action="">
        <div className="p-4 flex flex-row-reverse justify-between items-center flex-wrap-reverse border-b border-[#CDCDCD]">
          <p className="text-[26px] w-[calc(100%-24px)] text-center font-semibold">
            Confirm account{" "}
          </p>
          <button>
            <FaArrowLeft className="text-[24px]" onClick={handleClose} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-[24px] font-semibold">
            Let us know it’s really you
          </p>
          <div className="mt-4">
            <div
              className={`border py-2 px-5 rounded-lg flex items-center justify-between cursor-pointer ${
                selectedOption === "email" ? "border-blue-600" : "bg-gray-50"
              }`}
              onClick={() => setSelectedOption("email")}
            >
              <label
                htmlFor="email"
                className="flex items-center"
                onClick={() => handleRoleChange("email")}
              >
                <div>
                  <img
                    src={EmailImg}
                    alt=""
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="ps-2">
                  <h6 className="text-lg font-semibold">SMS Code</h6>
                  <p className="text-xs text-gray-500">
                    Select SIM SMS Verification
                  </p>
                </div>
              </label>
              <div>
                <input
                  type="radio"
                  id="email"
                  name="verify"
                  checked={selectedOption === "email"}
                  onChange={() => setSelectedOption("email")}
                  className="w-6 h-6"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-16 flex items-center">
            <input
              className="me-2 size-5 accent-black"
              type="checkbox"
              name="confirm"
              id="confirm"
            />
            <label className="text-sm font-medium" htmlFor="confirm">
              To continue, you’ll need to confirm your account through one of
              the following options.
            </label>
          </div>
          <div className="grid mt-8">
            <button
              onClick={handleOpenOtp}
              type="button"
              className="bg-[#1C1C1C] border border-[#1C1C1C] rounded-[10px] py-3 px-6 font-medium text-white shadow-[0px_11.72px_20px_0px_#00000024]"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
      <Modal
        open={openOtp}
        onClose={handleCloseOtp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] bg-white rounded-[20px]">
          <OtpModal handleClose={handleCloseOtp} />
        </div>
      </Modal>
    </div>
  );
}
