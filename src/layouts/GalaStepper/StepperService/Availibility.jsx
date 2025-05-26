import React, { useState } from 'react';
import { FiMinusCircle } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";

const Availibility = () => {
    const [capacity, setCapacity] = useState(345);
    const [restrooms, setRestrooms] = useState(2);

    const increment = (setter, value) => setter(value + 1);
    const decrement = (setter, value) => setter(value > 0 ? value - 1 : 0);

    return (
        <div className='py-12'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className='text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2'>Step 02</p>
                    <div>
                        <h2 className='text-[#171717] font-bold xl:text-6xl lg:text-5xl text-3xl mt-5'>Let's Get the Basics on
                            your Space!</h2>
                        <p className='text-[#171717] mt-3 text-lg'>Enter the type of space that most closely represents the physical space
                            being listed.</p>
                        <p className='text-[#171717] mt-3 text-lg'>We’ll dive into the fun stuff, like photos and amenities a little later.</p>
                    </div>
                </div>
                <div className='bg-[#F7F7F7] rounded-2xl p-4'>
                    <div>
                        <label htmlFor="serviceTitle" className='text-[#202529] text-sm font-medium ml-4'>Enter Your Service Title</label>
                        <input id="serviceTitle" type="text" className='w-full shadow px-3 py-2 rounded-lg border' placeholder='Type here'/>
                    </div>
                    <div className='mt-5'>
                        <h4 className='font-semibold text-xl'>Service Availability</h4>
                        <div className='flex items-center justify-between gap-2 border-b py-2'>
                            <div>
                                <label className='text-[#535353]'>Capacity</label>
                            </div>
                            <div className='flex items-center gap-3'>
                                <FiMinusCircle className='text-xl cursor-pointer' aria-label="Decrease Capacity" onClick={() => decrement(setCapacity, capacity)} />
                                <p className='underline'>{capacity}</p>
                                <FaCirclePlus className='text-xl cursor-pointer' aria-label="Increase Capacity" onClick={() => increment(setCapacity, capacity)} />
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-2 border-b py-2'>
                            <div>
                                <label className='text-[#535353]'>Restrooms</label>
                            </div>
                            <div className='flex items-center gap-3'>
                                <FiMinusCircle className='text-xl cursor-pointer' aria-label="Decrease Restrooms" onClick={() => decrement(setRestrooms, restrooms)} />
                                <p className='underline'>{restrooms}</p>
                                <FaCirclePlus className='text-xl cursor-pointer' aria-label="Increase Restrooms" onClick={() => increment(setRestrooms, restrooms)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Availibility;
