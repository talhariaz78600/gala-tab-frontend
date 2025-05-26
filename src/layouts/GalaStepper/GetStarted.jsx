import React from 'react'
import GalaLogo from "../../assets/img/gala-logo.png"
import Welcome from "../../assets/img/welcome.png"
import { Link } from 'react-router'
import { FaArrowRight } from "react-icons/fa6";

const GetStarted = () => {
    return (
        <div style={{
            height: 'calc(100dvh - 58px)'
        }}>
            <div className='bg-[#F7F7F7] py-4'>
                <div className='mycontainer'>
                    <div>
                        <img src={GalaLogo} alt="" className='w-26 h-full object-contain' />
                    </div>
                </div>
            </div>
            <div className="mycontainer h-full flex flex-col justify-center items-center">
                <div className='grid md:grid-cols-2 lg:gap-24 gap-6'>
                    <div className='py-3'>
                        <h2 className='xl:text-6xl lg:text-5xl text-4xl font-bold'>Getting Started with
                            <span className='text-[#32F0CD]'> Gala Tab</span> is a Breeze!</h2>
                        <p className='lg:text-lg text-sm mt-3 text-black'>In the next steps, we’ll gather all the important details about your property,
                            like its type, location, and capacity. We’ll  make sure you're set up
                            and ready to welcome guests in no time!</p>
                        <div className='mt-4'>
                            <Link to="/stepper-service" className='bg-black text-white rounded-full w-36 flex items-center text-center justify-between gap-2 py-2 ps-4 pe-2' >Get Started <FaArrowRight className='text-white border-2 border-black bg-gradient-to-r from-[#1c1c1c] to-[#757575] p-2 text-3xl rounded-full'/></Link>
                        </div>
                    </div>
                    <div>
                       <div>
                            <img src={Welcome} alt="" className='h-full w-full object-cover' />
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetStarted
