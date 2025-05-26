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

export default function Currency() {
  const currencies = [
    { img: US, currency: "English", currencySymbol: "United States" },
    { img: Azerbaycan, currency: "Azərbaycan dili", currencySymbol: "Azərbaycan" },
    { img: Indonesia, currency: "Bahasa Indonesia", currencySymbol: "Indonesia" },
    {
      img: BosnaiHercegovina,
      currency: "Bosanski",
      currencySymbol: "Bosna i Hercegovina",
    },
    { img: Espanya, currency: "Català", currencySymbol: "Català" },
    { img: CrnaGora, currency: "Crnogorski", currencySymbol: "Crna Gora" },
    { img: Ceskarepublika, currency: "Čeština", currencySymbol: "Česká republika" },
    { img: Danmark, currency: "Dansk", currencySymbol: "Danmark" },
    { img: US, currency: "Deutsch", currencySymbol: "Deutschland" },
    { img: Schweiz, currency: "Deutsch", currencySymbol: "Schweiz" },
    { img: Schweiz2, currency: "Deutsch", currencySymbol: "Schweiz" },
    { img: Luxemburg, currency: "Deutsch", currencySymbol: "Luxemburg" },
    { img: Mexico, currency: "Español", currencySymbol: "México" },
    { img: Azerbaycan, currency: "Azərbaycan dili", currencySymbol: "Azərbaycan" },
    { img: Indonesia, currency: "Bahasa Indonesia", currencySymbol: "Indonesia" },
    { img: US, currency: "English", currencySymbol: "United States" },
    { img: Azerbaycan, currency: "Azərbaycan dili", currencySymbol: "Azərbaycan" },
    { img: Indonesia, currency: "Bahasa Indonesia", currencySymbol: "Indonesia" },
    {
      img: BosnaiHercegovina,
      currency: "Bosanski",
      currencySymbol: "Bosna i Hercegovina",
    },
    { img: Espanya, currency: "Català", currencySymbol: "Català" },
    { img: CrnaGora, currency: "Crnogorski", currencySymbol: "Crna Gora" },
    { img: Ceskarepublika, currency: "Čeština", currencySymbol: "Česká republika" },
    { img: Danmark, currency: "Dansk", currencySymbol: "Danmark" },
    { img: US, currency: "Deutsch", currencySymbol: "Deutschland" },
    { img: Schweiz, currency: "Deutsch", currencySymbol: "Schweiz" },
    { img: Schweiz2, currency: "Deutsch", currencySymbol: "Schweiz" },
    { img: Luxemburg, currency: "Deutsch", currencySymbol: "Luxemburg" },
    { img: Mexico, currency: "Español", currencySymbol: "México" },
    { img: Azerbaycan, currency: "Azərbaycan dili", currencySymbol: "Azərbaycan" },
    { img: Indonesia, currency: "Bahasa Indonesia", currencySymbol: "Indonesia" },
    { img: US, currency: "English", currencySymbol: "United States" },
    { img: Azerbaycan, currency: "Azərbaycan dili", currencySymbol: "Azərbaycan" },
    { img: Indonesia, currency: "Bahasa Indonesia", currencySymbol: "Indonesia" },
    {
      img: BosnaiHercegovina,
      currency: "Bosanski",
      currencySymbol: "Bosna i Hercegovina",
    },
    { img: Espanya, currency: "Català", currencySymbol: "Català" },
    { img: CrnaGora, currency: "Crnogorski", currencySymbol: "Crna Gora" },
    { img: Ceskarepublika, currency: "Čeština", currencySymbol: "Česká republika" },
    { img: Danmark, currency: "Dansk", currencySymbol: "Danmark" },
    { img: US, currency: "Deutsch", currencySymbol: "Deutschland" },
    { img: Schweiz, currency: "Deutsch", currencySymbol: "Schweiz" },
  ];
  return (
    <>
      <h4 className="font-medium leading-normal text-[20px] sm:text-[24px]">
        Select a Currency
      </h4>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
        {currencies.map((currency, index) => (
          <div
            key={index}
            className="flex items-center bg-[#F9F9F9] p-3 rounded-[6px] border border-[#F9F9F9] hover:border-[#252525]"
          >
            <img
              className="w-[40px] h-[40px] rounded-full object-cover me-3"
              src={currency.img}
              alt={currency.currency}
            />
            <div>
              <p className="font-medium">{currency.currency}</p>
              <p className="text-[#6C6969]">{currency.currencySymbol}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
