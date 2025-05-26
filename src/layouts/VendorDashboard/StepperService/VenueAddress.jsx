import React, { useRef, useState } from "react";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import { BsSendFill } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": { padding: theme.spacing(2) },
  "& .MuiDialogActions-root": { padding: theme.spacing(1) },
}));

const VenueAddress = () => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const autocompleteRef = useRef(null);
  const [center, setCenter] = useState({ lat: -33.8688, lng: 151.2093 });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [open, setOpen] = useState(false);

  const mapStyles = { height: "300px", width: "100%", borderRadius: "12px" };

  const updateLocation = (formattedAddress, lat, lng, addressComponents) => {
    const getAddressComponent = (type) =>
      addressComponents?.find((component) => component.types.includes(type))
        ?.long_name;

    const locationData = {
      address: formattedAddress,
      city: getAddressComponent("locality") || "Unknown",
      state: getAddressComponent("administrative_area_level_1") || "",
      country: getAddressComponent("country") || "",
      postalCode: getAddressComponent("postal_code") || "N/A",
      latitude: lat,
      longitude: lng,
    };

    setValue("location", locationData, { shouldDirty: true });
    setCenter({ lat, lng });
    setCurrentLocation({ lat, lng });
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
            import.meta.env.VITE_GOOGLE_MAP_API_KEY
          }`;

          try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status === "OK" && data.results.length > 0) {
              updateLocation(
                data.results[0].formatted_address,
                latitude,
                longitude,
                data.results[0].address_components
              );
            } else {
              alert(`Failed to fetch address details: ${data.status}`);
            }
          } catch (error) {
            console.error("Error fetching location details:", error);
            alert(
              "Error fetching location details. Check the console for details."
            );
          }
        },
        () => alert("Unable to retrieve your location.")
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="py-12">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2">
            Step 07
          </p>
          <h2 className="text-[#000] dark:text-white font-bold xl:text-6xl lg:text-5xl text-3xl mt-5">
            Enter Your Venue Address
          </h2>
          <p className="text-[#000] dark:text-white mt-3 text-lg">
            Your address stays private and is only shared with guests once
            they’ve locked in a reservation.
          </p>
        </div>
        <div>
          <div>
            <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
              onPlaceChanged={() => {
                const place = autocompleteRef.current?.getPlace();
                if (place) {
                  updateLocation(
                    place.formatted_address,
                    place.geometry?.location?.lat(),
                    place.geometry?.location?.lng(),
                    place.address_components
                  );
                }
              }}
            >
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                placeholder="Enter your address"
                {...register("location.address", {
                  required: "Address is required",
                })}
                value={watch("location.address") || ""} // Keeps input field updated
                onChange={(e) =>
                  setValue("location.address", e.target.value, {
                    shouldDirty: true,
                  })
                }
                error={!!errors?.location?.address}
                helperText={errors?.location?.address?.message}
              />
            </Autocomplete>

            {/* Use Current Location Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleUseCurrentLocation}
                className="bg-[#32F0CD] flex gap-2 items-center p-2 rounded-full pe-3 text-sm font-medium"
              >
                <BsSendFill className="bg-[#14D2AF] text-white rounded-full p-2 text-3xl" />
                Use my current location as a site office
              </button>
            </div>

            {/* Google Map Display */}
            <div className="mt-3 border shadow p-2 bg-white rounded-xl">
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={center}
              >
                {currentLocation && <Marker position={currentLocation} />}
              </GoogleMap>
            </div>
          </div>
          <React.Fragment>
            <button
              className="text-[#DB7F5B] underline"
              onClick={handleClickOpen}
            >
              Enter manual address
            </button>

            {Object.keys(errors.location || {}).length > 0 && (
              <p className="text-red-500 text-sm mt-1">
                Please fill in all required fields in the manual address form.
              </p>
            )}

            <BootstrapDialog
              sx={{
                "& .MuiDialog-paper": {
                  maxWidth: "700px",
                  width: "100%",
                  borderRadius: "30px",
                },
                fontFamily: "tt_chocolate",
              }}
              open={open}
            >
              <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }}>
                <p className="sm:text-xl text-sm">Confirm your address</p>
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{ position: "absolute", right: 8, top: 8, color: "grey" }}
              >
                <IoCloseCircle className="text-[#979797]" />
              </IconButton>
              <DialogContent dividers>
                <Typography gutterBottom>
                  <form
                    className="max-w-[600px] mx-auto"
                    onSubmit={handleSubmit(
                      (data) => {
                        // If form is valid, close the modal
                        handleClose();
                      },
                      (errors) => {
                        // Prevent modal from closing if there are validation errors
                        console.log("Validation errors:", errors);
                      }
                    )}
                  >
                    <p>
                      Your address is only shared with guests after they’ve made
                      a reservation.
                    </p>

                    {/* Country / Region */}
                    <div className="mb-3">
                      <label>Country / region</label>
                      <input
                        type="text"
                        className="shadow bg-white rounded-lg border w-full px-3 py-2"
                        placeholder="Type here"
                        {...register("location.country", {
                          validate: (value) =>
                            watch("location.address")
                              ? !!value || "Country is required"
                              : true,
                        })}
                      />
                      {errors.location?.country && (
                        <p className="text-red-500">
                          {errors.location.country.message}
                        </p>
                      )}
                    </div>

                    {/* Street Address */}
                    <div className="mb-3">
                      <label>Street address</label>
                      <input
                        type="text"
                        className="shadow bg-white rounded-lg border w-full px-3 py-2"
                        placeholder="Type here"
                        {...register("location.address", {
                          required: "Address is required",
                        })}
                      />
                      {errors.location?.address && (
                        <p className="text-red-500">
                          {errors.location.address.message}
                        </p>
                      )}
                    </div>

                    {/* City / Town / Village */}
                    <div className="mb-3">
                      <label>City / town / village</label>
                      <input
                        type="text"
                        className="shadow bg-white rounded-lg border w-full px-3 py-2"
                        placeholder="Type here"
                        {...register("location.city", {
                          validate: (value) =>
                            watch("location.address")
                              ? !!value || "City is required"
                              : true,
                        })}
                      />
                      {errors.location?.city && (
                        <p className="text-red-500">
                          {errors.location.city.message}
                        </p>
                      )}
                    </div>

                    {/* Province / State / Territory */}
                    <div className="mb-3">
                      <label>
                        Province / state / territory (if applicable)
                      </label>
                      <input
                        type="text"
                        className="shadow bg-white rounded-lg border w-full px-3 py-2"
                        placeholder="Type here"
                        {...register("location.state", {
                          validate: (value) =>
                            watch("location.address")
                              ? !!value || "State is required"
                              : true,
                        })}
                      />
                      {errors.location?.state && (
                        <p className="text-red-500">
                          {errors.location.state.message}
                        </p>
                      )}
                    </div>

                    {/* Zip Code */}
                    <div className="mb-3">
                      <label>Zip Code (if applicable)</label>
                      <input
                        min="0"
                        className="shadow bg-white rounded-lg border w-full px-3 py-2"
                        placeholder="Type here"
                        {...register("location.postalCode", {
                          validate: (value) => {
                            const addressFilled = watch("location.address");
                            if (addressFilled) {
                              if (!value) return "Zip Code is required";
                              if (Number(value) < 0)
                                return "Zip Code cannot be negative";
                            } else {
                              if (value && Number(value) < 0)
                                return "Zip Code cannot be negative";
                            }
                            return true;
                          },
                        })}
                      />
                      {errors.location?.postalCode && (
                        <p className="text-red-500">
                          {errors.location.postalCode.message}
                        </p>
                      )}
                    </div>

                    {/* Latitude */}
                    <div className="mb-3">
                      <label>Latitude</label>
                      <input
                        type="text"
                        className="shadow bg-white rounded-lg border w-full px-3 py-2"
                        placeholder="Latitude"
                        {...register("location.latitude", {
                          validate: (value) =>
                            watch("location.address")
                              ? !!value || "Latitude is required"
                              : true,
                        })}
                        readOnly
                      />
                      {errors.location?.latitude && (
                        <p className="text-red-500">
                          {errors.location.latitude.message}
                        </p>
                      )}
                    </div>

                    {/* Longitude */}
                    <div className="mb-3">
                      <label>Longitude</label>
                      <input
                        type="text"
                        className="shadow bg-white rounded-lg border w-full px-3 py-2"
                        placeholder="Longitude"
                        {...register("location.longitude", {
                          validate: (value) =>
                            watch("location.address")
                              ? !!value || "Longitude is required"
                              : true,
                        })}
                        readOnly
                      />
                      {errors.location?.longitude && (
                        <p className="text-red-500">
                          {errors.location.longitude.message}
                        </p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-between mt-4 gap-2">
                      <div>
                        <input
                          type="reset"
                          value="Clear"
                          className="underline"
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="bg-black text-white p-2 px-9 rounded-md"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </Typography>
              </DialogContent>
            </BootstrapDialog>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
};

export default VenueAddress;
