import React, { useState } from "react";
import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa6";
import { CiCircleChevRight } from "react-icons/ci";
import VendorTopBar from "../../components/VendorDashboard/VendorTopBar";

export default function TaxRequirements() {
  const forms = [
    {
      id: "w9",
      title: "Form W-9",
      description:
        "For US taxpayers (citizens, tax residents, or businesses) filing a US tax return",
    },
    {
      id: "w8eci",
      title: "Form W-8ECI",
      description:
        "For foreign taxpayers (citizens, tax residents or businesses) filing a US tax return",
    },
    {
      id: "w8bene",
      title: "Form W-8-BEN-E (Businesses)",
      description: "For foreign businesses that don’t file a US tax return",
    },
  ];

  const [selectedForm, setSelectedForm] = useState(forms[0].id);

  return (
    <div>
      <VendorTopBar />
      <div className="mt-8">
        <div className="mycontainer">
          <div className="flex items-center">
            <Link to="/vendor-dashboard/vendor-account" className="text-[28px] leading-normal font-semibold">
              Account
            </Link>
            <FaChevronRight className="mx-2 leading-normal" />
            <Link className="text-[#3551B6] font-medium text-lg">
              Tax Forums
            </Link>
          </div>
          <div className="mt-6 border-b border-[#CDCDCD] pb-6">
            <p className="text-[28px] leading-normal font-semibold">
              Tax requirements for the US
            </p>
            <p className="text-lg mt-5">
              Tax info is required from every individual or entity with one or
              more of the following:
            </p>
            <ol className="list-decimal list-inside text-lg font-medium gap-4 flex flex-col mt-6">
              <li>Active US listing(s)</li>
              <li>A US payout method on file</li>
              <li>US citizen or resident status</li>
            </ol>
            <div className="flex flex-wrap gap-4 items-center justify-between mt-6 text-lg">
              <p>
                Tax info you submit will be reported to the IRS. Get answers to
                questions about taxes in our
              </p>
              <div className="ms-auto">
                <Link to="/vendor-dashboard/vendor-help-center" className="py-2 px-8 bg-black text-white inline-block text-lg rounded-[10px]">
                  Help Center
                </Link>
              </div>
            </div>
          </div>
          <div className="mb-10">
            <p className="text-[28px] leading-normal font-semibold mt-5">
              Select one of the following:
            </p>
            <div className="mt-2 flex flex-col gap-4">
              {forms.map((form) => (
                <div
                  key={form.id}
                  className={`${
                    selectedForm === form.id ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <p className="text-lg font-medium">{form.title}</p>
                  <div
                    className="flex justify-between items-center border border-black py-5 rounded-[10px] px-4 cursor-pointer"
                    onClick={() => setSelectedForm(form.id)}
                  >
                    <p>{form.description}</p>
                    <div>
                      <Link to="/form-w-9">
                        <CiCircleChevRight className="text-[40px]" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
