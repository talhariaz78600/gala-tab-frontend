import * as React from "react";
import Modal from "@mui/material/Modal";
import { RiCloseCircleFill } from "react-icons/ri";
import editIcon from "../../assets/img/edit-icon.png";


export default function EditFaq() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div
      className=" cursor-pointer"
        onClick={handleOpen}
      >
        <img className="size-10 max-w-10" src={editIcon} alt="Edit" />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] bg-white rounded-[20px]">
          <div className="p-4 flex justify-between items-center flex-wrap-reverse border-b border-[#CDCDCD]">
            <p className="text-[26px] font-semibold">Edit FAQ Details</p>
            <button>
              <RiCloseCircleFill
                className="text-[24px] text-[#979797]"
                onClick={handleClose}
              />
            </button>
          </div>
          <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto scroll-x-hidden">
            <div>
              <div>
                <label className="text-lg font-medium ps-3">Edit Question</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="w-full border border-[#D5D5D5] p-4 rounded-[10px] shadow-[0px_8px_24px_0px_#00000012] placeholder:text-[#9A9A9A] placeholder:text-[14px]"
                />
              </div>
              <p className="text-lg font-medium mt-6">
                This Option Will be type the answer & Select the answer.
              </p>
              <div className="mt-4">
                <label className="text-lg font-medium ps-3">Edit Answer</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="w-full border border-[#D5D5D5] p-4 rounded-[10px] shadow-[0px_8px_24px_0px_#00000012] placeholder:text-[#9A9A9A] placeholder:text-[14px]"
                />
              </div>
              <div className="mt-6 flex items-center gap-10 ps-6">
                <div className="flex items-center gap-2">
                  <input
                    className="size-8"
                    type="radio"
                    name="yesorno"
                    id="yes"
                  />
                  <label className="font-medium" htmlFor="yes">
                    Yes
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    className="size-8"
                    type="radio"
                    name="yesorno"
                    id="no"
                  />
                  <label className="font-medium" htmlFor="no">
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-between mt-8">
              <button onClick={handleClose} className="text-[20px] underline font-medium">
                Cancel
              </button>
              <button onClick={handleClose} className="bg-[#1C1C1C] border border-[#1C1C1C] rounded-[10px] py-3 px-6 font-semibold text-white shadow-[0px_11.72px_20px_0px_#00000024]">
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
