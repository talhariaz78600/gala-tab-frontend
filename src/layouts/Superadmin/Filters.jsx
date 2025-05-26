import React from "react";
import editIcon from "../../assets/img/edit-icon.png";
import DeletePopup from "../../components/DeletePopup";
import { Modal } from "@mui/material";
import { RiCloseCircleFill } from "react-icons/ri";
import down from "../../assets/img/down.png";

export default function Filters() {
  const [Editopen, setEditOpen] = React.useState(false);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const columns = [
    { Header: "Category" },
    { Header: "Filter" },
    { Header: "Action" },
  ];

  const CountryData = {
    Venues: [
      "Elevator",
      "Ground floor",
      "Wheelchair accessible",
      "Tables & Chairs",
      "Buffet Area",
      "Bar",
    ],
    Decorations: [
      "Gender reveal",
      "Baby shower",
      "Sweet 16",
      "Religious Event",
      "Quinceanera",
      "Milestone birthdays",
    ],
    Catering: [
      "Gender reveal",
      "Baby shower",
      "Sweet 16",
      "Religious Event",
      "Quinceanera",
      "Milestone birthdays",
    ],
    Entertainment: [
      "Gender reveal",
      "Baby shower",
      "Sweet 16",
      "Religious Event",
      "Quinceanera",
      "Milestone birthdays",
    ],
  };

  const categoryOptions = [
    "Venues",
    "Decorations",
    "Catering",
    "Cakes",
    "DJ’s",
    "Photography & Videography",
    "Transportation",
    "Beauty",
    "Staff",
    "Fashion",
    "Equipment",
  ];

  return (
    <div className="min-h-[calc(100dvh-130px)] bg-[#F7F7F7] rounded-[20px] p-5">
      <div className="flex justify-between items-center">
        <p className="text-[28px] leading-normal font-semibold">Filters</p>
        <button
          onClick={handleEditOpen}
          className="border p-3 bg-white border-[#000000] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
        >
          Add Filter
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
            {Object.entries(CountryData).map(([category, filters]) =>
              filters.map((filter, index) => (
                <tr key={`${category}-${index}`}>
                  <td className="p-4 bg-white">{category}</td>
                  <td className="p-4 bg-white">{filter}</td>
                  <td className="p-4 bg-white">
                    <div className="flex items-center gap-2">
                      <button onClick={handleEditOpen} to="#">
                        <img
                          className="w-[50px] aspect-square max-w-[50px]"
                          src={editIcon}
                          alt="Edit"
                        />
                      </button>
                      <DeletePopup />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Modal
        open={Editopen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] bg-white rounded-[20px] outline-none">
          <form action="">
            <div className="p-4 flex justify-between items-center flex-wrap-reverse border-b border-[#CDCDCD]">
              <p className="sm:text-[26px] font-semibold">Filter</p>
              <button>
                <RiCloseCircleFill
                  className="text-[24px] text-[#C13515]"
                  onClick={handleEditClose}
                />
              </button>
            </div>
            <div className="p-4 max-h-[calc(100dvh-200px)] overflow-y-auto scroll-x-hidden">
              <div>
                <label className="font-medium ps-2" htmlFor="SelectCategory">
                  Select Category
                </label>
                <select
                  style={{
                    backgroundImage: `url(${down})`,
                    backgroundPosition: "right 20px center",
                  }}
                  className="w-full mt-1 p-4 pe-12 border focus:outline-none border-[#D4D7E3] rounded-[10px] bg-no-repeat appearance-none"
                  name="SelectCategory"
                  id="SelectCategory"
                >
                  <option value="none">Select</option>
                  {categoryOptions.map((label, index) => (
                    <option key={index} value={`option${index}`}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label className="font-medium ps-2" htmlFor="filtername">
                  Filter Name
                </label>
                <input
                  className="w-full mt-1 p-4 border focus:outline-none border-[#D4D7E3] rounded-[10px]"
                  type="text"
                  name="filtername"
                  id="filtername"
                />
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
