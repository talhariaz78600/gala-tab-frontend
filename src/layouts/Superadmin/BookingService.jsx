import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router";

export default function BookingService() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div
        className="font-medium border inline-block cursor-pointer border-black bg-white py-3 px-5 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
        onClick={handleOpen}
      >
        Add New Service
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute w-[calc(100%-20px)] max-w-[700px] top-1/2 left-1/2 border border-[#CDCDCD] rounded-[20px] bg-white -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-center p-5 border-b border-[#CDCDCD]">
            <p className="text-[24px] font-semibold">Add New Service</p>
          </div>
          <div className="p-5 max-h-[calc(100dvh-200px)] overflow-y-auto scroll-x-hidden">
            <p className="text-lg text-center font-medium">
              Things to know before copying your rental from Gala Tab
            </p>
            <ul className="flex flex-col gap-6 mt-6">
              <li className="flex items-baseline">
                <FaCheck className="me-2 text-sm min-w-[16px]" />
                <p className="text-xs font-medium">
                  Heads Up! After connecting, Gala Tab might switch you to their
                  new simplified pricing model automatically.
                </p>
              </li>
              <li className="flex items-baseline">
                <FaCheck className="me-2 text-sm min-w-[16px]" />
                <p className="text-xs font-medium">
                  Import Made Simple! We’ll grab your info from Gala Tab without
                  messing with your current settings.
                </p>
              </li>
              <li className="flex items-baseline">
                <FaCheck className="me-2 text-sm min-w-[16px]" />
                <p className="text-xs font-medium">
                  Almost There! A pop-up will appear with a message from Gala
                  Tab. Just tick the "I agree to the Airbnb Additional Terms of
                  Service" box and click Allow to keep going.
                </p>
              </li>
              <li className="flex items-baseline">
                <FaCheck className="me-2 text-sm min-w-[16px]" />
                <p className="text-xs font-medium">
                  Need Help Importing Your Rentals? No worries, just give us a
                  shout [here]!
                </p>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-6">
              <input
                className="accent-black w-6 h-6 min-w-6"
                type="checkbox"
                name="confirm"
                id="confirm"
              />
              <label className="text-xs font-medium" htmlFor="confirm">
                I have read and accept the information above
              </label>
            </div>
            <div className="mt-8">
              <Link to='/admin-dashboard/get-started' className="bg-black w-full block text-center p-3 rounded-[7px] text-white shadow-[0px_10px_17px_0px_#FD636312]">
                Continue
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
