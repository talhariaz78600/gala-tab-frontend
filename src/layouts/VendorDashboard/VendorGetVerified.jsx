import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import IdType from './VendorGetVerified/IdType';
import IdentityCard from './VendorGetVerified/IdentityCard';
import PhotoYourself from './VendorGetVerified/PhotoYourself';
import CameraAccess from './VendorGetVerified/CameraAccess';
import ReviewPhoto from './VendorGetVerified/ReviewPhoto';
import GovernmentId from './VendorGetVerified/GovernmentId';
import ReviewId from './VendorGetVerified/ReviewId';

const steps = [
    { component: <GovernmentId /> },
    { component: <IdType /> },
    { component: <IdentityCard /> },
    { component: <PhotoYourself /> },
    { component: <CameraAccess /> },
    { component: <ReviewPhoto /> },
    { component: <ReviewId /> },
];

export default function VendorGetVerified() {
    const theme = useTheme();
    const navigate = useNavigate(); // Get navigate function
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = () => {
        console.log("Submit clicked");
        navigate('/vendor-dashboard/Vendor-Profile'); // Replace with your target path
    };

    return (
        <div>
            <div className="border border-b">
                <div className="mycontainer">
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <Link to="/vendor-dashboard/Vendor-Profile" className="bg-gradient-to-b inline-block from-gray-500 to-gray-900 text-white me-2 text-nowrap font-semibold py-3 px-5 sm:px-8 rounded-full border-4 border-black shadow-md">
                                Gala Tab
                            </Link>
                        </div>
                        <div>
                            <Link to="/vendor-dashboard/Vendor-Profile" className="bg-white border inline-block py-2 px-4 shadow-xl rounded-3xl">Exit Page</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mycontainer">
                <Box sx={{ flexGrow: 1 }}>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            pl: 2,
                            bgcolor: 'background.default',
                        }}
                    >
                        {steps[activeStep].component}
                    </Paper>
                    <MobileStepper sx={{maxWidth: '1000px', margin: 'auto'}}
                        variant="text"
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            activeStep === maxSteps - 1 ? (
                                <Button
                                    sx={{
                                        backgroundColor: '#000',
                                        borderRadius: '25px',
                                        color: '#fff',
                                        padding: '8px 38px',
                                        textTransform: 'Capitalize',
                                    }}
                                    size="small"
                                    onClick={handleSubmit} // Call handleSubmit on submit
                                >
                                    Submit
                                </Button>
                            ) : (
                                <Button
                                    sx={{
                                        backgroundColor: '#000',
                                        borderRadius: '25px',
                                        color: '#fff',
                                        padding: '8px 38px',
                                        textTransform: 'Capitalize',
                                        fontFamily:"tt_chocolates",
                                    }}
                                    size="small"
                                    onClick={handleNext}
                                >
                                    Next
                                </Button>
                            )
                        }
                        backButton={
                            <Button
                                sx={{
                                    backgroundColor: '#E7E7E7',
                                    borderRadius: '25px',
                                    color: '#202529',
                                    padding: '8px 38px',
                                    textTransform: 'Capitalize',
                                    fontFamily:"tt_chocolates",
                                }}
                                size="small"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                            >
                                Back
                            </Button>
                        }
                    />
                </Box>
            </div>
        </div>
    );
}
