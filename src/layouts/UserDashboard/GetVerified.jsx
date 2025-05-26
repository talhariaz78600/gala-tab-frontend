import React from 'react'
import { Link } from 'react-router'
import Verified from "../../assets/img/verified.png"

const GetVerified = () => {
    return (
        <div>
            <div className="border border-b">
                <div className="mycontainer">
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <Link to="#" className="bg-gradient-to-b inline-block from-gray-500 to-gray-900 text-white me-2 text-nowrap font-semibold py-3 px-5 sm:px-8 rounded-full border-4 border-black shadow-md">
                                Gala Tab
                            </Link>
                        </div>
                        <div>
                            <Link to="#" className="bg-white border inline-block py-2 px-4 shadow-xl rounded-3xl">Exit Page</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-lg mx-auto py-6 px-2">
                <h4 className='text-center sm:text-4xl text-2xl font-semibold text-[#171717]'>Let's try again</h4>
                <p className='text-center mt-3 sm:text-lg'>Looks like we can't read your photo. Make sure that all the text on your ID or
                    passport page is visible, and that it shows the picture of your face.
                    This will help us match your ID to your other info</p>
                <div className='mt-4'>
                    <img src={Verified} alt="" className='mx-auto w-full h-full object-contain'/>
                </div>
                <div className='mt-6'>
                    <button className='w-full rounded-full text-white bg-black py-2'>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default GetVerified
