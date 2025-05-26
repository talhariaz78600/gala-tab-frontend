import React from 'react'
import { Link } from 'react-router'
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";

const HelpSupport = () => {
  const helpTopics = [
    { title: "Sign up as a Vendor", link: "#" },
    { title: "Managing Your Vendor Profile", link: "#" },
    { title: "Orders and Payments", link: "#" },
    { title: "Technical Assistance", link: "#" },
    { title: "Policies and Guidelines", link: "#" },
    { title: "Customer Reviews and Feedback", link: "#" },
    { title: "Account and Subscription", link: "#" },
    { title: "Vendor Support", link: "#" },
    { title: "Platform Features", link: "#" },
    { title: "Legal and Compliance", link: "#" },
  ];

  return (
    <div className='sm:px-7 main-font'>
      <h4 className='font-semibold text-xl'>Browse help topics</h4>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-4">
        {helpTopics.map((topic, index) => (
          <div key={index}>
            <Link to={topic.link} className='w-full border inline-block bg-white rounded-xl p-4 h-full'>
              <HiOutlineQuestionMarkCircle className='bg-[#282828] p-3 text-7xl text-white rounded-xl m-auto' />
              <p className='text-center mt-4 lg:text-sm text-xs font-medium'>{topic.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HelpSupport
