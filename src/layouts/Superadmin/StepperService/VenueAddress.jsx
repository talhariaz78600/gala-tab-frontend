import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { BsSendFill } from 'react-icons/bs';
import { IoCloseCircle } from 'react-icons/io5';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2) },
    '& .MuiDialogActions-root': { padding: theme.spacing(1) },
}));

const VenueAddress = () => {
    const [center, setCenter] = useState({ lat: -33.8688, lng: 151.2093 });
    const [currentLocation, setCurrentLocation] = useState(null);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const mapStyles = { height: '300px', width: '100%', borderRadius: '12px' };

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newCenter = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCenter(newCenter);
                    setCurrentLocation(newCenter);
                },
                () => alert('Unable to retrieve your location.')
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClickOpen2 = () => {
        setOpen(false);
        setOpen2(true);
    };
    const handleClose2 = () => setOpen2(false);

    return (
        <div className="py-12">
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <p className="text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2">
                        Step 07
                    </p>
                    <h2 className="text-[#000] font-bold xl:text-6xl lg:text-5xl text-3xl mt-5">Enter Your Venue Address</h2>
                    <p className="text-[#000] mt-3 text-lg">
                        Your address stays private and is only shared with guests once they’ve locked in a reservation.
                    </p>
                </div>
                <div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleUseCurrentLocation}
                            className="bg-[#32F0CD] flex gap-2 items-center p-2 rounded-full pe-3 text-sm font-medium"
                        >
                            <BsSendFill className="bg-[#14D2AF] text-white rounded-full p-2 text-3xl" />
                            Use my current location as a site office
                        </button>
                    </div>
                    <div className="mt-3 border shadow p-2 bg-white rounded-xl">
                        <LoadScript googleMapsApiKey="AIzaSyAu1gwHCSzLG9ACacQqLk-LG8oJMkarNF0">
                            <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={center}>
                                {currentLocation && <Marker position={currentLocation} />}
                            </GoogleMap>
                        </LoadScript>
                    </div>
                    <React.Fragment>
                        <button className="text-[#DB7F5B] underline" onClick={handleClickOpen}>
                            Enter manual address
                        </button>
                        <BootstrapDialog sx={{ '& .MuiDialog-paper': { maxWidth: '700px', width: '100%', borderRadius: '20px'  }, fontFamily: 'tt_chocolates' }} onClose={handleClose} open={open}>
                            <DialogTitle id="customized-dialog-title" sx={{ m: 0, p: 2, textAlign: 'center' }}>
                                Where's your property located?
                            </DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{ position: 'absolute', right: 8, top: 8, color: 'grey' }}
                            >
                                <IoCloseCircle />
                            </IconButton>
                            <DialogContent dividers>
                                <Typography gutterBottom>
                                    <p className="text-center">
                                        Your address is only shared with guests after they’ve made a reservation.
                                    </p>
                                    <LoadScript googleMapsApiKey="AIzaSyAu1gwHCSzLG9ACacQqLk-LG8oJMkarNF0">
                                        <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={center}>
                                            {currentLocation && <Marker position={currentLocation} />}
                                        </GoogleMap>
                                    </LoadScript>
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <div className="w-full flex items-center justify-between">
                                    <button className="text-[#DB7F5B] underline" onClick={handleClickOpen2}>
                                        Enter manual address
                                    </button>
                                    <button className="bg-black text-white p-2 rounded-lg" onClick={handleClose}>
                                        Save changes
                                    </button>
                                </div>
                            </DialogActions>
                        </BootstrapDialog>
                        <BootstrapDialog
                            sx={{ '& .MuiDialog-paper': { maxWidth: '700px', width: '100%', borderRadius: '30px'  }, fontFamily: 'tt_chocolate' }}
                            onClose={handleClose2}
                            open={open2}
                        >
                            <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }}>Confirm your address</DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose2}
                                sx={{ position: 'absolute', right: 8, top: 8, color: 'grey' }}
                            >
                                <IoCloseCircle className='text-[#979797]'/>
                            </IconButton>
                            <DialogContent dividers>
                                <Typography gutterBottom>
                                    <form action="" className='max-w-[600px] mx-auto'>
                                        <p>Your address is only shared with guests after they’ve made a reservation.</p>
                                        <div className='mb-3'>
                                            <label htmlFor="">Country / region</label>
                                            <input type="text" className='shadow bg-white rounded-lg border w-full px-3 py-2' placeholder="Type here"/>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="">Street address</label>
                                            <input type="text" className='shadow bg-white rounded-lg border w-full px-3 py-2' placeholder="Type here"/>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="">Street address</label>
                                            <input type="text" className='shadow bg-white rounded-lg border w-full px-3 py-2' placeholder="Type here"/>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="">City / town / village</label>
                                            <input type="text" className='shadow bg-white rounded-lg border w-full px-3 py-2' placeholder="Type here"/>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="">Province / state / territory (if applicable)</label>
                                            <input type="text" className='shadow bg-white rounded-lg border w-full px-3 py-2' placeholder="Type here"/>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="">Zip Code (if applicable)</label>
                                            <input type="text" className='shadow bg-white rounded-lg border w-full px-3 py-2' placeholder="Type here"/>
                                        </div>
                                        <div className='flex items-center justify-between mt-4 gap-2'>
                                            <div>
                                                <input type="reset" value="Clear" className='underline'/>
                                            </div>
                                            <div>
                                                <button className="bg-black text-white p-2 px-9 rounded-md" onClick={handleClose2}>Save</button>
                                            </div>
                                        </div>
                                    </form>
                                </Typography>
                            </DialogContent>
                        </BootstrapDialog>
                    </React.Fragment>
                </div>
            </div>
        </div>
    );
};

export default VenueAddress;
