import React from 'react'

export default function GuideCard(props) {
  return (
    <div className='w-full aspect-square relative rounded-[20px]'>
        <img className='w-full h-full object-cover rounded-[20px]' src={props.img} alt="img" />
        <div className='absolute w-full bottom-[16px]'>
            <div className='bg-[rgba(255,255,255,0.9)] p-6 mx-4 rounded-xl'>
                <p className='text-[rgba(28,28,28,1)] font-bold min-[480px]:text-[18px] font-Caveat hover:underline underline-offset-2'>{props.text}</p>
            </div>
        </div>
    </div>
  )
}
