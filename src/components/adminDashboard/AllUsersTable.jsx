import React from "react";
import guest from "../../assets/img/guest-img2.png";
import { Link } from "react-router";
import editIcon from "../../assets/img/edit-icon.png";
import deleteIcon from "../../assets/img/delete-icon.png";
import DeletePopup from "../DeletePopup";

export default function AllUsersTable() {
  const columns = [
    { Header: "Full Name" },
    { Header: "Primary Role" },
    { Header: "Phone Number" },
    { Header: "Email" },
    { Header: "Status" },
    { Header: "Action" },
  ];

  const AllUsersData = [
    {
      userImg: guest,
      username: "requestpersonname",
      role: "Admin",
      phone: "+21 213 332 435",
      email: "client@gmail.com",
      status: "Active",
    },
    {
      userImg: guest,
      username: "requestpersonname",
      role: "Venue Manager",
      phone: "+21 213 332 435",
      email: "client@gmail.com",
      status: "Active",
    },
    {
      userImg: guest,
      username: "requestpersonname",
      role: "Vendor Manager",
      phone: "+21 213 332 435",
      email: "client@gmail.com",
      status: "Inactive",
    },
    {
      userImg: guest,
      username: "requestpersonname",
      role: "Admin",
      phone: "+21 213 332 435",
      email: "client@gmail.com",
      status: "Inactive",
    },
    {
      userImg: guest,
      username: "requestpersonname",
      role: "Admin",
      phone: "+21 213 332 435",
      email: "client@gmail.com",
      status: "Active",
    },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                className="bg-black text-white text-left px-4 py-5 text-lg first:rounded-s-[10px] last:rounded-e-[10px] font-medium"
                key={col.accessor}
              >
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-medium">
          {AllUsersData.map((row) => (
            <tr key={row.id}>
              <td className="p-4 bg-white rounded-s-[10px]">
                <div className="flex items-center">
                  <img
                    className="size-12 rounded-full object-cover me-2 max-w-[50px]"
                    src={row.userImg}
                    alt=""
                  />
                  <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {row.username}
                  </p>
                </div>
              </td>
              <td className="p-4 bg-white">{row.role}</td>
              <td className="p-4 bg-white">{row.phone}</td>
              <td className="p-4 bg-white">{row.email}</td>
              <td className="p-4 bg-white">
                <p
                  className={`${
                    row.status === "Active"
                      ? "text-[#34A853]"
                      : "text-[#EA3548]"
                  }`}
                >
                  {row.status}
                </p>
              </td>
              <td className="p-4 bg-white rounded-e-[10px]">
                <div className="flex items-center gap-2">
                  <Link to="/admin-dashboard/add-new-user">
                    <img
                      className="w-[50px] aspect-square max-w-[50px]"
                      src={editIcon}
                      alt=""
                    />
                  </Link>
                  <DeletePopup/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
