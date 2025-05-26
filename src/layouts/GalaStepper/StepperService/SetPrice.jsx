import React from 'react'

const SetPrice = () => {
    const items = [
        { label: 'Lightning', id: 'lightning' },
        { label: 'Sound', id: 'sound' },
        { label: 'A/v', id: 'av' },
        { label: 'Progressive house', id: 'progressiveHouse' },
        { label: 'MC', id: 'mc' },
        { label: 'Wireless Mic', id: 'wireless' },
        { label: 'Sparklers', id: 'sparklers' },
    ];
    return (
        <div className='py-12'>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <p className='text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2'>Step 10</p>
                    <div>
                        <h2 className='text-[#171717] font-bold xl:text-6xl lg:text-5xl text-3xl mt-5'>Set Your Service Price<br></br>
                            —Let's Do This!</h2>
                        <p className='text-[#171717] mt-3 text-lg'>Feel free to tweak it whenever you like!</p>
                    </div>
                </div>
                <div className='bg-[#F7F7F7] rounded-xl p-3'>
                    <div className='overflow-y-auto h-[400px] px-2'>
                        {items.map((item, index) => (
                            <div key={index} className='flex flex-wrap items-center gap-3 border p-3 rounded-lg mt-3'>
                                <input type="checkbox" id={item.id} className='accent-black w-5 h-5' />
                                <div className='border p-2 flex items-center rounded-lg bg-white gap-2'>
                                    <p className='text-black'>$</p>
                                    <input type="number" placeholder='Type here' className='w-24 bg-transparent' />
                                </div>
                                <label htmlFor={item.id} className='text-black font-medium text-lg'>{item.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetPrice
