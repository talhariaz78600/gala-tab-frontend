import React from 'react'

const IdType = () => {
    return (
        <div className='py-7 w-full'>
            <div className=''>
                <h4 className='md:text-4xl text-3xl font-semibold text-center'>Choose an ID type to add</h4>
                <p className='text-center mt-4'>We’ll need you to add an official government ID.<br></br>
                    This step helps make sure you’re really you.</p>
                <div className='sm:max-w-3xl  mx-auto md:mt-12 mt-5'>
                    <form action="">
                        <div>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="country"
                                    name="country"
                                    autocomplete="country-name"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md border bg-[#F7F7F7] py-3 pl-3 pr-8 text-base text-gray-900  -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray sm:text-sm/6"
                                >
                                    <option value="" selected hidden>Select issuing country/region </option>
                                    <option value="">United State</option>
                                    <option value="">New Zealand</option>
                                    <option value="">Pakistan</option>
                                </select>
                                <svg
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-8"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="flex justify-between border-b py-4 px-4">
                            <div>
                                <label htmlFor="driver">Driver's license</label>
                            </div>
                            <div>
                                <input type="radio" className='w-4 h-4 accent-black' id='driver' name="license" />
                            </div>
                        </div>
                        <div className="flex justify-between border-b py-4 px-4">
                            <div>
                                <label htmlFor="passport">Passport</label>
                            </div>
                            <div>
                                <input type="radio" className='w-4 h-4 accent-black' id='passport' name="license" />
                            </div>
                        </div>
                        <div className="flex justify-between border-b py-4 px-4">
                            <div>
                                <label htmlFor="govt">Government Identity ID</label>
                            </div>
                            <div>
                                <input type="radio" className='w-4 h-4 accent-black' id='govt' name="license" />
                            </div>
                        </div>
                        <div className='mt-3'>
                            <p className='bg-[#F7F7F7] py-4 px-4 text-center rounded-lg'>Your ID will be handled according to our Privacy Policy and won’t be shared with your Others.</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default IdType
