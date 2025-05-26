import React from "react";
import { Link } from "react-router";

export default function VendorHelp() {
  const data = [
    {
      parent: "About Vendor",
      children: {
        child1: "Vendor status",
        child2: "Changes",
        child3: "Cancellations",
        child4: "Checking in",
        child5: "Checking out",
        child6: "Preparing for an Gala Tab Experience",
      },
    },
    {
      parent: "Safety",
      children: {
        child1: "Safety concerns",
        child2: "Safety tips and guidelines",
        child3: "Reporting issues",
      },
    },
    {
      parent: "About Gala Tab",
      children: {
        child1: "Getting started",
        child2: "How Gala Tab works",
        child3: "Our community policies",
        child4: "Vendors",
        child5: "Users",
      },
    },
    {
      parent: "Your Vendor",
      children: {
        child1: "Vendor status",
        child2: "Changes",
        child3: "Cancellations",
        child4: "Checking in",
        child5: "Checking out",
        child6: "Preparing for an Gala Tab Experience",
      },
    },
  ];
  return (
    <div>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-14 leading-normal text-[24px] font-semibold">
        {data.map((item, index) => (
          <li key={index}>
            {item.parent}
            <ul className="text-base sm:text-lg font-normal">
              {item.children && typeof item.children === "object" ? (
                Object.entries(item.children).map(
                  ([key, value], childIndex) => (
                    <li className="my-5" key={childIndex}>
                      <Link to='/OneHelp' className="underline underline-offset-4 text-[rgba(18,18,18,1)] decoration-current">{value}</Link>
                    </li>
                  )
                )
              ) : (
                <li>No children available</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

