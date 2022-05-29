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
import PerfectScrollbar from "react-perfect-scrollbar";
import {makeStyles} from "@material-ui/styles";
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
const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        maxWidth: '350px',
        minWidth: '300px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            minWidth: '100%'
        }
    },
    headerAvatar: {
        cursor: 'pointer',
        ...theme.typography.mediumAvatar,
        margin: '8px 0 8px 8px !important'
    },
    profileChip: {
        height: '48px',
        alignItems: 'center',
        borderRadius: '27px',
        transition: 'all .2s ease-in-out',
        borderColor: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.light,
        '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: theme.palette.primary.main + '!important',
            color: theme.palette.primary.light,
            '& svg': {
                stroke: theme.palette.primary.light
            }
        }
    },
    profileLabel: {
        lineHeight: 0,
        padding: '12px'
    },
    listItem: {
        marginTop: '5px'
    },
    cardContent: {
        padding: '16px !important'
    },
    card: {
        backgroundColor: theme.palette.primary.light,
        marginBottom: '16px',
        marginTop: '16px'
    },
    searchControl: {
        width: '100%',
        paddingRight: '8px',
        paddingLeft: '16px',
        marginBottom: '16px',
        marginTop: '16px'
    },
    startAdornment: {
        fontSize: '1rem',
        color: theme.palette.grey[500]
    },
    flex: {
        display: 'flex'
    },
    name: {
        marginLeft: '2px',
        fontWeight: 400
    },
    ScrollHeight: {
        height: '100%',
        maxHeight: 'calc(100vh - 250px)',
        overflowX: 'hidden'
    },
    badgeWarning: {
        backgroundColor: theme.palette.warning.dark,
        color: '#fff'
    }
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
        url:'https://back-serveur.herokuapp.com/donuts.jpg',

    },
    {
        title: 'Bar',
        width: '32.5%',
        url:'https://back-serveur.herokuapp.com/bar.jpg'

    },
    {
        title: 'Rate',
        width: '35%',
        url: 'https://back-serveur.herokuapp.com/rates.jpg'


    },



];

export default function Chose() {
    let imbd='https://back-serveur.herokuapp.com/donuts.jpg'
    const dispatcher = useDispatch();

    const classes = useStyles();

    const handleChange=(name)=>{
        dispatcher({
            type:CHANGE_SUCCESS,
            payload: {Type:name}

        });

    }
    return (

        <Container component="section" sx={{ mt: 0, mb: 4 }}>
            <PerfectScrollbar className={classes.ScrollHeight}>

                <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap' }}>
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
                                    position: 'absolute',

                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center 40%',
                                    backgroundImage: `url(${image.url})`,                            }}
                            />



                            <ImageBackdrop className="imageBackdrop" />
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

                        </ImageIconButton>
                    ))}
                </Box>
            </PerfectScrollbar>
        </Container>
    );
}