// TabCardSkeleton.jsx
import React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function TabCardSkeleton() {
  return (
    <div className="landing-page-tab-card w-full sm:w-1/2 md:w-1/3 min-[992px]:w-1/4 min-[1200px]:w-1/5 p-3">
      <div className="border p-2 rounded-[10px] bg-white">
        {/* Image */}
        <Skeleton
          variant="rectangular"
          height={200}
          className="rounded-[5px]"
        />

        <div className="py-3 px-1">
          {/* Title and Rating */}
          <div className="flex justify-between items-center">
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="circular" width={24} height={24} />
          </div>

          {/* Location */}
          <Skeleton variant="text" width="80%" height={20} className="mt-2" />

          {/* Price */}
          <Skeleton variant="text" width="40%" height={20} className="mt-3" />
        </div>
      </div>
    </div>
  );
}
