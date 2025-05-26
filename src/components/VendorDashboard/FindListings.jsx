import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { GoDotFill } from "react-icons/go";
import { FaTrashCan } from "react-icons/fa6";
import decoration from "../../assets/img/decoration.png";

export default function FindListings() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Find Listing</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute w-[calc(100%-20px)] max-w-[500px] top-1/2 left-1/2 border border-[#CDCDCD] rounded-[20px] bg-white -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-center p-5 border-b border-[#CDCDCD]">
            <p className="text-[24px] font-semibold">Find Listing</p>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-end">
              <GoDotFill className="text-[#EA3548] text-[20px]" />{" "}
              <p className="text-[xs]">In Progress</p>
            </div>
            <div className="mt-2">
              <img
                className="w-[180px] aspect-[1/0.667]"
                src={decoration}
                alt=""
              />
              <p className="mt-2 text-lg font-medium">Decoration</p>
              <p className="mt-2 text-lg font-medium">locations details here</p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <button className="bg-black w-full p-3 rounded-[7px] text-white shadow-[0px_10px_17px_0px_#FD636312]">
                Edit listing
              </button>
              <button className="bg-[#0000001A] w-full p-3 rounded-[7px] flex items-center justify-center shadow-[0px_10px_17px_0px_#FD636312]">
                <FaTrashCan className="me-2" />
                <span>Remove listing</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
