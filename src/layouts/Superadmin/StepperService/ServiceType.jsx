import { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { FaBuilding, FaCamera, FaConciergeBell, FaUserFriends, FaRecordVinyl, FaMusic, FaVideo } from 'react-icons/fa';

const services = [
  { id: "venues", label: "Venues", icon: FaBuilding },
  { id: "decorations", label: "Decorations", icon: FaConciergeBell },
  { id: "catering", label: "Catering", icon: FaConciergeBell },
  { id: "djs", label: "DJ's", icon: FaMusic },
  { id: "entertainment", label: "Entertainment", icon: FaRecordVinyl },
  { id: "photo-video", label: "Photography & Videography", icon: FaCamera },
  { id: "photography", label: "Photography", icon: FaCamera },
  { id: "videography", label: "Videography", icon: FaVideo },
  { id: "staff", label: "Staff", icon: FaUserFriends },
];

const ServiceType = () => {
  const [selectedService, setSelectedService] = useState("");

  return (
    <div className="py-12">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2">Step 01</p>
          <div>
            <h2 className="text-[#171717] font-bold xl:text-6xl lg:text-5xl text-3xl mt-5">Which Best Describes Your Service?</h2>
            <p className="text-[#171717] mt-3 text-lg">
              Join thousands of Vendors renting their Service for meetings, events, and film and photo shoots.
            </p>
          </div>
        </div>
        <div>
          <div className="w-full max-w-md mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">What type of Service do you have?</h2>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="service-select-label">Select Service</InputLabel>
              <Select sx={{backgroundColor: '#F7FBFF', fontFamily: 'tt_chocolates'}}
                labelId="service-select-label"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                label="Select Service"
              >
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <MenuItem sx={{backgroundColor: '#F7FBFF', fontFamily: 'tt_chocolates'}} key={service.id} value={service.id} className="flex items-center gap-2">
                      {Icon && <Icon className="h-4 w-4 text-gray-500" />}
                      <span>{service.label}</span>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceType;
