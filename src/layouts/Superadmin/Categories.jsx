import React, { useState } from "react";
import editIcon from "../../assets/img/edit-icon.png";
import DeletePopup from "../../components/DeletePopup";
import { Modal } from "@mui/material";
import { RiCloseCircleFill } from "react-icons/ri";
import LocationIcon from "../../assets/img/location-icon.svg";
import DecorationIcon from "../../assets/img/Decoration-icon.svg";
import CateringIcon from "../../assets/img/catering-icon.svg";
import CakesIcon from "../../assets/img/cakes-icon.svg";
import DjIcon from "../../assets/img/dj-icon.svg";
import EntertainmentIcon from "../../assets/img/entertainment-icon.svg";
import PhotographyIcon from "../../assets/img/photography-icon.svg";
import TransportationIcon from "../../assets/img/Transportaion-icon.svg";
import BeautyIcon from "../../assets/img/beauty-icon.svg";
import StaffIcon from "../../assets/img/staff-icon.svg";
import FashionIcon from "../../assets/img/Fashion-icon.svg";
import EquipmentIcon from "../../assets/img/Equipment-icon.svg";
import LocationIconWhite from "../../assets/img/location-icon-white.svg";
import DecorationIconWhite from "../../assets/img/Decoration-icon-white.svg";
import CateringIconWhite from "../../assets/img/catering-icon-white.svg";
import CakesIconWhite from "../../assets/img/cakes-icon-white.svg";
import DjIconWhite from "../../assets/img/dj-icon-white.svg";
import EntertainmentIconWhite from "../../assets/img/entertainment-icon-white.svg";
import PhotographyIconWhite from "../../assets/img/photography-icon-white.svg";
import TransportationIconWhite from "../../assets/img/Transportaion-icon-white.svg";
import BeautyIconWhite from "../../assets/img/beauty-icon-white.svg";
import StaffIconWhite from "../../assets/img/staff-icon-white.svg";
import FashionIconWhite from "../../assets/img/Fashion-icon-white.svg";
import EquipmentIconWhite from "../../assets/img/Equipment-icon-white.svg";

