import * as React from "react";
import Modal from "@mui/material/Modal";
import { MdLanguage } from "react-icons/md";
import LanguageTabs from "./LanguageTabs";

export default function LanguageButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <p
        className="bg-[#E7E7E7] py-2 px-3 rounded-full flex items-center cursor-pointer"
        onClick={handleOpen}
      >
        <MdLanguage className="mr-2" /> English
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] -translate-y-1/2 w-[calc(100%-50px)] max-w-[1200px] max-h-[80dvh]">
          <LanguageTabs />
        </div>
      </Modal>
    </div>
  );
}
