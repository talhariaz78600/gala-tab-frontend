import React from 'react'
import Upload from "../../../assets/img/take-photo.png"

const PhotoYourself = () => {
  return (
    <div className='py-7 w-full'>
        <div className=''>
            <h4 className='md:text-4xl text-3xl font-semibold text-center'>Take a photo of yourself</h4>
            <p className='text-center mt-4 max-w-lg mx-auto'>We’ll compare it to the photo on your ID to make sure they match. Don’t Worry, This photo won’t show on your profile.</p>
            <div className='sm:max-w-lg  mx-auto md:mt-12 mt-5'>
                <h5 className='text-xl font-semibold'>Example</h5>
                <form action="">
                    <div className='border-dashed border-2 w-full bg-[#F7F7F7] p-3 h-60 flex flex-col justify-center rounded-xl'>
                        <label htmlFor='uload' className='text-center'>
                            <img src={Upload} alt="" className='bg-[#EDEDED] p-3 rounded-lg mx-auto'/>

                        </label>
                        <input type="file" className='hidden' id='uload'/>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default PhotoYourself
