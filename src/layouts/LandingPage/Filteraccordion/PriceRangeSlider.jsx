import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function PriceRangeSlider() {
  return (
    <div className="bg-[#F7F7F7] p-3 rounded-lg my-3 border border-[#CDCDCD]">
      <h4 className="text-black font-semibold text-xl mb-4">Price Range</h4>
      <div className="relative h-[200px] flex flex-col justify-center w-full mt-12 px-4">
        <Box>
          <Slider
            aria-label="Price Range"
            defaultValue={300}
            step={50}
            marks={[
              { value: 50, label: '$50' },
              { value: 100, label: '$100' },
              { value: 150, label: '$150' },
              { value: 200, label: '$200' },
              { value: 250, label: '$250' },
              { value: 300, label: '$300' },
              { value: 350, label: '$350' },
              { value: 400, label: '$400' },
              { value: 450, label: '$450' },
              { value: 500, label: '$500' },
            ]}
            min={50}
            max={500}
            sx={{
              '& .MuiSlider-thumb': {
                width: 0,
                height: 0,
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderBottom: '25px solid #FFFFFF',
                backgroundColor: 'transparent',
                borderRadius: '30px',
                boxShadow: 'none',
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
              '& .MuiSlider-track': {
                height: '0px',
                backgroundColor: '#CDCDCD',
                border: '0px'
              },
              '& .MuiSlider-rail': {
                height: '1px',
                backgroundColor: '#CDCDCD',
              },
              '& .MuiSlider-mark': {
                height: '77px',
                width: '2px',
                backgroundColor: '#CDCDCD',
                top: '-28px'
              },
              '& .MuiSlider-valueLabel': {
                display: 'none',
                fontFamily: 'tt_chocolates', 
              },
              '& .MuiSlider-markLabel': {
                fontFamily: 'tt_chocolates', 
              },
            }}
          />
        </Box>
        <div className='flex sm:flex-row flex-col items-center justify-between'>
            <div>
                <p className='bg-[#F7FBFF] py-2 px-9 rounded-full border'>$10</p>
                <p className='text-center'>Minimum</p>
            </div>
            <div>
                <p className='bg-[#F7FBFF] py-2 px-9 rounded-full border'>$300</p>
                <p className='text-center'>Maximum</p>
            </div>
        </div>
      </div>
    </div>
  );
}
