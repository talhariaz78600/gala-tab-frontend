import React from 'react'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
    accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
        transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const AmenitiesDetail = () => {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const options = [
        "Ground floor",
        "Elevator",
        "Wheelchair accessible",
        "Stairs",
        "Tables & Chairs",
        "Buffet Area",
        "Bar",
        "kitchen",
        "Fridge",
        "Coolers",
        "Stove",
        "Microwave",
        "Outside food allowed",
        "Indoor",
        "Outdoor",
        "Dressing Room",
        "Outside alcohol allowed",
        "Bridal Suite",
    ];
    return (
        <div className='py-12'>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <p className='text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2'>Step 06</p>
                    <div>
                        <h2 className='text-[#171717] font-bold xl:text-6xl lg:text-5xl text-3xl mt-5'>Show off Your Offers
                            Amenities!</h2>
                        <p className='text-[#171717] mt-3 text-lg'>Got more perks? No problem - add extra amenities anytime after
                            you publish!</p>
                    </div>
                </div>
                <div className='bg-[#F7F7F7] p-3 h-[400px] overflow-y-auto rounded-lg'>
                    <Accordion className='mb-3' sx={{ border: '0px' }}  expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary sx={{ border: '1px solid #ccc', backgroundColor: '#F7F7F7', borderRadius: '10px' }} aria-controls="panel1d-content" id="panel1d-header">
                            <Typography sx={{ backgroundColor: '#F7F7F7' }}  component="span">Venues Amenities</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{backgroundColor: '#F7F7F7', border:'none'}}>
                            <Typography>
                                <div className="grid lg:grid-cols-3 gap-4">
                                    {options.map((option, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input type="checkbox" id={`option-${index}`} className="accent-black w-5 h-5" />
                                            <label htmlFor={`option-${index}`}>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default AmenitiesDetail
