import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/LandingPage/Navbar";
import Footer from "../../components/LandingPage/Footer";
import { FaArrowUp } from "react-icons/fa";

const LandingPageLayout = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll position
  const handleScroll = () => {
    const scrollPosition =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollPosition >= 30) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <Outlet />
      <div className="w-full">
        <Footer />
      </div>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-[#f7f7f7] p-2 text-3xl rounded-full z-20 shadow-lg cursor-pointer"
        >
          <FaArrowUp />
        </div>
      )}
    </div>
  );
};

export default LandingPageLayout;
