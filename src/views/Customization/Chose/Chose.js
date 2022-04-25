import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../Typography';
import AppCurrentVisits from "../donuts/AppCurrentVisits";
import AppWebsiteVisits from "../barChart/AppWebsiteVisits";
import AppCurrentSubject from "../AppCurrentSubject";
import {CHANGE_SUCCESS, } from "../../../store/actions";
import {useDispatch} from "react-redux";
import AppConversionRates from "../Rates/AppConversionRates";

const ImageBackdrop = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: '#000',
    opacity: 0.15,
    transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '30vh',
    [theme.breakpoints.down('md')]: {
        width: '100% !important',
        height: 100,
    },
    '&:hover': {
        zIndex: 1,
    },
    '&:hover .imageBackdrop': {
        opacity: 0.5,
    },
    '&:hover .imageMarked': {
        opacity: 0,
    },
    '&:hover .imageTitle': {
        border: '4px solid currentColor',
    },
    '& .imageTitle': {
        position: 'relative',
        padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
    },
    '& .imageMarked': {
        height: 3,
        width: 18,
        background: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));

const images = [
    {
        title: 'Donuts',
        width: '32.5%',
        ahba:<AppCurrentVisits/>,

    },
    {
        title: 'Bar',
        width: '32.5%',
        ahba:<AppWebsiteVisits />

    },
    {
        title: 'Rate',
        width: '35%',
        ahba: <AppConversionRates />


    },



];

export default function Chose() {
    const dispatcher = useDispatch();


    const handleChange=(name)=>{
            dispatcher({
                type:CHANGE_SUCCESS,
                payload: {Type:name}

            });

    }
    return (

        <Container component="section" sx={{ mt: 0, mb: 4 }}>

            <Box sx={{ mt: 8, display: 'flex' }}>
                {images.map((image) => (
                    <ImageIconButton
                        key={image.title}
                        style={{
                            width: image.width,
                        }}
                        onClick={()=> {
                            handleChange(image.title)
                        }}
                    >
                        <Box
                            sx={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center 40%',
                            }}
                        />

                        {image.ahba}

                        <Box>
                        <ImageBackdrop className="imageBackdrop" ></ImageBackdrop>
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                               right: 0,
                                top: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'common.white',
                            }}
                        >
                            <Typography
                                component="h3"
                                variant="h6"
                                color="inherit"
                                className="imageTitle"

                            >
                                {image.title}
                                <div className="imageMarked" />
                            </Typography>
                        </Box>
                        </Box>
                    </ImageIconButton>
                ))}
            </Box>
        </Container>
    );
}