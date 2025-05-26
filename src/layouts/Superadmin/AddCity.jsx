import React, { useState, useEffect, useContext } from "react";
import { Country, State, City } from "country-state-city";
import { useCityCreateMutation, useCityUpdateMutation } from "@/api/apiSlice";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Select from "react-select";
import { ThemeContext } from "@/components/ThemeProvider";
import Loader from "@/components/loader/Loader";

export default function AddCity({ mode = "new" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  const { id } = param;
  const { data } = location.state || { data: null };
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [errors, setErrors] = useState({});

  const [cityCreate, { isLoading: isCreating }] = useCityCreateMutation();
  const [cityUpdate, { isLoading: isUpdating }] = useCityUpdateMutation();

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const stateList = State.getStatesOfCountry(selectedCountry.isoCode);
      setStates(stateList);
      setSelectedState(null);
      setCities([]);
      setSelectedCity(null);
    } else {
      setStates([]);
      setSelectedState(null);
      setCities([]);
      setSelectedCity(null);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const cityList = City.getCitiesOfState(
        selectedCountry.isoCode,
        selectedState.isoCode
      );
      setCities(cityList);
      setSelectedCity(null);
    } else {
      setCities([]);
      setSelectedCity(null);
    }
  }, [selectedState]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!selectedCountry) newErrors.country = "Country is required";
    if (!selectedState) newErrors.state = "State is required";
    if (!selectedCity) newErrors.city = "City is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const payload = {
      country: selectedCountry.name,
      countrylatlng: [selectedCountry.latitude, selectedCountry.longitude],
      province: selectedState.name,
      provincelatlng: [selectedState.latitude, selectedState.longitude],
      city: selectedCity.name,
      citylatlng: [selectedCity.latitude, selectedCity.longitude],
    };

    try {
      const response =
        mode === "edit"
          ? await cityUpdate({ id, data: payload })
          : await cityCreate(payload);

      if (response?.data?.status === "success") {
        toast.success(
          `City ${mode === "new" ? "added" : "updated"} successfully!`
        );
        navigate(-1); // go back
      } else {
        const errorMsg =
          response?.error?.data?.message ||
          response?.data?.message ||
          "Something went wrong.";
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("City submission error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  useEffect(() => {
    if (data && countries.length > 0) {
      const matchedCountry = countries.find((c) => c.name === data.country);
      if (matchedCountry) {
        setSelectedCountry(matchedCountry);
      }
    }
  }, [data, countries]);

  useEffect(() => {
    if (data && selectedCountry) {
      const stateList = State.getStatesOfCountry(selectedCountry.isoCode);
      setStates(stateList);

      const matchedState = stateList.find((s) => s.name === data.province);
      if (matchedState) {
        setSelectedState(matchedState);
      }
    }
  }, [data, selectedCountry]);

  useEffect(() => {
    if (data && selectedCountry && selectedState) {
      const cityList = City.getCitiesOfState(
        selectedCountry.isoCode,
        selectedState.isoCode
      );
      setCities(cityList);

      const matchedCity = cityList.find((c) => c.name === data.city);
      if (matchedCity) {
        setSelectedCity(matchedCity);
      }
    }
  }, [data, selectedCountry, selectedState]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E] rounded-[20px] min-h-[calc(100vh-130px)] flex flex-col justify-between">
        <div className="p-5">
          <h4 className="font-semibold xl:text-3xl text-2xl">
            {" "}
            {mode === "new" ? "Add" : "Edit"} City
          </h4>
          <div className="grid xl:grid-cols-3 gap-3 mt-8">
            <div className="xl:col-start-1 xl:col-end-3">
              <div className="grid lg:grid-cols-2 gap-4">
                {/* Country Select */}
                <div>
                  <label className="font-medium text-lg">Select Country</label>
                  <Select
                    options={countries.map((c) => ({
                      value: c.isoCode,
                      label: c.name,
                    }))}
                    value={
                      selectedCountry
                        ? {
                            value: selectedCountry.isoCode,
                            label: selectedCountry.name,
                          }
                        : null
                    }
                    onChange={(selected) => {
                      const country = countries.find(
                        (c) => c.isoCode === selected?.value
                      );
                      setSelectedCountry(country || null);
                    }}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        height: 50,
                        minHeight: 50,
                        borderRadius: 10,
                        boxShadow: "0px 8px 24px 0px #00000012",
                        borderColor: "#D1D5DB",
                        backgroundColor: "white",
                        color: "black",
                        "&:hover": {
                          borderColor: "#3B82F6",
                        },
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "black",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: isDark ? "#374151" : "white", // dark or white dropdown
                        borderRadius: 10,
                        boxShadow: "0px 8px 24px 0px #00000033",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused
                          ? isDark
                            ? "#2563EB" // blue when focused in dark mode
                            : "#E0E7FF" // light blue in light mode
                          : isDark
                          ? "#374151"
                          : "white",
                        color: state.isFocused
                          ? "black"
                          : isDark
                          ? "white"
                          : "black",
                        cursor: "pointer",
                      }),
                      indicatorSeparator: () => ({
                        display: "none",
                      }),
                      dropdownIndicator: (provided) => ({
                        ...provided,
                        color: "black",
                        "&:hover": {
                          color: isDark ? "#93C5FD" : "#3B82F6",
                        },
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: isDark ? "#9CA3AF" : "#6B7280",
                      }),
                    }}
                    className="text-base "
                    classNamePrefix="react-select"
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>

                {/* State Select */}
                <div>
                  <label className="font-medium text-lg">Select State</label>
                  <Select
                    options={states.map((s) => ({
                      value: s.isoCode,
                      label: s.name,
                    }))}
                    value={
                      selectedState
                        ? {
                            value: selectedState.isoCode,
                            label: selectedState.name,
                          }
                        : null
                    }
                    onChange={(selected) => {
                      const state = states.find(
                        (s) => s.isoCode === selected?.value
                      );
                      setSelectedState(state || null);
                    }}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        height: 50,
                        minHeight: 50,
                        borderRadius: 10,
                        boxShadow: "0px 8px 24px 0px #00000012",
                        borderColor: "#D1D5DB",
                        backgroundColor: "white",
                        color: "black",
                        "&:hover": {
                          borderColor: "#3B82F6",
                        },
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "black",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: isDark ? "#374151" : "white", // dark or white dropdown
                        borderRadius: 10,
                        boxShadow: "0px 8px 24px 0px #00000033",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused
                          ? isDark
                            ? "#2563EB" // blue when focused in dark mode
                            : "#E0E7FF" // light blue in light mode
                          : isDark
                          ? "#374151"
                          : "white",
                        color: state.isFocused
                          ? "black"
                          : isDark
                          ? "white"
                          : "black",
                        cursor: "pointer",
                      }),
                      indicatorSeparator: () => ({
                        display: "none",
                      }),
                      dropdownIndicator: (provided) => ({
                        ...provided,
                        color: "black",
                        "&:hover": {
                          color: isDark ? "#93C5FD" : "#3B82F6",
                        },
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: isDark ? "#9CA3AF" : "#6B7280",
                      }),
                    }}
                    isDisabled={!selectedCountry}
                    className="text-base  "
                    classNamePrefix="react-select"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>

                {/* City Select */}
                <div>
                  <label className="font-medium text-lg">Select City</label>
                  <Select
                    options={cities.map((c) => ({
                      value: c.name,
                      label: c.name,
                    }))}
                    value={
                      selectedCity
                        ? { value: selectedCity.name, label: selectedCity.name }
                        : null
                    }
                    onChange={(selected) => {
                      const city = cities.find(
                        (c) => c.name === selected?.value
                      );
                      setSelectedCity(city || null);
                    }}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        height: 50,
                        minHeight: 50,
                        borderRadius: 10,
                        boxShadow: "0px 8px 24px 0px #00000012",
                        borderColor: "#D1D5DB",
                        backgroundColor: "white",
                        color: "black",
                        "&:hover": {
                          borderColor: "#3B82F6",
                        },
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "black",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: isDark ? "#374151" : "white", // dark or white dropdown
                        borderRadius: 10,
                        boxShadow: "0px 8px 24px 0px #00000033",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused
                          ? isDark
                            ? "#2563EB" // blue when focused in dark mode
                            : "#E0E7FF" // light blue in light mode
                          : isDark
                          ? "#374151"
                          : "white",
                        color: state.isFocused
                          ? "black"
                          : isDark
                          ? "white"
                          : "black",
                        cursor: "pointer",
                      }),
                      indicatorSeparator: () => ({
                        display: "none",
                      }),
                      dropdownIndicator: (provided) => ({
                        ...provided,
                        color: "black",
                        "&:hover": {
                          color: isDark ? "#93C5FD" : "#3B82F6",
                        },
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: isDark ? "#9CA3AF" : "#6B7280",
                      }),
                    }}
                    isDisabled={!selectedState}
                    className="text-base "
                    classNamePrefix="react-select"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 p-3 mt-5">
          <button
            type="button"
            onClick={() => {
              setSelectedCountry(null);
              setSelectedState(null);
              setSelectedCity(null);
              setErrors({});
            }}
            className="bg-[#E7E7E7] dark:text-black border rounded-full py-2 px-9"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isCreating || isUpdating}
            className="bg-black text-white border rounded-full py-2 px-9"
          >
            Save
          </button>
        </div>
      </div>

      <Loader loading={isCreating || isUpdating} />
    </form>
  );
}
