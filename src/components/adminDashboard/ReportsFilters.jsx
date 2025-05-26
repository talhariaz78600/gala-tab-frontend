import React from "react";
import carateIcon from "../../assets/img/carateIcon.png";

export default function ReportsFilters() {
  return (
    <div>
      <div>
        <p className="text-[#3551B6] text-base font-medium">Report period</p>
        <div className="max-w-[800px]">
          <div className="flex items-center flex-wrap justify-between gap-y-4">
            <div className="w-full lg:w-[calc(50%-16px)]">
              <select
                style={{
                  backgroundImage: `url(${carateIcon})`,
                  backgroundPosition: "calc(100% - 10px) center",
                }}
                className="appearance-none p-3 focus:outline-none border border-[#D3D3D3] rounded-[5px] w-full bg-no-repeat pe-8"
                name=""
                id=""
              >
                <option value="">Last Month</option>
              </select>
            </div>
            <div className="w-full lg:w-[calc(50%-16px)]">
              <div className="flex items-center flex-wrap gap-4">
                <input
                  className="p-3 border border-[#D3D3D3] rounded-[5px]"
                  type="date"
                  name=""
                  id=""
                />
                <p>to</p>
                <input
                  className="p-3 border border-[#D3D3D3] rounded-[5px]"
                  type="date"
                  name=""
                  id=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
