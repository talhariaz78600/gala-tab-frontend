import React, { useState } from 'react';
import Upload from "../../../assets/img/upload.png";

const IdentityCard = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImage(URL.createObjectURL(file)); // Create a preview URL for the selected image
    } else {
      alert('Please select a valid JPEG or PNG file.');
    }
  };

  return (
    <div className='py-7 w-full'>
      <div className=''>
        <h4 className='md:text-4xl text-3xl font-semibold text-center'>
          Upload images of your identity card
        </h4>
        <p className='text-center mt-4 max-w-lg mx-auto'>
          Make sure your photos aren’t blurry and the front of your identity card clearly shows your face.
        </p>
        <div className='sm:max-w-lg mx-auto md:mt-12 mt-5'>
          <form>
            {/* Upload Front */}
            <div className='border-dashed border-2 w-full bg-[#F7F7F7] p-3 h-60 flex flex-col justify-center rounded-xl'>
              <label htmlFor='uploadFront' className='text-center cursor-pointer'>
                {frontImage ? (
                  <img
                    src={frontImage}
                    alt="Uploaded front"
                    className='rounded-lg mx-auto h-full object-contain'
                  />
                ) : (
                  <>
                    <img src={Upload} alt="" className='bg-[#EDEDED] p-3 rounded-lg mx-auto' />
                    <p className='font-medium text-xl text-[#171717]'>Upload front</p>
                    <p className='text-xs font-medium'>JPEG or PNG only</p>
                  </>
                )}
              </label>
              <input
                type="file"
                className='hidden'
                id='uploadFront'
                onChange={(e) => handleImageChange(e, setFrontImage)}
              />
            </div>

            {/* Upload Back */}
            <div className='border-dashed border-2 w-full bg-[#F7F7F7] p-3 h-60 flex flex-col mt-5 justify-center rounded-xl'>
              <label htmlFor='uploadBack' className='text-center cursor-pointer'>
                {backImage ? (
                  <img
                    src={backImage}
                    alt="Uploaded back"
                    className='rounded-lg mx-auto h-full w-full object-contain'
                  />
                ) : (
                  <>
                    <img src={Upload} alt="" className='bg-[#EDEDED] p-3 rounded-lg mx-auto' />
                    <p className='font-medium text-xl text-[#171717]'>Upload back</p>
                    <p className='text-xs font-medium'>JPEG or PNG only</p>
                  </>
                )}
              </label>
              <input
                type="file"
                className='hidden'
                id='uploadBack'
                onChange={(e) => handleImageChange(e, setBackImage)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IdentityCard;
