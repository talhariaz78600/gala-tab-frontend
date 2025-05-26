import React from 'react'
import { Link } from 'react-router'
import { MdChevronRight } from "react-icons/md";

const GovernmentId = () => {
  return (
    <div className='py-7 w-full'>
        <div className=''>
            <h4 className='md:text-4xl text-3xl font-semibold text-center'>Let’s add your government ID</h4>
            <p className='text-center mt-4'>We’ll need you to add an official government ID.<br></br>
            This step helps make sure you’re really you.</p>
            <div className='sm:max-w-3xl  mx-auto md:mt-12 mt-5'>
                <div className='bg-[#F7F7F7] w-full py-4 border rounded-lg px-4 flex sm:flex-row flex-col gap-3 sm:items-center justify-between'>
                    <div>
                        <p>Upload an existing Photo</p>
                    </div>
                    <div className='flex gap-3 items-center justify-end'>
                        <p>Recommended</p>
                        <Link to='#' className='block'><MdChevronRight/></Link>
                    </div>
                </div>
                <div className='bg-[#fff] w-full py-4 border-black border mt-3 rounded-lg px-4 flex items-center justify-between'>
                    <div>
                        <p>Take photo with your webcam</p>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <Link to='#' className='block'><MdChevronRight/></Link>
                    </div>
                </div>
                <div className='bg-[#fff] w-full py-4 border-black border mt-3 rounded-lg px-4 flex items-center justify-between'>
                    <div>
                        <p>Take photo with mobile gala app</p>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <Link to='#' className='block'><MdChevronRight/></Link>
                    </div>
                </div>
                <div className='mt-3 bg-[#F7F7F7] py-4 px-4 rounded-lg'>
                    <h5 className='font-semibold text-xl'>Your privacy</h5>
                    <p className='text-center'>We aim to keep the data you share during this process private, safe, and secure. <Link to='#' className='underline text-[#3551B6]'>Learn more</Link></p>
                    <div className='flex md:flex-row flex-col items-center gap-3 mt-4'>
                        <div className='w-full'>
                            <Link to="#" className='underline block text-center w-full py-2 rounded-lg border border-black'>Privacy Policy.</Link>
                        </div>
                        <div className='w-full'>
                            <Link to="#" className='underline w-full text-center block py-2 rounded-lg border border-black'>How identity verification works.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GovernmentId