import React from 'react'
import Upload from "../../../assets/img/upload.png"

const CameraAccess = () => {
    return (
        <div className='py-7 w-full'>
            <div className=''>
                <h4 className='md:text-4xl text-3xl font-semibold text-center'>Please allow camera access</h4>
                <p className='text-center mt-4 max-w-lg mx-auto'>Your browser needs permission to activate your camera.</p>
                <div className='sm:max-w-lg  mx-auto md:mt-12 mt-5'>
                    <h5 className='text-xl font-semibold'>Take a photo of yourself</h5>
                    <form action="">
                        <div className='border-dashed border-2 w-full bg-[#F7F7F7] p-3 h-60 flex flex-col justify-center rounded-xl'>
                            <label htmlFor='uload' className='text-center'>
                                <img src={Upload} alt="" className='bg-[#EDEDED] p-3 rounded-lg mx-auto' />

                            </label>
                            <input type="file" className='hidden' id='uload' />
                        </div>
                        <p className='text-center mt-4 max-w-lg mx-auto'>Hold your device straight out in front of you or ask a friend to take your photo.
                            Make sure your entire face is showing.</p>
                        <div className='text-center mt-5'>
                            <button type='button' className='bg-black text-white py-2 px-6 rounded-full'>Take Photo</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CameraAccess
