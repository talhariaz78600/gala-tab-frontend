import React from "react";
import TabCardImg from "../../assets/img/tabcard-img.png";
import TabCard from "./TabCard";
import { Link } from "react-router";
import Profile from "../../assets/img/card-profile.png";
import DefaultImg from "../../assets/img/default-image.jpg";

export default function VanueTab({ listingData, onLikeUpdate }) {
  return (
    <div>
      <div className="-mx-3 flex flex-wrap">
        {listingData.map((card, index) => (
          <TabCard
            key={index}
            id={card._id}
            media={card?.media}
            title={card?.title}
            rating={card?.rating || 0}
            location={card.location?.country}
            price={card?.totalPrice}
            Profile={card?.vendorId?.profilePicture}
            likedByData={card?.likedBy}
            onLikeUpdate={onLikeUpdate}
          />
        ))}
      </div>
    </div>
  );
}
