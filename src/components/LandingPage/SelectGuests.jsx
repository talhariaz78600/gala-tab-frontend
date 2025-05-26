import React, { useState, useEffect } from "react";
import InputNumber from "../VendorDashboard/InputNumber";

const SelectGuest = ({ onChange }) => {
  const [guestCount, setGuestCount] = useState(0);

  useEffect(() => {
    onChange?.(guestCount);
  }, [guestCount, onChange]);

  return (
    <div>
      <div className="shadow-xl p-3 rounded-xl bg-white m-3 border">
        <div className="flex items-center justify-between bg-[#F7F7F7] p-3 rounded-xl gap-4">
          <div>
            <h5 className="font-semibold text-black ">Total Guests</h5>
          </div>
          <InputNumber count={guestCount} setCount={setGuestCount} />
        </div>
      </div>
    </div>
  );
};

export default SelectGuest;
