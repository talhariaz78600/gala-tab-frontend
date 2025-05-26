import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

function FaqsSection({ faqData }) {
  const [activeQuestion, setActiveQuestion] = useState(0);

  const handleIconClick = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-4 bg-[#f7f7f7]  rounded-xl  p-5 md:p-12">
      <h1 className="text-[24px] sm:text-[34px] font-bold text-black">
        Frequently asked questions
      </h1>
      <p className="text-lg sm:text-[24px] font-semobold text-black">
        About Event Hub Contact Platform
      </p>
      <div className="w-full">
        {faqData?.length > 0 ? (
          faqData?.map((faq, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row w-full items-start justify-between gap-4 flex-wrap md:flex-nowrap"
            >
              <div
                className={`flex w-full md:w-1/2 rounded-xl mb-2 p-4 items-start cursor-pointer justify-between transition-all ${
                  activeQuestion === index
                    ? "bg-[#1c1c1c] text-white"
                    : "bg-white text-black"
                } shadow-[0px_8px_24px_0px_#00000014]`}
                style={{
                  fontFamily: "tt_chocolates",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
                onClick={() => handleIconClick(index)}
              >
                <p className="text-lg">{faq.question}</p>

                <IoIosArrowForward className="ml-2" size={20} />
              </div>

              <div className="flex w-full md:w-1/2">
                {activeQuestion === index && (
                  <div className="bg-white md:w-auto text-black rounded-xl mb-2 shadow-[0px_8px_24px_0px_#00000014] p-4 items-start justify-between">
                    <p className="text-lg">{faq.answer}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="paragraph mt-4 mb-1">
            No FAQs available for this service. Please check back later or
            contact us for more information.
          </p>
        )}
      </div>
      <p className="paragraph mt-4 mb-1">
        Pricing and popularity information in this section is based on
        proprietary data from bookings made on Event Hub from 2021 - 2024.
      </p>
    </div>
  );
}

export default FaqsSection;
