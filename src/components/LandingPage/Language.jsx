import React from "react";
import US from "../../assets/img/US.png";
import Azerbaycan from "../../assets/img/Azerbaycan.png";
import Indonesia from "../../assets/img/Indonesia.png";
import BosnaiHercegovina from "../../assets/img/BosnaiHercegovina.png";
import Espanya from "../../assets/img/Espanya.png";
import CrnaGora from "../../assets/img/CrnaGora.png";
import Ceskarepublika from "../../assets/img/Ceskarepublika.png";
import Danmark from "../../assets/img/Danmark.png";
import Schweiz from "../../assets/img/Schweiz.png";
import Schweiz2 from "../../assets/img/Schweiz2.png";
import Luxemburg from "../../assets/img/Luxemburg.png";
import Mexico from "../../assets/img/Mexico.png";

export default function Languaage() {
  const languages = [
    { img: US, language: "English", region: "United States" },
    { img: Azerbaycan, language: "Azərbaycan dili", region: "Azərbaycan" },
    { img: Indonesia, language: "Bahasa Indonesia", region: "Indonesia" },
    {
      img: BosnaiHercegovina,
      language: "Bosanski",
      region: "Bosna i Hercegovina",
    },
    { img: Espanya, language: "Català", region: "Català" },
    { img: CrnaGora, language: "Crnogorski", region: "Crna Gora" },
    { img: Ceskarepublika, language: "Čeština", region: "Česká republika" },
    { img: Danmark, language: "Dansk", region: "Danmark" },
    { img: US, language: "Deutsch", region: "Deutschland" },
    { img: Schweiz, language: "Deutsch", region: "Schweiz" },
    { img: Schweiz2, language: "Deutsch", region: "Schweiz" },
    { img: Luxemburg, language: "Deutsch", region: "Luxemburg" },
    { img: Mexico, language: "Español", region: "México" },
    { img: Azerbaycan, language: "Azərbaycan dili", region: "Azərbaycan" },
    { img: Indonesia, language: "Bahasa Indonesia", region: "Indonesia" },
    { img: US, language: "English", region: "United States" },
    { img: Azerbaycan, language: "Azərbaycan dili", region: "Azərbaycan" },
    { img: Indonesia, language: "Bahasa Indonesia", region: "Indonesia" },
    {
      img: BosnaiHercegovina,
      language: "Bosanski",
      region: "Bosna i Hercegovina",
    },
    { img: Espanya, language: "Català", region: "Català" },
    { img: CrnaGora, language: "Crnogorski", region: "Crna Gora" },
    { img: Ceskarepublika, language: "Čeština", region: "Česká republika" },
    { img: Danmark, language: "Dansk", region: "Danmark" },
    { img: US, language: "Deutsch", region: "Deutschland" },
    { img: Schweiz, language: "Deutsch", region: "Schweiz" },
    { img: Schweiz2, language: "Deutsch", region: "Schweiz" },
    { img: Luxemburg, language: "Deutsch", region: "Luxemburg" },
    { img: Mexico, language: "Español", region: "México" },
    { img: Azerbaycan, language: "Azərbaycan dili", region: "Azərbaycan" },
    { img: Indonesia, language: "Bahasa Indonesia", region: "Indonesia" },
    { img: US, language: "English", region: "United States" },
    { img: Azerbaycan, language: "Azərbaycan dili", region: "Azərbaycan" },
    { img: Indonesia, language: "Bahasa Indonesia", region: "Indonesia" },
    {
      img: BosnaiHercegovina,
      language: "Bosanski",
      region: "Bosna i Hercegovina",
    },
    { img: Espanya, language: "Català", region: "Català" },
    { img: CrnaGora, language: "Crnogorski", region: "Crna Gora" },
    { img: Ceskarepublika, language: "Čeština", region: "Česká republika" },
    { img: Danmark, language: "Dansk", region: "Danmark" },
    { img: US, language: "Deutsch", region: "Deutschland" },
    { img: Schweiz, language: "Deutsch", region: "Schweiz" },
  ];
  return (
    <>
      <h4 className="font-medium leading-normal text-[20px] sm:text-[24px]">
        Select a language
      </h4>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
        {languages.map((lang, index) => (
          <div
            key={index}
            className="flex items-center bg-[#F9F9F9] p-3 rounded-[6px] border border-[#F9F9F9] hover:border-[#252525]"
          >
            <img
              className="w-[40px] h-[40px] rounded-full object-cover me-3"
              src={lang.img}
              alt={lang.language}
            />
            <div>
              <p className="font-medium">{lang.language}</p>
              <p className="text-[#6C6969]">{lang.region}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
