import * as React from "react";
import Modal from "@mui/material/Modal";
import { MdModeEdit } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import down from "../../assets/img/down.png";

export default function TimeZoneModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-black text-white py-3 px-5 flex items-center rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A] ms-auto"
      >
        <MdModeEdit className="me-2" />
        Edit
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] bg-white dark:bg-gray-800 rounded-[20px]">
          <div className="p-4 flex justify-between items-center flex-wrap-reverse border-b border-[#CDCDCD]">
            <p className="sm:text-[26px] font-semibold">Time zone</p>
            <button>
              <RiCloseCircleFill
                className="text-[24px] text-[#C13515]"
                onClick={handleClose}
              />
            </button>
          </div>
          <div className="p-4">
            <select
              style={{
                backgroundImage: `url(${down})`,
                backgroundPosition: "right 20px center",
              }}
              className="mt-6 w-full sm:p-6 p-3 pe-12 text-black border focus:outline-none border-[#D4D7E3] rounded-[10px] bg-no-repeat appearance-none"
              name="Language"
              id="Language"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
            </select>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-between mt-16">
              <button className="min-w-[150px] text-black bg-[#E7E7E7] border border-[#D5D5D5] rounded-full p-3 font-medium">
                Cancel
              </button>
              <button className="min-w-[150px] bg-[#000000] border border-[#000000] rounded-full p-3 font-semibold text-white shadow-[0px_10px_17px_0px_#FD636312]">
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
