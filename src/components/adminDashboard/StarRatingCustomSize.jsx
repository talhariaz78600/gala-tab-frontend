import React, { useState } from "react";

const StarRatingCustomSize = ({ totalStars = 5, isInteractive = true,initialstars=0,size }) => {
  const [rating, setRating] = useState(initialstars);

  const handleRating = (index) => {
    if (isInteractive) {
      setRating(index + 1); // Update rating only if interactive
    }
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleRating(index)}
          style={{
            color: index < rating ? "#FF9900" : "gray",
          }}
          className={`cursor-pointer text-[${size}]`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRatingCustomSize;
