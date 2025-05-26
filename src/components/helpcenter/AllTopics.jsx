import React from 'react'
import AllTopicsTabs from './AlltopicsTabs'

export default function AllTopics() {
  return (
    <div>
      <h3 className='font-semibold text-[40px] text-[rgba(28,28,28,1)]'>All Topics</h3>
      <p className='font-500 text-[18px] mt-8'>Browse our full library of help topics.</p>
      <div className='mt-4'>
      <AllTopicsTabs/>
      </div>
    </div>
  )
}
