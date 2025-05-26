import React from 'react'
import MorePhoto from "../../../assets/img/more-photo.png"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsThreeDots } from "react-icons/bs";

const EditPhoto = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className='py-12'>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <p className='text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2'>Step 05</p>
                    <div className='mt-9'>
                        <h2 className='text-[#171717] font-bold xl:text-6xl lg:text-5xl text-3xl mt-5'>How’s This Looking?</h2>
                        <p className='text-[#171717] mt-3 text-lg'>Drag to reorder and make sure everything’s picture-perfect!</p>
                    </div>
                    <div className='mt-9'>
                        <label htmlFor="uload" className='bg-[#32F0CD] shadow rounded-full px-6 py-2 font-smibold'>Upload more photos</label>
                        <input type="file" id='uload' className='hidden' />
                    </div>
                </div>
                <div className='bg-[#F7F7F7] rounded-xl p-4'>
                    <div className='h-[400px] overflow-y-auto pe-4'>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className='relative'>
                                <img src={MorePhoto} alt="" className='w-full h-full' />
                                <div className='absolute top-0 right-0'>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <BsThreeDots className='bg-white rounded-full p-2 text-4xl text-black shadow-lg' />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                                        <MenuItem onClick={handleClose}>Move forward</MenuItem>
                                        <MenuItem onClick={handleClose}>Move backward</MenuItem>
                                        <MenuItem onClick={handleClose}>Make cover photo</MenuItem>
                                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                                    </Menu>
                                </div>
                                <div className='absolute bottom-2 left-2'>
                                    <button className='bg-white rounded-lg p-2  text-black shadow-lg'>Cover Photo</button>
                                </div>
                            </div>
                            <div>
                                <img src={MorePhoto} alt="" className='w-full h-full' />
                            </div>
                            <div>
                                <img src={MorePhoto} alt="" className='w-full h-full' />
                            </div>
                            <div>
                                <img src={MorePhoto} alt="" className='w-full h-full' />
                            </div>
                            <div>
                                <img src={MorePhoto} alt="" className='w-full h-full' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPhoto
