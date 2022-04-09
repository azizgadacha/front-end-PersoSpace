import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../Typography';
import {Button, Grid} from "@mui/material";
import { withStyles } from "@material-ui/styles";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Dashboard from "../../dashboard/Default";

const ImageBackdrop = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: '#000',
    opacity: 0.05,
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




const imageStyles = { root: { width: 64, height: 64, marginBottom: 0 ,flexDirection: "column"} };
const buttonStyles = {
    label: {
        flexDirection: "column"
    }
};
const Image = withStyles(imageStyles)(({ classes }) =>
    <UploadFileIcon classes={classes} />
);

const Import = props => {
    return (
        <div>
            <Button dense color="primary" classes={props.classes} >
                <Grid sx={{flexDirection: "flex"}}>
                <Image />Add me
                </Grid>
            </Button>
        </div>
    );
}
export default Import;
