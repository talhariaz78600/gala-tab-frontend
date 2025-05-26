import React from "react";
import { useNavigate } from "react-router";
import guestImg from "../../assets/img/guest-img.png";
import { IoSearch } from "react-icons/io5";

export default function UserDisputeTable() {
  const navigate = useNavigate();

  const columns = [
    { Header: "Property ID" },
    { Header: "Property" },
    { Header: "User Name" },
    { Header: "Description of Dispute" },
    { Header: "Action" },
  ];

  const listingData = [
    {
      ID: 9090,
      name: "Booking name here",
      img: guestImg,
      username: "requestpersonname",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum magni odit laborum quos itaque commodi earum placeat inventore, asperiores quod iste soluta dolorem laudantium facere, maiores cumque voluptatibus reiciendis nobis!",
    },
    {
      ID: 9090,
      name: "Booking name here",
      img: guestImg,
      username: "requestpersonname",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum magni odit laborum quos itaque commodi earum placeat inventore, asperiores quod iste soluta dolorem laudantium facere, maiores cumque voluptatibus reiciendis nobis!",
    },
    {
      ID: 9090,
      name: "Booking name here",
      img: guestImg,
      username: "requestpersonname",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum magni odit laborum quos itaque commodi earum placeat inventore, asperiores quod iste soluta dolorem laudantium facere, maiores cumque voluptatibus reiciendis nobis!",
    },
    {
      ID: 9090,
      name: "Booking name here",
      img: guestImg,
      username: "requestpersonname",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum magni odit laborum quos itaque commodi earum placeat inventore, asperiores quod iste soluta dolorem laudantium facere, maiores cumque voluptatibus reiciendis nobis!",
    },
    {
      ID: 9090,
      name: "Booking name here",
      img: guestImg,
      username: "requestpersonname",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum magni odit laborum quos itaque commodi earum placeat inventore, asperiores quod iste soluta dolorem laudantium facere, maiores cumque voluptatibus reiciendis nobis!",
    },
    {
      ID: 9090,
      name: "Booking name here",
      img: guestImg,
      username: "requestpersonname",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum magni odit laborum quos itaque commodi earum placeat inventore, asperiores quod iste soluta dolorem laudantium facere, maiores cumque voluptatibus reiciendis nobis!",
    },
    {
      ID: 9090,
      name: "Booking name here",
      img: guestImg,
      username: "requestpersonname",
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
                    onClick={() => navigate("/admin-dashboard/dispute-details")}
                  >
                    {row.name}
                  </p>
                </td>
                <td className="p-4 bg-white">
                  <div className="flex items-center">
                    <img
                      className="size-12 rounded-full object-cover me-2 max-w-[50px]"
                      src={row.img}
                      alt=""
                    />
                    <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {row.username}
                    </p>
                  </div>
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
                    <button className="text-white font-medium bg-[#3551B6] border border-black p-3 min-w-[120px] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]">
                      Review
                    </button>
                    <button className="text-white font-medium bg-[#34A853] border border-black p-3 min-w-[120px] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]">
                      Accept
                    </button>
                    <button className="text-white font-medium bg-[#D92D20] border border-black p-3 min-w-[120px] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]">
                      Reject
                    </button>
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
