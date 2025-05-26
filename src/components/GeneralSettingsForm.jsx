import React from "react";
import Select from "react-select";
import moment from "moment-timezone";
import currencyCodes from "currency-codes";

// Language options
const languageOptions = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Chinese", value: "zh" },
];

// Currency options
const currencyOptions = currencyCodes.data
  .filter((c) => c.code && c.currency && c.number)
  .map((c) => ({
    label: `${c.currency} (${c.code})`,
    value: c.code,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

// Major time zones only
const majorTimeZones = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
];

const timeZoneOptions = majorTimeZones.map((tz) => ({
  label: tz.replace(/_/g, " "),
  value: tz,
}));

const weekStartOptions = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

const GeneralSettingsForm = () => {
  const [formData, setFormData] = React.useState({
    language: languageOptions.find((l) => l.value === "en"),
    currency: currencyOptions.find((c) => c.value === "USD"),
    timeZone: timeZoneOptions.find((tz) => tz.value === moment.tz.guess()),
    weekStart: weekStartOptions.find((d) => d.value === 1),
  });

  const getCustomSelectStyles = () => {
    const isDark = document.documentElement.classList.contains("dark");

    return {
      control: (base, state) => ({
        ...base,
        backgroundColor: isDark ? "#1f2937" : "white", // gray-800
        borderColor: state.isFocused
          ? "#6366f1"
          : isDark
          ? "#4b5563"
          : "#d1d5db",
        color: isDark ? "white" : "black",
        boxShadow: "none",
        "&:hover": {
          borderColor: "#6366f1", // indigo-500
        },
      }),
      singleValue: (base) => ({
        ...base,
        color: isDark ? "white" : "black",
      }),
      menu: (base) => ({
        ...base,
        backgroundColor: isDark ? "#1f2937" : "white", // gray-800
        color: isDark ? "white" : "black",
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused
          ? isDark
            ? "#374151" // gray-700
            : "#f3f4f6" // gray-100
          : "transparent",
        color: isDark ? "white" : "black",
        cursor: "pointer",
      }),
      input: (base) => ({
        ...base,
        color: isDark ? "white" : "black",
      }),
      placeholder: (base) => ({
        ...base,
        color: isDark ? "#9ca3af" : "#6b7280", // gray-400 / gray-600
      }),
    };
  };

  const handleChange = (key, selectedOption) => {
    setFormData((prev) => ({ ...prev, [key]: selectedOption }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missingFields = Object.entries(formData).filter(
      ([_, value]) => !value
    );
    if (missingFields.length) {
      alert("Please select all fields before submitting.");
      return;
    }

    const output = {
      language: formData.language.value,
      currency: formData.currency.value,
      timeZone: formData.timeZone.value,
      weekStart: formData.weekStart.value,
    };

    console.log("Submitted Data:", output);
    // Send output to backend
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-6 bg-white dark:bg-black rounded-2xl shadow space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        General Settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Preferred Language
          </label>
          <Select
            options={languageOptions}
            value={formData.language}
            onChange={(option) => handleChange("language", option)}
            placeholder="Select a language"
            styles={getCustomSelectStyles()}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Preferred Currency
          </label>
          <Select
            options={currencyOptions}
            value={formData.currency}
            onChange={(option) => handleChange("currency", option)}
            placeholder="Select a currency"
            styles={getCustomSelectStyles()}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Time Zone
          </label>
          <Select
            options={timeZoneOptions}
            value={formData.timeZone}
            onChange={(option) => handleChange("timeZone", option)}
            placeholder="Select a time zone"
            styles={getCustomSelectStyles()}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Calendar Start of Week
          </label>
          <Select
            options={weekStartOptions}
            value={formData.weekStart}
            onChange={(option) => handleChange("weekStart", option)}
            placeholder="Select a day"
            styles={getCustomSelectStyles()}
          />
        </div>
      </div>

      <div className="w-full flex justify-center">
        <button
          type="submit"
          className="w-full max-w-xs bg-black dark:bg-white text-white dark:text-black font-medium py-2 px-4 rounded-lg transition"
        >
          Save Settings
        </button>
      </div>
    </form>
  );
};

export default GeneralSettingsForm;
