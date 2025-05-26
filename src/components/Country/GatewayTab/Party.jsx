import React from 'react';
import MapTab from "../../../assets/img/map-tab.png";

const Party = () => {
  const Parties = [
    { country: "United States", verified: true },
    { country: "Pakistan", verified: true },
    { country: "India", verified: true },
    { country: "New York", verified: true },
    { country: "London", verified: true },
    { country: "Dubai", verified: true },

  ];

  return (
    <div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        {Parties.map((studio, index) => (
          <div key={index} className="bg-white p-2 border rounded-lg">
            <div className="relative">
              <img src={MapTab} alt={studio.country} className="w-full h-full object-cover" />
              {studio.verified && (
                <div className="absolute top-1 left-1">
                  <p className="p-2 text-xs rounded-lg shadow-xl bg-white">Verified listing</p>
                </div>
              )}
            </div>
            <p className="text-[#171717] font-semibold text-lg mt-2">{studio.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Party;
