import React from "react";
import guestimg from "../../assets/img/guest-img.png";
import elipsis from "../../assets/img/elipsis.png";
import { Popover } from "@mui/material";
import { useNavigate } from "react-router";
import { IoSearch } from "react-icons/io5";

export default function UsersAccountTable({ handleOpen, data }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const columns = [
    { Header: "Full Name" },
    { Header: "Primary Role" },
    { Header: "Phone Number" },
    { Header: "Email" },
    { Header: "Status" },
    { Header: "Actions" },
  ];

  const listingData = [
    {
      name: "Decoration Wedding",
      guestimg: guestimg,
      guestname: "requestpersonname",
      role: "User",
      phone: "+21 213 332 435",
      email: "jane@example.com",
      status: "Active",
    },
    {
      name: "Decoration Wedding",
      guestimg: guestimg,
      guestname: "requestpersonname",
      role: "User",
      phone: "+21 213 332 435",
      email: "jane@example.com",
      status: "Suspend",
    },
    {
      name: "Decoration Wedding",
      guestimg: guestimg,
      guestname: "requestpersonname",
      role: "User",
      phone: "+21 213 332 435",
      email: "sam@example.com",
      status: "Inactive",
    },
    {
      name: "Decoration Wedding",
      guestimg: guestimg,
      guestname: "requestpersonname",
      role: "User",
      phone: "+21 213 332 435",
      email: "lucy@example.com",
      status: "Active",
    },
    {
      name: "Decoration Wedding",
      guestimg: guestimg,
      guestname: "requestpersonname",
      role: "User",
      phone: "+21 213 332 435",
      email: "lucy@example.com",
      status: "Active",
    },
  ];
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
          <thead>
            <tr>
              <th className="bg-black text-white text-left px-4 py-5 text-lg rounded-s-[10px] font-medium">
                <input
                  className="size-6 min-w-6 accent-black"
                  type="checkbox"
                  name=""
                  id=""
                />
              </th>
              {columns.map((col, index) => (
                <th
                  className="bg-black text-white text-left px-4 py-5 text-lg last:rounded-e-[10px] last:text-end font-medium"
                  key={index}
                >
                  {col.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-medium">
            {data?.length > 0 ? (
              data?.map((row, index) => (
                <tr key={index}>
                  <td className="p-4 rounded-s-[10px] bg-white">
                    <input
                      className="size-6 min-w-6 accent-black"
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </td>
                  <td className="p-4 bg-white">
                    <div className="flex items-center">
                      {/* <img
                               className="size-12 rounded-full object-cover me-2 max-w-[50px]"
                               src={row.guestimg}
                               alt=""
                             /> */}
                      <p
                        onClick={() =>
                          navigate("/admin-dashboard/vendor-account-profile")
                        }
                        className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer"
                      >
                        {row.firstName} {row.lastName}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 bg-white">{row.role}</td>
                  <td className="p-4 bg-white">{row.contact}</td>
                  <td className="p-4 bg-white">{row.email}</td>
                  <td className="p-4 bg-white">
                    <p
                      className={`p-3 min-w-[100px] flex justify-center rounded-full text-sm ${
                        row.status === "Active"
                          ? "bg-[#34A85333] text-[#34A853]"
                          : row.status === "Suspend"
                          ? "text-[#C13515] bg-[#F3D7D0]"
                          : row.status === "Inactive"
                          ? "text-[#666766] bg-[#91939233]"
                          : ""
                      }`}
                    >
                      {row.status}
                    </p>
                  </td>
                  <td className="p-4 bg-white rounded-e-[10px]">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={handleClick}>
                        <img
                          className="size-12 max-w-12"
                          src={elipsis}
                          alt="img"
                        />
                      </button>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        sx={{
                          "& .MuiPopover-paper": {
                            boxShadow: "0px 0px 14px 0px #0000001A",
                            borderRadius: "10px",
                          },
                        }}
                      >
                        <ul className="min-w-[120px] bg-white p-2">
                          <li>
                            <button className="p-2 w-full hover:bg-[#F7F7F7] rounded-[10px] text-start text-sm font-medium">
                              Active
                            </button>
                          </li>
                          <li>
                            <button className="p-2 w-full hover:bg-[#F7F7F7] rounded-[10px] text-start text-sm font-medium">
                              Inactive
                            </button>
                          </li>
                          <li>
                            <button className="p-2 w-full hover:bg-[#F7F7F7] rounded-[10px] text-start text-sm font-medium">
                              Suspend
                            </button>
                          </li>
                          <li>
                            <button className="p-2 w-full hover:bg-[#F7F7F7] rounded-[10px] text-start text-sm font-medium">
                              Delete
                            </button>
                          </li>
                        </ul>
                      </Popover>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p className="text-center text-lg font-medium text-black py-4">
                No data available{" "}
              </p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
