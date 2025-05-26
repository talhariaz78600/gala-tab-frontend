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
                        <select name="" id="" className='bg-[#F7F7F7] w-full py-4 border rounded-lg px-4'>
                            <option value="" selected hidden>Select issuing country/region </option>
                        </select>
                    </div>
                    <div className="flex justify-between border-b py-4 px-4">
                        <div>
                            <label htmlFor="driver">Driver's license</label>
                        </div>
                        <div>
                            <input type="radio" className='w-4 h-4 accent-black' id='driver' name="license"/>
                        </div>
                    </div>
                    <div className="flex justify-between border-b py-4 px-4">
                        <div>
                            <label htmlFor="driver">Passport</label>
                        </div>
                        <div>
                            <input type="radio" className='w-4 h-4 accent-black' id='driver' name="license"/>
                        </div>
                    </div>
                    <div className="flex justify-between border-b py-4 px-4">
                        <div>
                            <label htmlFor="driver">Government Identity ID</label>
                        </div>
                        <div>
                            <input type="radio" className='w-4 h-4 accent-black' id='driver' name="license" checked/>
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