export default function Categories() {
  const [Editopen, setEditOpen] = React.useState(false);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const columns = [
    { Header: "Name" },
    { Header: "Inactive Icon" },
    { Header: "Active Icon" },
    { Header: "Action" },
  ];

  const categoryData = [
    {
      name: "Venues",
      activeIcon: LocationIcon,
      inactiveIcon: LocationIconWhite,
    },
    {
      name: "Decorations",
      activeIcon: DecorationIcon,
      inactiveIcon: DecorationIconWhite,
    },
    {
      name: "Catering",
      activeIcon: CateringIcon,
      inactiveIcon: CateringIconWhite,
    },
    {
      name: "Cakes",
      activeIcon: CakesIcon,
      inactiveIcon: CakesIconWhite,
    },
    {
      name: "DJ’s",
      activeIcon: DjIcon,
      inactiveIcon: DjIconWhite,
    },
    {
      name: "Photography & Videography",
      activeIcon: PhotographyIcon,
      inactiveIcon: PhotographyIconWhite,
    },
    {
      name: "Transportation",
      activeIcon: TransportationIcon,
      inactiveIcon: TransportationIconWhite,
    },
    {
      name: "Beauty",
      activeIcon: BeautyIcon,
      inactiveIcon: BeautyIconWhite,
    },
    {
      name: "Staff",
      activeIcon: StaffIcon,
      inactiveIcon: StaffIconWhite,
    },
    {
      name: "Fashion",
      activeIcon: FashionIcon,
      inactiveIcon: FashionIconWhite,
    },
    {
      name: "Equipment",
      activeIcon: EquipmentIcon,
      inactiveIcon: EquipmentIconWhite,
    },
    {
      name: "Entertainment",
      activeIcon: EntertainmentIcon,
      inactiveIcon: EntertainmentIconWhite,
    },
  ];

  const [activeImagePreview, setactiveImagePreview] = useState(null);
  const [InactiveImagePreview, setInactiveImagePreview] = useState(null);

  const handleactiveImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setactiveImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setactiveImagePreview(null);
    }
  };

  const handleInactiveImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setInactiveImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setInactiveImagePreview(null);
    }
  };

  return (
    <div className="min-h-[calc(100dvh-130px)] bg-[#F7F7F7] rounded-[20px] p-5">
      <div className="flex justify-between items-center">
        <p className="text-[28px] leading-normal font-semibold">Categories</p>
        <button
          onClick={handleEditOpen}
          className="border p-3 bg-white border-[#000000] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
        >
          Add Category
        </button>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  className="bg-black text-white text-left px-4 py-5 text-lg first:rounded-s-[10px] last:rounded-e-[10px] font-medium"
                  key={index}
                >
                  {col.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-medium">
            {categoryData.map((row, index) => (
              <tr key={index}>
                <td className="p-4 bg-black bg-opacity-10 rounded-s-[10px]">
                  {row.name}
                </td>
                <td className="p-4 bg-black bg-opacity-10">
                  <img className="size-6 max-w-6" src={row.activeIcon} alt="" />
                </td>
                <td className="p-4 bg-black bg-opacity-10">
                  <img
                    className="size-6 max-w-6"
                    src={row.inactiveIcon}
                    alt=""
                  />
                </td>
                <td className="p-4 bg-black bg-opacity-10 rounded-e-[10px]">
                  <div className="flex items-center gap-2">
                    <button onClick={handleEditOpen}>
                      <img
                        className="size-12 max-w-12"
                        src={editIcon}
                        alt="edit"
                      />
                    </button>
                    <DeletePopup />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={Editopen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{m:2}}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] bg-white rounded-[20px] outline-none">
          <form action="">
            <div className="p-4 flex justify-between items-center flex-wrap-reverse border-b border-[#CDCDCD]">
              <p className="sm:text-[26px] font-semibold">Category</p>
              <button>
                <RiCloseCircleFill
                  className="text-[24px] text-[#C13515]"
                  onClick={handleEditClose}
                />
              </button>
            </div>
            <div className="p-4 max-h-[calc(100dvh-200px)] overflow-y-auto scroll-x-hidden">
              <div>
                <label className="font-medium ps-2" htmlFor="filtername">
                  Category Name
                </label>
                <input
                  className="w-full mt-1 p-4 border focus:outline-none border-[#D4D7E3] rounded-[10px]"
                  type="text"
                  name="filtername"
                  id="filtername"
                />
              </div>
              <div className="grid min-[480px]:grid-cols-2 gap-4 mt-6">
                <div className="flex flex-col items-center">
                  <div
                    className={`${
                      activeImagePreview ? "block" : "hidden"
                    } bg-[#F7F7F7] w-12 h-12 rounded-[4px] flex justify-center items-center`}
                  >
                    <img
                      src={activeImagePreview}
                      alt="Uploaded preview"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <label
                    htmlFor="active"
                    className="text-white bg-black p-4 rounded-full inline-block mt-4 cursor-pointer"
                  >
                    Active Image
                  </label>
                  <input
                    id="active"
                    type="file"
                    accept="image/*"
                    onChange={handleactiveImageChange}
                    className="hidden"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`${
                      InactiveImagePreview ? "block" : "hidden"
                    } bg-[#000000] w-12 h-12 rounded-[4px] flex justify-center items-center`}
                  >
                    <img
                      src={InactiveImagePreview}
                      alt="Uploaded preview"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <label
                    htmlFor="inactive"
                    className="text-white bg-black p-4 rounded-full inline-block mt-4 cursor-pointer"
                  >
                    Inactive Image
                  </label>
                  <input
                    id="inactive"
                    type="file"
                    accept="image/*"
                    onChange={handleInactiveImageChange}
                    className="hidden"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-center sm:justify-between mt-16">
                <button
                  type="button"
                  onClick={handleEditClose}
                  className="min-w-[150px] bg-[#E7E7E7] border border-[#D5D5D5] rounded-full p-3 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-w-[150px] bg-[#000000] border border-[#000000] rounded-full p-3 font-semibold text-white shadow-[0px_10px_17px_0px_#FD636312]"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
