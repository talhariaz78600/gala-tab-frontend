import React from 'react'
import { Link } from 'react-router'

export default function ExploreMore() {
  return (
    <div className='bg-[rgba(28,28,28,1)] pt-14 pb-4'>
      <div className="mycontainer">
       <div className='border-b border-[rgba(156,157,157,1)] pb-16'>
       <div className='flex flex-col xl:flex-row xl:items-center justify-between'>
            <div className='mx-auto md:mx-0 text-center md:text-start w-full max-w-[400px]'>
                <h3 className='text-3xl sm:text-5xl font-semibold text-white'>Explore more</h3>
                <p className='text-2xl sm:text-4xl font-semibold text-white mt-12'>Need to get in touch?</p>
                <p className='text-[20px] sm:text-[24px] leading-normal text-white mt-4'>We’ll start with some questions and get you to the right place.</p>
                <Link to="/contact" className='text-[#1C1C1C] bg-white leading-normal text-[18px] py-3 px-10 font-medium rounded-md mt-12 inline-block'>Contact Us</Link>
            </div>
            <div className='flex flex-wrap justify-center items-center mt-10'>
                <div className='border m-3 border-[#464646] py-6 px-4 rounded-xl hover:bg-[#2A2A2A] w-full sm:w-[400px]'>
                        <h4 className='text-white text-[20px] sm:text-[24px] font-semibold'>Our community policies</h4>
                        <p className='text-white text-[18px] sm:text-[20px] mt-3'>How we build a foundation of trust.</p>
                </div>
                <div className='border m-3 border-[#464646] py-6 px-4 rounded-xl hover:bg-[#2A2A2A] w-full sm:w-[400px]'>
                        <h4 className='text-white text-[20px] sm:text-[24px] font-semibold'>Safety tips and guidelines</h4>
                        <p className='text-white text-[18px] sm:text-[20px] mt-3'>Resources to help Vendors and Users safe.</p>
                </div>
            </div>
        </div>
       </div>
      </div>
    </div>
  )
}
