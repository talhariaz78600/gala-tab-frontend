import * as React from "react";
import Modal from "@mui/material/Modal";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaChevronRight } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import decoration from "../../assets/img/decoration.png";
import { Link } from "react-router";
import { HiMiniTrash } from "react-icons/hi2";

export default function FindListingModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button onClick={handleOpen}>
        <FaChevronRight className="text-[20px]" />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] bg-white rounded-[20px]">
          <div className="p-4 flex justify-between items-center border-b border-[#CDCDCD]">
            <p className="text-[26px] w-full text-center font-semibold">
              Find Listing
            </p>
            <button>
              <RiCloseCircleFill
                className="text-[24px] text-[#979797]"
                onClick={handleClose}
              />
            </button>
          </div>
          <div className="py-1">
            <div className="p-4 max-h-[calc(100dvh-200px)] overflow-y-auto scroll-x-hidden">
              <div className="flex justify-end">
                <div className="flex items-center gap-2">
                  <GoDotFill className="text-[#EA3548]" />
                  <p className="text-[14px] font-medium text-nowrap">
                    In Progress
                  </p>
                </div>
              </div>
              <div>
                <img
                  className="max-w-[180px] aspect-[3/2] rounded-[10px]"
                  src={decoration}
                  alt="img"
                />
                <p className="text-lg font-medium">Decoration</p>
                <p className="text-lg font-medium">locations details here</p>
              </div>
              <div className="flex flex-wrap flex-col gap-4 justify-center sm:justify-between mt-8">
                <Link to="/vendor-dashboard/services" className="bg-[#1C1C1C] flex justify-center border border-[#1C1C1C] rounded-[10px] py-3 text-lg px-6 font-medium text-white shadow-[0px_10px_17px_0px_#FD636312]">
                  Edit listing
                </Link>
                <button className="flex justify-center items-center border gap-1 border-[#0000001A] rounded-[10px] py-3 px-6 shadow-[0px_10px_17px_0px_#FD636312] text-lg font-medium bg-[#0000001A]">
                  <HiMiniTrash className="text-[24px]" />
                  Remove listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
