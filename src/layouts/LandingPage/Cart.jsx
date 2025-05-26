import React from "react";
import { Link } from "react-router";
import Del from "../../assets/img/del.png";
import List from "../../assets/img/list-detail2.png";
import listImgTwo from "../../assets/img/list-detail2.png";
import { PiMedalMilitaryFill } from "react-icons/pi";
import { FaSquarePlus } from "react-icons/fa6";
import { BiSolidMinusSquare } from "react-icons/bi";
import DeletePopup from "../../components/DeletePopup";

const Cart = () => {
  const columns = [
    { Header: "Product Name" },
    { Header: "Price" },
    { Header: "Check-IN date and Time" },
    { Header: "Check-Out date and Time" },
    { Header: "Quantity" },
    { Header: "Action" },
  ];

  const AllUsersData = [
    {
      ServiceName: "Decoration wedding",
      Image: List,
      Price: "$:300",
      CheckIn: '06/01/2024 - 09:00AM',
      CheckOut: '06/01/2024 - 09:00AM',
      Quantity: "10 / this month",
      status: "Booked",
    },
  ];
  return (
    <div className="mycontainer">
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-4 py-3">
        <div className="xl:col-start-1 xl:col-end-3">
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
                {AllUsersData.map((row, index) => (
                  <tr key={index}>
                    <td className="p-4 bg-[#f7f7f7] rounded-s-[10px]">
                      <div className="flex items-center">
                        <img
                          className=" w-[90px] rounded-xl h-[70px] object-cover me-2 max-w-[90px]"
                          src={row.Image}
                          alt=""
                        />
                        <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                          {row.ServiceName}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 bg-[#f7f7f7] ">{row.Price}</td>
                    <td className="p-4 bg-[#f7f7f7] ">{row.Quantity}</td>
                    <td className="p-4 bg-[#f7f7f7] ">{row.CheckIn}</td>
                    <td className="p-4 bg-[#f7f7f7] ">{row.CheckOut}</td>
                    <td className="p-4 bg-[#f7f7f7] rounded-e-[10px]">
                      <DeletePopup/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-3">
          <div className="">
            <h4 className="font-semibold text-2xl text-center">Order Summary</h4>
          </div>
          <div className="flex items-center justify-between gap-2 border-b p-2 mt-3">
          <div className="flex items-center gap-3">
            <div>
              <img
                src={listImgTwo}
                alt=""
                className="w-14 h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <h5 className="font-medium text-lg">
                Glacier Pines Cabin{" "}
              </h5>
              <p className="flex items-center gap-1 text-[#5E5E5E] font-medium text-sm">
                <PiMedalMilitaryFill /> Super Vendor
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
              <FaSquarePlus className="text-[#000] text-xl"/>
              <p>1</p>
              <BiSolidMinusSquare className="text-[#000] text-xl"/>
          </div>
          </div>
          <div className="flex items-center justify-between gap-2 border-b p-2">
          <div className="flex items-center gap-3">
            <div>
              <img
                src={listImgTwo}
                alt=""
                className="w-14 h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <h5 className="font-medium text-lg">
                 Pines Cabin{" "}
              </h5>
              <p className="flex items-center gap-1 text-[#5E5E5E] font-medium text-sm">
                <PiMedalMilitaryFill /> Super Vendor
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
              <FaSquarePlus className="text-[#000] text-xl"/>
              <p>1</p>
              <BiSolidMinusSquare className="text-[#000] text-xl"/>
          </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between ">
              <p className="font-medium text-[#222222] text-lg">Glacier Pines Cabin</p>
              <p>$375</p>
            </div>
            <div className="flex items-center justify-between ">
              <p className="font-medium text-[#222222] text-lg">
                Pines Cabin
              </p>
              <p>$75</p>
            </div>
            <div className="flex items-center justify-between ">
              <p className="font-medium text-[#222222] text-lg">Tax</p>
              <p>$0.00</p>
            </div>
            <div className="flex items-center justify-between ">
              <p className="font-medium text-[#222222] text-lg">Discount</p>
              <p>$0.00</p>
            </div>
            <div className="flex items-center justify-between border-b py-3">
              <p className="font-medium text-[#222222] text-lg">Total</p>
              <p>$440</p>
            </div>
            <div className="mt-6">
              <button className="w-full bg-black text-white rounded-full p-2 font-medium text-lg">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
