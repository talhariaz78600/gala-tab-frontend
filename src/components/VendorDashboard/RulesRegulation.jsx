import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import DeletePopup from "../DeletePopup";
import { Link } from "react-router";
import editIcon from "../../assets/img/edit-icon.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoCloseCircle } from "react-icons/io5";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaCirclePlus, FaRegCircleCheck } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import Rule from "@/layouts/VendorDashboard/StepperService/Rule";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "15px",
};

export default function RulesRegulation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="bg-white dark:bg-gray-800 p-3 border border-[#D5D5D5] rounded-[10px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {isOpen ? (
            <FaChevronDown className="text-[20px] me-2" />
          ) : (
            <FaChevronRight className="text-[20px] me-2" />
          )}
          <p className="text-lg font-semibold">Rules & Regulation</p>
        </div>
      </div>

      {isOpen && (
        <div className="p-3">
          <Rule mode="edit" />
        </div>
      )}
    </div>
  );
}
