import React, { useEffect } from "react";

const CalendlyBadge = ({ style }) => {
  useEffect(() => {
    // Dynamically load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => console.log("Calendly script loaded successfully");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCalendlyPopup = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/dotchcapital/3-tax-trtuhsdemo",
      });
    } else {
      console.error("Calendly script not loaded yet");
    }
  };

  return (
    <>
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <button
        onClick={handleCalendlyPopup}
        style={{
          backgroundColor: "#ac2625",
          color: "#ffffff",
          padding: "15px 50px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          ...style,
        }}
      >
        Book a demo
      </button>
    </>
  );
};

export default CalendlyBadge;
