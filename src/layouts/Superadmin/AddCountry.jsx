import {
  useCountryCreateMutation,
  useCountryUpdateMutation,
} from "@/api/apiSlice";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import countries from "world-countries";
import Select from "react-select";
import { ThemeContext } from "@/components/ThemeProvider";

export default function AddCountry({ mode = "new" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const { id } = param;
  const { data } = location.state || { data: null };
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [region, setRegion] = useState("");
  const [currency, setCurrency] = useState("");
  const [latLang, setLatLang] = useState(null);

  const [countryCreate, { isLoading }] = useCountryCreateMutation();
  const [countryUpdate, { isLoading: isUpdating }] = useCountryUpdateMutation();

  const handleCountryChange = (code) => {
    setSelectedCountryCode(code);
    const country = countries.find((c) => c.cca2 === code);
    console.log("country", country);

    if (country) {
      setRegion(country.region);
      setLatLang(country.latlng);
      setCurrency(country.currencies ? Object.keys(country.currencies)[0] : "");
    } else {
      setRegion("");
      setLatLang(null);
      setCurrency("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const country = countries.find((c) => c.cca2 === selectedCountryCode);

      if (!country) {
        toast.error("Selected country is invalid.");
        return;
      }

      console.log({
        country: country.name.common,
        region,
        currency,
        latLang,
      });

      const response =
        mode === "edit"
          ? await countryUpdate({
              id,
              data: {
                country: country.name.common,
                region,
                currency,
                latlng: latLang,
              },
            })
          : await countryCreate({
              country: country.name.common,
              region,
              currency,
              latlng: latLang,
            });

      if (response?.data?.status === "success") {
        toast.success(
          `Country ${mode === "new" ? "added" : "updated"} successfully!`
        );
        navigate(-1);
      } else {
        toast.error(
          response?.error?.data?.message || "Failed to save country."
        );
      }
    } catch (error) {
      console.error("Error creating country:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (data && countries.length > 0) {
      const selectedCountry = countries.find(
        (c) => c.name.common.toLowerCase() === data.country.toLowerCase()
      );

      if (selectedCountry) {
        setSelectedCountryCode(selectedCountry.cca2);
      }

      setRegion(data?.region || "");
      setCurrency(data?.currency || "");
    }
  }, [data, countries]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E] rounded-[20px] min-h-[calc(100dvh-130px)] flex flex-col justify-between">
        <div className="p-5">
          <h4 className="font-semibold xl:text-3xl text-2xl">
            {mode === "new" ? "Add" : "Edit"} Country
          </h4>
          <div className="grid xl:grid-cols-3 gap-3 mt-8">
            <div className="xl:col-start-1 xl:col-end-3">
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="font-medium text-lg">
                    Select Country
                  </label>
                  <div className="relative">
                    <Select
                      inputId="country"
                      name="country"
                      options={countries.map((country) => ({
                        value: country.cca2,
                        label: country.name.common,
                      }))}
                      value={
                        selectedCountryCode
                          ? {
                              value: selectedCountryCode,
                              label:
                                countries.find(
                                  (c) => c.cca2 === selectedCountryCode
                                )?.name.common || "",
                            }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handleCountryChange(selectedOption?.value || "")
                      }
                      className="text-base"
                      classNamePrefix="react-select"
                      placeholder="Select a country"
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
                            ? "white"
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
                    />
                  </div>
                </div>
                <div>
                  <label className="font-medium text-lg">Country Region</label>
                  <input
                    type="text"
                    readOnly
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Select Country"
                    className="py-3 px-2 shadow-[0px_8px_24px_0px_#00000012] w-full rounded-[10px] text-black"
                  />
                </div>
                <div>
                  <label className="font-medium text-lg">Currency</label>
                  <input
                    type="text"
                    readOnly
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    placeholder="Select Country"
                    className="py-3 px-2 shadow-[0px_8px_24px_0px_#00000012] w-full rounded-[10px] text-black"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 mt-5">
          <Link
            to={-1}
            className="bg-[#E7E7E7] text-black border rounded-full py-2 px-9"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-black text-white border rounded-full py-2 px-9"
            disabled={isLoading || isUpdating}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
