import React from 'react'
import { IoCloseCircle } from "react-icons/io5";
import Quality from '../../../assets/img/quality.png'
import { useNavigate } from 'react-router';

const TextConfirmation = () => {
  const navigate = useNavigate();
  return (
    <div className='h-dvh'>
      <div className='flex flex-col items-center justify-center w-full h-full max-w-screen-sm mx-auto px-5'>
        <div className='w-full border rounded-xl shadow-xl'>
          <div className='flex items-center justify-between border-b p-4'>
            <div></div>
            <div>
              <h2 className='font-semibold sm:text-2xl text-lg'>Identify Verification</h2>
            </div>
            <div onClick={() => navigate('/')} className='cursor-pointer'>
              <IoCloseCircle className='text-3xl text-slate-500' />
            </div>
          </div>
          <div className='py-3 mt-7'>
              <img src={Quality} alt="" className='mx-auto rounded-lg w-20 h-full object-cover'/>
          </div>
          <div className='mt-4'>
            <h5 className='font-semibold text-2xl text-center'>Text Confirmation</h5>
            <p className='text-center text-sm text-[#484848]'>A code was sent to XXX-XXX-2121</p>
          </div>
          <div className="grid grid-cols-6 sm:gap-6 gap-2 sm:px-16 px-3 mt-9">
            <div className='border-gray-400 border bg-slate-300 rounded-xl xs:p-3 p-2 flex items-center justify-center'>
                <input type="text" className='border-b border-b-gray-700 bg-slate-300 sm:w-4 w-3 sm:mb-4 text-center' maxLength={1}/>
            </div>
            <div className='border-gray-400 border bg-slate-300 rounded-xl xs:p-3 p-2 flex items-center justify-center'>
                <input type="text" className='border-b border-b-gray-700 bg-slate-300 sm:w-4 w-3 sm:mb-4 text-center' maxLength={1}/>
            </div>
            <div className='border-gray-400 border bg-slate-300 rounded-xl xs:p-3 p-2 flex items-center justify-center'>
                <input type="text" className='border-b border-b-gray-700 bg-slate-300 sm:w-4 w-3 sm:mb-4 text-center' maxLength={1}/>
            </div>
            <div className='border-gray-400 border bg-slate-300 rounded-xl xs:p-3 p-2 flex items-center justify-center'>
                <input type="text" className='border-b border-b-gray-700 bg-slate-300 sm:w-4 w-3 sm:mb-4 text-center' maxLength={1}/>
            </div>
            <div className='border-gray-400 border bg-slate-300 rounded-xl xs:p-3 p-2 flex items-center justify-center'>
                <input type="text" className='border-b border-b-gray-700 bg-slate-300 sm:w-4 w-3 sm:mb-4 text-center' maxLength={1}/>
            </div>
            <div className='border-gray-400 border bg-slate-300 rounded-xl xs:p-3 p-2 flex items-center justify-center'>
                <input type="text" className='border-b border-b-gray-700 bg-slate-300 sm:w-4 w-3 sm:mb-4 text-center' maxLength={1}/>
            </div>
          </div>
          <div className='mt-16'>
            <button type='button' className='text-center w-full text-base font-medium text-sky-500'>Send again</button>
          </div>
          <div className='mb-9 mt-7 max-w-screen-sm mx-auto px-9'>
            <button to="#" className='font-medium text-white bg-gray-950 drop-shadow-2xl w-full block text-center py-3 rounded-lg'>Done</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextConfirmation
