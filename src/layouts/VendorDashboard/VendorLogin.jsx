import React from 'react'
import GoogleImg from '../../assets/img/google.png'
import FacebookImg from '../../assets/img/facebook.png'
import { Link } from 'react-router'

const VendorLogin = () => {
  return (
    <div className='md:h-dvh py-2'>
    <div className='flex flex-col items-center justify-center w-full h-full max-w-screen-lg mx-auto px-5'>
      <div className='w-full rounded-xl'>
        <h2 className='font-semibold sm:text-3xl text-[#0C1421] text-lg text-center'>Welcome Back!</h2>
        <div className='flex items-center justify-center my-5'>
          <Link to="#" className="bg-gradient-to-b from-gray-500 to-gray-900 text-white me-2 text-nowrap font-semibold py-3 px-5 sm:px-8 rounded-full border-4 border-black shadow-md">
            Gala Tab
          </Link>
        </div>
        <form action="/user-dashboard/dashboard" className='max-w-screen-md mx-auto my-3 py-6 sm:px-0 px-4'>
          <div className="md:flex justify-between w-full md:gap-x-36 gap-x-20 relative pb-20">
            <div className='w-full'>
              <h4 className='text-center sm:text-2xl text-xl font-semibold'>Login With Accents</h4>
              <div className='w-full mt-9'>
                <Link to="#" className='flex items-center w-full justify-center border bg-[#F7FBFF] py-2 rounded-lg'>
                  <img src={GoogleImg} alt="" />
                  <p className='ms-2'>Sign in with Google</p>
                </Link>
              </div>
              <div className='mt-6'>
                <Link to="#" className='flex items-center justify-center border bg-[#F7FBFF] py-2 rounded-lg'>
                  <img src={FacebookImg} alt="" />
                  <p className='ms-2 text-base font-normal'>Sign in with Facebook</p>
                </Link>
              </div>
            </div>
            <div className='absolute bg-gray-300 md:w-px md:h-full h-px w-full md:inset-1/2 md:top-0 md:m-0 my-6'></div>
            <div className="w-full md:mt-0 mt-9">
              <h4 className='sm:text-2xl text-xl font-semibold text-center'>Login</h4>
              <div className='mt-4'>
                <label className='text-base font-normal' htmlFor="">Email</label>
                <input type="text" className='border-gray-200 border w-full rounded-lg p-2 bg-[#F7FBFF]' placeholder='Type here' />
              </div>
              <div className='mt-3'>
                <label className='text-base font-normal' htmlFor="">Password</label>
                <input type="text" className='border-gray-200 border w-full rounded-lg p-2 bg-[#F7FBFF]' placeholder='Type here' />
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className='flex items-center'>
                  <input type="checkbox" className='h-4 w-4 accent-gray-900 rounded-lg' />
                  <label htmlFor="" className='ms-2 text-xs font-medium'>Remember me</label>
                </div>
                <div>
                  <Link to="#" className='text-xs text-[#3551B6] font-medium'>Forgot Password</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 md:mt-12 mt-6">
            <div className='md:col-start-2 md:col-end-4 col-start-1 col-end-5'>
              <div>
                <button className='bg-[#1C1C1C] text-white w-full py-2 font-medium text-xl rounded-lg shadow-2xl'>Login</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default VendorLogin
