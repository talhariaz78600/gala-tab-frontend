import React from 'react'
import Upload from "../../../assets/img/upload.png"
import { Link } from 'react-router'

const ReviewPhoto = () => {
  return (
    <div className='py-7 w-full'>
            <div className=''>
                <h4 className='md:text-4xl text-3xl font-semibold text-center'>Review your photo</h4>
                <p className='text-center mt-4 max-w-lg mx-auto'>Make sure it’s well-lit, clear, and matches the person in the ID.</p>
                <div className='sm:max-w-lg  mx-auto md:mt-12 mt-5'>
                    <h5 className='text-xl font-semibold'>Your Photo is Clear Thanks!</h5>
                    <form action="">
                        <div className='border-dashed border-2 w-full bg-[#F7F7F7] p-3 h-60 flex flex-col relative justify-center rounded-xl'>
                            <label htmlFor='uload' className='text-center relative'>
                                <img src={Upload} alt="" className='bg-[#EDEDED] p-3 rounded-lg mx-auto' />
                            </label>
                            <input type="file" className='hidden' id='uload' />
                            <div className='absolute bottom-2 right-2'>
                                    <Link to="#" className="text-[#3551B6] bg-white shadow-xl text-sm inline-flex rounded-full py-2 px-5">Retake Photo</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default ReviewPhoto
