import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { FaStar, FaHeart } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import icon from "../../assets/img/buttonIcon.png";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import LikeButton from "@/components/LandingPage/LikeButton";

const MapComponent = ({ listings, mapContainerStyle }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [likedMarkers, setLikedMarkers] = useState({});
  const infoWindowRef = useRef(null);

  useEffect(() => {
    if (mapRef && listings?.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      listings.forEach((listing, i) => {
        if (listing.location?.latitude && listing.location?.longitude) {
          const offsetLat = listing.location.latitude + i * 0.0001;
          const offsetLng = listing.location.longitude + i * 0.0001;
          bounds.extend({ lat: offsetLat, lng: offsetLng });
        }
      });
      mapRef.fitBounds(bounds);
      mapRef.setZoom(mapRef.getZoom() - 3);
    }
  }, [mapRef, listings]);

  const toggleLike = (index) => {
    setLikedMarkers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleMarkerClick = (index) => {
    if (index === selectedMarker) {
      return;
    }
    setSelectedMarker(index);
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex">
      <div className="relative w-full">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          onLoad={(map) => setMapRef(map)}
          onClick={() => setSelectedMarker(null)}
          zoom={6}
          center={
            listings?.length > 0 && listings[0].location?.latitude
              ? {
                  lat: listings[0].location.latitude,
                  lng: listings[0].location.longitude,
                }
              : { lat: 30.3753, lng: 69.3451 }
          }
          options={{
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
          }}
        >
          {listings?.map((listing, index) => {
            if (!listing.location?.latitude || !listing.location?.longitude)
              return null;
            const isSelected = selectedMarker === index;
            const offsetLat = listing.location.latitude + index * 0.0001;
            const offsetLng = listing.location.longitude + index * 0.0001;

            return (
              <React.Fragment key={index}>
                <MarkerF
                  position={{ lat: offsetLat, lng: offsetLng }}
                  label={{
                    text: `$ ${listing.totalPrice}`,
                    color: isSelected ? "white" : "#1c1c1c",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                  icon={{
                    url: isSelected
                      ? "https://maps.google.com/mapfiles/kml/paddle/red-circle.png"
                      : "https://maps.google.com/mapfiles/kml/paddle/blu-circle.png",
                    scaledSize: { width: 40, height: 40 },
                  }}
                  onClick={() => handleMarkerClick(index)}
                >
                  {isSelected ? (
                    <InfoWindowF onCloseClick={() => setSelectedMarker(null)}>
                      <div style={{ width: "300px" }}>
                        <div className="relative">
                          <Slider {...settings}>
                            {(listing.media.length === 1
                              ? [...listing.media, ...listing.media]
                              : listing.media
                            ).map((img, i) => (
                              <div key={i} className="relative">
                                <img
                                  src={img.url}
                                  alt={listing.key}
                                  className="w-full h-44 object-cover rounded-md"
                                />
                                <div className="absolute top-2 left-2">
                                  <p className="p-2 shadow bg-white rounded-xl text-[#1C1C1C] dark:text-black text-xs font-medium">
                                    Verified listing
                                  </p>
                                </div>
                                <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-2 flex justify-between text-white text-sm">
                                  <span className="flex items-center">
                                    <FiUsers className="me-2" />
                                    {listing.maxGuests} Guests
                                  </span>
                                  <span>${listing.totalPrice}</span>
                                </div>
                              </div>
                            ))}
                          </Slider>
                        </div>
                        <div className="mt-2">
                          <h4 className="font-medium text-lg text-[#1C1C1C]">
                            {listing.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <IoLocationOutline className="text-[#1C1C1C]" />
                            <p className="text-sm font-medium dark:text-black">
                              {listing.location.address}
                            </p>
                          </div>

                          <div className="flex items-center justify-end gap-2 mt-3">
                            <Link
                              to={`/listing-detail/${listing._id}`}
                              className="flex items-center gap-2 bg-[#1C1C1C] text-white  py-2 px-4 rounded-xl"
                            >
                              Detail{" "}
                              <img
                                src={icon}
                                className="size-[14px]"
                                alt="Detail Icon"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              </React.Fragment>
            );
          })}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapComponent;
