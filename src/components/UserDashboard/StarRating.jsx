import React from "react";

const StarRating = ({
  totalStars = 5,
  isInteractive = true,
  rating = 0,
  onRatingChange = () => {},
}) => {
  const handleRating = (index) => {
    if (isInteractive) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleRating(index)}
          style={{
            cursor: isInteractive ? "pointer" : "default",
            color: index < rating ? "#FF9900" : "gray",
            fontSize: "24px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
