import React from 'react'
import Uload from "../../../assets/img/uload.png"

const Upload = () => {
    return (
        <div className='py-12'>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <p className='text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2'>Step 04</p>
                    <div>
                        <h2 className='text-[#171717] font-bold xl:text-5xl text-3xl mt-5'>Add Some Photos & Videos
                            of Your as a Service Portfolio</h2>
                        <p className='text-[#171717] mt-3 text-lg'>You’ll need 5 photos to kick things off, but feel  free to add more or make
                            changes later!</p>
                    </div>
                </div>
                <div className='bg-[#F7F7F7] rounded-2xl p-3 flex items-center justify-center flex-col'>
                    <div>
                        <img src={Uload} alt="" />
                    </div>
                    <div className='py-3'>
                        <label htmlFor="load" className='text-white bg-black rounded-3xl px-4 py-2 shadow-lg cursor-pointer'>Upload Photos & Videos</label>
                        <input type="file" id='load' className='hidden' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload
