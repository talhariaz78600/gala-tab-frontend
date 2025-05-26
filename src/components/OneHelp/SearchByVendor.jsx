import React from "react";

export default function SearchByVendor() {
  const vendorDetails = [
    {
      title: "Search by Vendors",
      description: `The vendor-finding feature allows users to search and discover vendors based on their specific needs, such as location, category,
        price range, and availability. A simple search bar with auto-suggestions helps users find vendors quickly, while advanced filters refine
        results further. The results are displayed in a visually appealing grid or list view, showcasing vendor names, ratings, pricing, and
        specialties. Users can explore detailed vendor profiles with service descriptions, portfolios, reviews, and contact options, making it
        easy to evaluate and book. Additionally, features like real-time availability checks, personalized recommendations, and the ability to
        save or compare vendors enhance theo verall user experience.`,
    },
    {
      title: "Search by category",
      description: `The vendor-finding feature allows users to search and discover vendors based on their specific needs, such as location, category,
        price range, and availability. A simple search bar with auto-suggestions helps users find vendors quickly, while advanced filters refine
        results further. The results are displayed in a visually appealing grid or list view, showcasing vendor names, ratings, pricing, and
        specialties. Users can explore detailed vendor profiles with service descriptions, portfolios, reviews, and contact options, making it
        easy to evaluate and book. Additionally, features like real-time availability checks, personalized recommendations, and the ability to
        save or compare vendors enhance theo verall user experience.`,
    },
    {
      title: "Search by Vendors",
      description: `The vendor-finding feature allows users to search and discover vendors based on their specific needs, such as location, category,
        price range, and availability. A simple search bar with auto-suggestions helps users find vendors quickly, while advanced filters refine
        results further. The results are displayed in a visually appealing grid or list view, showcasing vendor names, ratings, pricing, and
        specialties. Users can explore detailed vendor profiles with service descriptions, portfolios, reviews, and contact options, making it
        easy to evaluate and book. Additionally, features like real-time availability checks, personalized recommendations, and the ability to
        save or compare vendors enhance theo verall user experience.`,
    },
    {
      title: "Search by Vendors",
      description: `The vendor-finding feature allows users to search and discover vendors based on their specific needs, such as location, category,
        price range, and availability. A simple search bar with auto-suggestions helps users find vendors quickly, while advanced filters refine
        results further. The results are displayed in a visually appealing grid or list view, showcasing vendor names, ratings, pricing, and
        specialties. Users can explore detailed vendor profiles with service descriptions, portfolios, reviews, and contact options, making it
        easy to evaluate and book. Additionally, features like real-time availability checks, personalized recommendations, and the ability to
        save or compare vendors enhance theo verall user experience.`,
    },
    {
      title: "Search by Vendors",
      description: `The vendor-finding feature allows users to search and discover vendors based on their specific needs, such as location, category,
        price range, and availability. A simple search bar with auto-suggestions helps users find vendors quickly, while advanced filters refine
        results further. The results are displayed in a visually appealing grid or list view, showcasing vendor names, ratings, pricing, and
        specialties. Users can explore detailed vendor profiles with service descriptions, portfolios, reviews, and contact options, making it
        easy to evaluate and book. Additionally, features like real-time availability checks, personalized recommendations, and the ability to
        save or compare vendors enhance theo verall user experience.`,
    },
    {
      title: "Search by Vendors",
      description: `The vendor-finding feature allows users to search and discover vendors based on their specific needs, such as location, category,
        price range, and availability. A simple search bar with auto-suggestions helps users find vendors quickly, while advanced filters refine
        results further. The results are displayed in a visually appealing grid or list view, showcasing vendor names, ratings, pricing, and
        specialties. Users can explore detailed vendor profiles with service descriptions, portfolios, reviews, and contact options, making it
        easy to evaluate and book. Additionally, features like real-time availability checks, personalized recommendations, and the ability to
        save or compare vendors enhance theo verall user experience.`,
    },
    {
      title: "Search by Vendors",
      description: `The vendor-finding feature allows users to search and discover vendors based on their specific needs, such as location, category,
        price range, and availability. A simple search bar with auto-suggestions helps users find vendors quickly, while advanced filters refine
        results further. The results are displayed in a visually appealing grid or list view, showcasing vendor names, ratings, pricing, and
        specialties. Users can explore detailed vendor profiles with service descriptions, portfolios, reviews, and contact options, making it
        easy to evaluate and book. Additionally, features like real-time availability checks, personalized recommendations, and the ability to
        save or compare vendors enhance theo verall user experience.`,
    },
    {
        title: "Search by Vendors",
        description: `The vendor-finding feature allows users to search and discover vendors based on their specific needs, such as location, category,
          price range, and availability. A simple search bar with auto-suggestions helps users find vendors quickly, while advanced filters refine
          results further. The results are displayed in a visually appealing grid or list view, showcasing vendor names, ratings, pricing, and
          specialties. Users can explore detailed vendor profiles with service descriptions, portfolios, reviews, and contact options, making it
          easy to evaluate and book. Additionally, features like real-time availability checks, personalized recommendations, and the ability to
          save or compare vendors enhance theo verall user experience.`,
      },
  ];
  return (
    <div className="grid gap-6">
      {vendorDetails.map((vendor, index) => (
        <div
          key={index}
          className="max-w-[1000px] border border-[#E7E7E7] px-4 py-6 rounded-[10px] ms-auto hover:bg-[#F7F7F7]"
        >
          <p className="sm:text-lg  font-semibold">
            {vendor.title}
          </p>
          <p className="sm:text-lg text-sm mt-4">
            {vendor.description}
          </p>
        </div>
      ))}
    </div>
  );
}
