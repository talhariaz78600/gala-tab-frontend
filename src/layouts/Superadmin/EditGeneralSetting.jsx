import React from 'react'
import VectorLoad from "../../assets/img/vector-load.png"

const EditGeneralSetting = () => {
    return (
        <div className='bg-[#F7F7F7] rounded-xl'>
            <div className='p-4 border-b'>
                <h4 className='font-semibold sm:text-3xl text-xl'>Edit General Settings</h4>
            </div>
            <div className='p-3'>
                <form action="/admin-dashboard/setting">
                    <div className="grid lg:grid-cols-2 gap-3 border-b pb-3">
                        <div>
                            <h4 className='font-semibold text-xl'>Company Logo</h4>
                            <p className='text-[#484848] text-sm'>Shown on invoices and reports (able to edit on individual invoices if needed)</p>
                            <div className='mt-4 flex flex-wrap items-end gap-4'>
                                <div className='bg-white w-[150px] h-[150px] max-w-[150px] border-dashed border rounded-md flex items-center justify-center flex-col'>
                                    <img src={VectorLoad} alt="" />
                                    <p className='text-[#9A9A9A] font-medium text-sm mt-3'>Click and upload</p>
                                </div>
                                <div className='pb-5'>
                                    <label htmlFor="load" className='text-white bg-black px-4 rounded-3xl py-2'>Upload Image</label>
                                    <input type="file" name="" id="load" className='hidden' />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className='font-semibold text-xl'>Company Name</h4>
                            <p className='text-[#484848] text-sm'>Shown on invoices and reports (able to edit on individual invoices if needed)</p>
                            <div className='mt-4'>
                                <label htmlFor="" className='text-[#202529] font-medium text-lg'>Type Company Name</label>
                                <input type="text" className='shadow-lg p-3 rounded-lg bg-white w-full' placeholder='Type here' />
                            </div>
                        </div>
                    </div>
                    <div className='border-b py-3'>
                        <div>
                            <h4 className='font-semibold text-xl'>Global preferences</h4>
                        </div>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="" className='text-[#202529] font-medium text-lg'>Preferred language</label>
                                <div className="mt-2 grid grid-cols-1">
                                    <select id="country" name="country" autocomplete="country-name" className="col-start-1 shadow-md row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900  -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray sm:text-sm/6">
                                        <option>Select Language</option>
                                    </select>
                                    <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-8" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="" className='text-[#202529] font-medium text-lg'>Preferred currency</label>
                                <div className="mt-2 grid grid-cols-1">
                                    <select id="country" name="country" autocomplete="country-name" className="col-start-1 shadow-md row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900  -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray sm:text-sm/6">
                                        <option>Select Language</option>
                                    </select>
                                    <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-8" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="" className='text-[#202529] font-medium text-lg'>Select Time Zone</label>
                                <div className="mt-2 grid grid-cols-1">
                                    <select id="country" name="country" autocomplete="country-name" className="col-start-1 shadow-md row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900  -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray sm:text-sm/6">
                                        <option>Select Language</option>
                                    </select>
                                    <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-8" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border-b py-3'>
                        <div>
                            <h4 className='font-semibold text-xl'>Calendar Setup</h4>
                        </div>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="" className='text-[#202529] font-medium text-lg'>Initial Number of Listings to on Calendar</label>
                                <div className="mt-2 grid grid-cols-1">
                                    <select id="country" name="country" autocomplete="country-name" className="col-start-1 shadow-md row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900  -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray sm:text-sm/6">
                                        <option>Select # of Listing</option>
                                    </select>
                                    <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-8" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="" className='text-[#202529] font-medium text-lg'>Select Calendar Start of Week</label>
                                <div className="mt-2 grid grid-cols-1">
                                    <select id="country" name="country" autocomplete="country-name" className="col-start-1 shadow-md row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900  -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray sm:text-sm/6">
                                        <option>Sunday</option>
                                        <option value="">Monday</option>
                                        <option value="">Tuesday</option>
                                    </select>
                                    <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-8" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex sm:flex-row flex-col items-center gap-3 mt-9'>
                        <div>
                            <button className='bg-[#E7E7E7] w-full border-separate py-2 rounded-3xl px-12'>Cancel</button>
                        </div>
                        <div>
                            <button className='bg-black w-full text-white py-2 rounded-3xl px-12'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditGeneralSetting
