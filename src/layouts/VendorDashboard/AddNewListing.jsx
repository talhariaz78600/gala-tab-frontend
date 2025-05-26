import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";
import decoration from "../../assets/img/decoration.png";
import { GoDotFill } from "react-icons/go";
import FindListingModal from "../../components/VendorDashboard/FindListingModal";

export default function AddNewListing() {
  const ListingItems = [
    {
      text: "Catering",
      image: decoration,
    },
    {
      text: "DJ’s",
      image: decoration,
    },
    {
      text: "Decoration",
      image: decoration,
    },
  ];
  return (
    <div>
      <div className="border border-b">
        <div className="mycontainer">
          <div className="flex items-center justify-between py-3">
            <div>
              <Link
                to="/vendor-dashboard/dashboard"
                className="bg-gradient-to-b inline-block from-gray-500 to-gray-900 text-white me-2 text-nowrap font-semibold py-3 px-5 sm:px-8 rounded-full border-4 border-black shadow-md"
              >
                Gala Tab
              </Link>
            </div>
            <div>
              <Link
                to="/vendor-dashboard/service-listing"
                className="bg-white border inline-block py-2 px-4 shadow-xl rounded-3xl"
              >
                Exit Page
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <div className="mycontainer">
          <div className="max-w-[800px] mx-auto">
            <p className="text-[40px] font-bold text-center">
              Welcome back, Kevin
            </p>
            <div className="mt-8">
              <p className="font-medium text-[24px] ps-2">
                Start a new service listing
              </p>
              <div className="bg-white p-8 sm:p-10 flex items-center justify-between rounded-[20px] shadow-[0px_8px_24px_0px_#00000012]">
                <p className="text-lg font-medium">Create a new listing</p>
                <Link to="/vendor-started">
                  <FaChevronRight className="text-[20px]" />
                </Link>
              </div>
            </div>
            <div className="mt-8">
              <p className="font-medium text-[24px] ps-2">Find your listing</p>
              <div className="bg-[#F7F7F7] rounded-[20px] p-2">
                <div className="h-full overflow-y-auto black-scrollbar max-h-[400px] p-2">
                  {ListingItems.map((item) => (
                    <div className="flex items-center gap-4 justify-between border-b pb-4 mb-4">
                      <div className="flex items-center gap-4 ">
                        <img
                          className="max-w-[100px] aspect-square object-cover rounded-[10px]"
                          src={item.image}
                          alt="img"
                        />
                        <p className="text-lg font-medium">{item.text}</p>
                      </div>
                      <div className="flex items-center gap-6 ms-auto">
                        <div className="flex items-center gap-2">
                          <GoDotFill className="text-[#EA3548]" />
                          <p className="text-[14px] font-medium text-nowrap">
                            In Progress
                          </p>
                        </div>
                        <div>
                          <FindListingModal />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
