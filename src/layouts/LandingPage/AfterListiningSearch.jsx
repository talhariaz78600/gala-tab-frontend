import React, { useState } from "react";
import Filters from "../../components/LandingPage/Filters";
import { FiFilter } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import ListingCard from "./ListiningCard";
import MapComponent from "./MapComponent";
import SliderImg from "../../assets/img/slider-img.png";
import SliderImgTwo from "../../assets/img/slider-img2.png";
import SliderImgThree from "../../assets/img/slider-img3.png";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "12px",
};

// Map center location
const center = {
  lat: 46.1603291,
  lng: -1.1574211,
};

const AfterListingSearch = () => {
  const [selectedListing, setSelectedListing] = useState(null);

  const listings = [
    {
      id: 1,
      images: [SliderImg, SliderImgTwo, SliderImgThree],
      title: "Modern Wedding Hall",
      guests: [45, 60],
      price: ["$200/hr", "$250/hr"],
      location: "100 Smart Street, LA, USA",
      reviews: 3,
      // price: 120,
      coords: { lat: 46.1603291, lng: -1.1574211 },
    },
    {
      id: 2,
      images: [SliderImgTwo, SliderImg],
      title: "Modern Wedding Hall",
      guests: [45, 60],
      price: ["$200/hr", "$250/hr"],
      location: "100 Smart Street, LA, USA",
      reviews: 3,
      // price: 120,
      coords: { lat: 46.1603291, lng: -1.1574211 },
    },
    {
      id: 3,
      images: [SliderImgTwo, SliderImg],
      title: "Modern Wedding Hall",
      guests: [45, 60],
      price: ["$200/hr", "$250/hr"],
      location: "100 Smart Street, LA, USA",
      reviews: 3,
      // price: 120,
      coords: { lat: 46.1603291, lng: -1.1574211 },
    },
    {
      id: 4,
      images: [SliderImgTwo, SliderImg],
      title: "Modern Wedding Hall",
      guests: [45, 60],
      price: ["$200/hr", "$250/hr"],
      location: "100 Smart Street, LA, USA",
      reviews: 3,
      // price: 120,
      coords: { lat: 46.1603291, lng: -1.1574211 },
    },
  ];

  return (
    <div className="mycontainer">
      <div className="mt-14 rounded-lg max-w-[1200px]">
        <Filters />
      </div>

      <div className="w-full flex items-center justify-between mt-10 p-2 flex-wrap">
        <div>
          <p className="heading2">45 Decoration spaces near France</p>
        </div>
        <div className="items-center gap-3 border hidden border-[#979797] text-[#979797] p-2 rounded-md ms-auto">
          <FiFilter size={20} />
          <strong>Filter</strong>
          <IoMdArrowDropdown size={20} />
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid lg:grid-cols-2 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 w-full mt-6 gap-2">
        {/* Listings Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {listings.map((listing, index) => (
            <ListingCard
              key={index}
              images={listing.images}
              profile={listing.profile} // Undefined
              title={listing.title}
              rating={listing.rating} // Undefined
              location={listing.location}
              price={listing.price}
            />
          ))}
        </div>

        {/* Google Map */}
        <div className="w-full mt-3">
          <MapComponent
            listings={listings}
            mapContainerStyle={mapContainerStyle}
            center={center}
          />
        </div>
      </div>
    </div>
  );
};

export default AfterListingSearch;
