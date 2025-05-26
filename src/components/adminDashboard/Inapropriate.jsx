import React from "react";
import guest from "../../assets/img/guest-img2.png";
import serviceImg from "../../assets/img/serviceImg.png";
import StarRatingCustomSize from "./StarRatingCustomSize";
import DeletePopup from "../DeletePopup";

export default function Inapropriate() {
  const columns = [
    { Header: "User" },
    { Header: "Review" },
    { Header: "Status" },
    { Header: "Action" },
  ];

  const AllUsersData = [
    {
      User: "user",
      review: "lorem ipsum dolor sit amet",
      status: "Inappropriate review",
    },
    {
      User: "user",
      review: "lorem ipsum dolor sit amet",
      status: "Inappropriate review",
    },
    {
      User: "user",
      review: "lorem ipsum dolor sit amet",
      status: "Inappropriate review",
    },
    {
      User: "user",
      review: "lorem ipsum dolor sit amet",
      status: "Inappropriate review",
    },
  ];
  return (
    <div className="overflow-x-auto">
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
          {AllUsersData.map((row, index) => (
            <tr key={index}>
              <td className="p-4 bg-white">
                <div className="flex items-center">
                  <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {row.User}
                  </p>
                </div>
              </td>
              <td className="p-4 bg-white">
                <div className="flex items-center">
                  <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                   {row.review}</p>
                </div>
              </td>
              <td className="p-4 bg-white">{row.status}</td>
              <td className="p-4 bg-white">
                <DeletePopup/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
