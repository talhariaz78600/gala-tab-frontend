import React, { useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaCirclePlus, FaRegCircleCheck } from "react-icons/fa6";
import { FiMinusCircle } from 'react-icons/fi';
import { FiPlusCircle } from "react-icons/fi";

const Rule = () => {
    const [capacity, setCapacity] = useState(2);

    const increment = (setter, value) => setter(value + 1);
    const decrement = (setter, value) => setter(value > 0 ? value - 1 : 0);
    return (
        <div className='py-12'>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <p className='text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2'>Step 09</p>
                    <div>
                        <h2 className='text-[#171717] font-bold xl:text-6xl lg:text-5xl text-3xl mt-5'>Set Your Rules Like a
                            Pro!</h2>
                        <p className='text-[#171717] mt-3 text-lg'>Share your rules with guests after to service bookings</p>
                    </div>
                </div>
                <div>
                    <form action="">
                        <div className='flex flex-wrap gap-2 items-center justify-between bg-[#F7F7F7] border p-3 rounded-lg'>
                            <div>
                                <label htmlFor="" className='text-[#202529]tesm'>Events allowed</label>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <div>
                                    <label htmlFor="radio1"><AiOutlineCloseCircle className='text-[#9A9A9A] text-2xl' /></label>
                                    <input type="radio" id='radio1' className='hidden' name='event' />
                                </div>
                                <div>
                                    <label htmlFor="radio2"><FaRegCircleCheck className='text-[#9A9A9A] text-xl' /></label>
                                    <input type="radio" id='radio2' className='hidden' name='event' />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-2 items-center justify-between bg-[#F7F7F7] border p-3 rounded-lg mt-3'>
                            <div>
                                <label htmlFor="" className='text-[#202529]tesm'>Smoking, vaping, e-cigarettes allowed</label>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <div>
                                    <label htmlFor="radio1"><AiOutlineCloseCircle className='text-[#9A9A9A] text-2xl' /></label>
                                    <input type="radio" id='radio1' className='hidden' name='smoking' />
                                </div>
                                <div>
                                    <label htmlFor="radio2"><FaRegCircleCheck className='text-[#9A9A9A] text-xl' /></label>
                                    <input type="radio" id='radio2' className='hidden' name='smoking' />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-2 items-center justify-between bg-[#F7F7F7] border p-3 rounded-lg mt-3'>
                            <div>
                                <label htmlFor="" className='text-[#202529] text-sm'>Max Number of Guests</label>
                            </div>
                            <div className='flex items-center gap-3'>
                                <FiMinusCircle className='text-xl text-[#717171] cursor-pointer' aria-label="Decrease Capacity" onClick={() => decrement(setCapacity, capacity)} />
                                <p className='underline'>{capacity}</p>
                                <FiPlusCircle className='text-xl text-[#717171] cursor-pointer' aria-label="Increase Capacity" onClick={() => increment(setCapacity, capacity)} />
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-2 items-center justify-between bg-[#F7F7F7] border p-3 rounded-lg mt-3'>
                            <div>
                                <label htmlFor="" className='text-[#202529]tesm'>Commercial photography and filming allowed</label>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <div>
                                    <label htmlFor="radio1"><AiOutlineCloseCircle className='text-[#9A9A9A] text-2xl' /></label>
                                    <input type="radio" id='radio1' className='hidden' name='commercial' />
                                </div>
                                <div>
                                    <label htmlFor="radio2"><FaRegCircleCheck className='text-[#9A9A9A] text-xl' /></label>
                                    <input type="radio" id='radio2' className='hidden' name='commercial' />
                                </div>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <h4 className='text-[#484848] font-medium text-lg'>Check-in and checkout times</h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="" className='text-[#202529] text-sm font-semibold'>Check-in time</label>
                                    <input type="time" name="" id="" className='border p-3 rounded-lg w-full' placeholder='11:00AM'/>
                                </div>
                                <div>
                                    <label htmlFor="" className='text-[#202529] text-sm font-semibold'>Checkout time</label>
                                    <input type="time" name="" id="" className='border p-3 rounded-lg w-full' placeholder='07:00PM'/>
                                </div>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="" className='text-[#202529] font-semibold text-lg'>Additional House Rules</label>
                            <textarea name="" id="" cols="30" rows="5" placeholder='Type here' className='shadow rounded-xl border w-full p-3 bg-white'></textarea>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Rule
