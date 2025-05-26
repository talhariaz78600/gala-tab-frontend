import React, { useState } from 'react';

const ServiceDescription = () => {
    const [description, setDescription] = useState('');
    const maxCharacters = 500;

    const handleInputChange = (e) => {
        if (e.target.value.length <= maxCharacters) {
            setDescription(e.target.value);
        }
    };

    return (
        <div className='py-12'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className='text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2'>Step 03</p>
                    <div>
                        <h2 className='text-[#171717] font-bold xl:text-6xl lg:text-5xl text-3xl mt-5'>Write a Description That
                            Stands Out Service!</h2>
                        <p className='text-[#171717] mt-3 text-lg'>Tell guests what makes your place unique - share the magic!</p>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="serviceTitle" className='text-[#202529] text-sm font-medium ml-4'>Enter Your Service Title</label>
                        <input 
                            id="serviceTitle" 
                            type="text" 
                            className='w-full shadow px-3 py-2 rounded-lg border' 
                            placeholder='Type here' 
                        />
                    </div>
                    <div className='mt-4'>
                        <textarea 
                            className='w-full shadow px-3 py-2 rounded-lg border focus-none' 
                            cols='10' 
                            rows='10' 
                            placeholder='Type here' 
                            aria-label="Service Description" 
                            value={description} 
                            onChange={handleInputChange}
                        ></textarea>
                        <span 
                            className={`block mt-2 text-sm ${description.length === maxCharacters ? 'text-red-500' : 'text-gray-500'}`}
                        >
                            {description.length}/{maxCharacters} characters
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDescription;
