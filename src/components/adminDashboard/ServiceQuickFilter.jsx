import * as React from "react";
import Modal from "@mui/material/Modal";
import { IoCloseCircle, IoFunnelOutline } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import CustomCheckbox from "../../components/VendorDashboard/CustomCheckbox";
import { LiaFilterSolid } from "react-icons/lia";

export default function ServiceQuickFilter() {
  const vendortypes = ["Venues", "Decorations", "Catering", "Cakes", "DJ’s"];
  const Date = ["Today", "Last week", "This week", "Last Month", "Next Month"];
  const Status = [
    "Already Booked",
    "In Progress",
    "Active",
    "Cancelled",
    "Action Required Listing",
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div
        className="flex items-center gap-2 border rounded-md p-2 bg-white cursor-pointer"
        onClick={handleOpen}
      >
        <div>
          <LiaFilterSolid className="text-[#979797]" />
        </div>
        <div className="flex items-center gap-4">
          <p className="text-[#979797]">Filter</p>
          <FaCaretDown className="text-[#979797]" />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] bg-white rounded-[20px]">
          <div className="rounded-[20px] overflow-hidden shadow-[0px_0px_17px_0px_#ECECEC]">
            <div className="flex items-center justify-between bg-[#E7E7E9] p-5 border-b border-[#CDCDCD]">
              <p className="text-[#3551B6] text-[20px] font-semibold">
                Quick filters
              </p>
              <button onClick={handleClose}>
                <IoCloseCircle className="text-[#979797] text-[28px]" />
              </button>
            </div>
            <form action="">
              <div className="py-1">
                <div className="p-5 grid min-[480px]:grid-cols-2 md:grid-cols-3 gap-5 max-h-[calc(100dvh-220px)] overflow-y-auto scroll-x-hidden">
                  <div className="bg-[#E7E7E9] rounded-[10px] p-3">
                    <p className="text-[#3551B6] text-[18px] font-semibold">
                      Vendor Type
                    </p>
                    <div className="flex flex-col gap-3 mt-4">
                      {vendortypes.map((type, index) => (
                        <CustomCheckbox key={index} name={type} />
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#E7E7E9] rounded-[10px] p-3">
                    <p className="text-[#3551B6] text-[18px] font-semibold">
                      Date
                    </p>
                    <div className="flex flex-col gap-3 mt-4">
                      {Date?.map((date, index) => (
                        <CustomCheckbox key={index} name={date} />
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#E7E7E9] rounded-[10px] p-3">
                    <p className="text-[#3551B6] text-[18px] font-semibold">
                      Status
                    </p>
                    <div className="flex flex-col gap-3 mt-4">
                      {Status?.map((status, index) => (
                        <CustomCheckbox key={index} name={status} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-5 pb-5">
                <button type="reset" className="font-medium underline">
                  Clear
                </button>
                <button
                  type="submit"
                  className="font-medium text-white bg-black py-3 px-10 rounded-[7px]"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
