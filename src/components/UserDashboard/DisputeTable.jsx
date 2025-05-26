import React from "react";
import editIcon from "../../assets/img/edit-icon.png";
import deleteIcon from "../../assets/img/delete-icon.png";
import { Link, useNavigate } from "react-router";
import messageIcon from "../../assets/img/messageIcon.png";
import { IoSearch } from "react-icons/io5";
import DeletePopup from "../DeletePopup";

export default function DisputeTable() {
  const navigate = useNavigate();

  const columns = [
    { Header: "Property ID" },
    { Header: "Property" },
    { Header: "Description of Dispute" },
    { Header: "Action" },
  ];

  const listingData = [
    {
      ID: 9090,
      name: "Booking name here",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum magni odit laborum quos itaque commodi earum placeat inventore, asperiores quod iste soluta dolorem laudantium facere, maiores cumque voluptatibus reiciendis nobis!",
    },
    {
      ID: 9090,
      name: "Booking name here",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum magni odit laborum quos itaque commodi earum placeat inventore, asperiores quod iste soluta dolorem laudantium facere, maiores cumque voluptatibus reiciendis nobis!",
    },
    {
      ID: 9090,
      name: "Booking name here",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum magni odit laborum quos itaque commodi earum placeat inventore, asperiores quod iste soluta dolorem laudantium facere, maiores cumque voluptatibus reiciendis nobis!",
    },
  ];
  return (
    <div>
      <div className="flex justify-end">
        <label className="w-full max-w-[500px]" htmlFor="search">
          <div className="flex items-center bg-white p-3 border rounded-[10px]">
            <IoSearch />
            <input
              className="w-full px-2"
              type="search"
              name="search"
              id="search"
            />
          </div>
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  className="bg-black text-white text-left px-4 py-5 text-lg first:rounded-s-[10px] last:rounded-e-[10px] font-medium last:text-end"
                  key={index}
                >
                  {col.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-medium">
            {listingData.map((row, index) => (
              <tr key={index}>
                <td className="p-4 bg-white rounded-s-[10px]">{row.ID}</td>
                <td className="p-4 bg-white">
                  <p
                    className="cursor-pointer"
                    onClick={() => navigate("/user-dashboard/dispute-details")}
                  >
                    {row.name}
                  </p>
                </td>
                <td className="p-4 bg-white">
                  <p
                    title={row.desc}
                    className="w-[400px] text-wrap line-clamp-2 overflow-hidden"
                  >
                    {row.desc}
                  </p>
                </td>
                <td className="p-4 bg-white rounded-e-[10px]">
                  <div className="flex items-center justify-end gap-2">
                    <Link to="/user-dashboard/add-disputes">
                      <img
                        className="w-[50px] aspect-square max-w-[50px]"
                        src={editIcon}
                        alt=""
                      />
                    </Link>
                    <div>
                    <DeletePopup/>
                    </div>
                    <Link to="/user-inbox">
                      <img
                        className="w-[50px] aspect-square max-w-[50px]"
                        src={messageIcon}
                        alt=""
                      />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
