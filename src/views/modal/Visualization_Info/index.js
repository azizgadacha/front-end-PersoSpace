import React, {Fragment, useEffect, useState} from 'react';
// material
import Fade from '@mui/material/Fade';

import {
    Stack,
    Typography,
    Box,

    Avatar,
    Button,
    Modal,
    TextField, ClickAwayListener,
} from '@mui/material';
// components
import ThemeConfig from "../../../themes/theme2"


import Backdrop from '@mui/material/Backdrop';

import axios from "axios";
import configData from "../../../config";

import {useDispatch, useSelector} from "react-redux";
import {ADD_USER, CLICK, CLOSE_MODAL, CLOSE_MODAL_INFORMATION, LOGOUT} from "../../../store/actions";


import {Formik} from "formik";
import * as Yup from "yup";
import {
    FormControl,
    FormHelperText,
    Grid,
    IconButton, useMediaQuery,
} from "@material-ui/core";
import {gridSpacing} from "../../../store/constant";

import {Alert, LoadingButton} from "@material-ui/lab";
import AnimateButton from "../../../animation/AnimateButton";
import useScriptRef from "../../../hooks/useScriptRef";
import {makeStyles} from "@material-ui/styles";
import SaveIcon from "@mui/icons-material/Save";
import {Add, Adding, Cancel, CLOSE} from "../../Button/actionButton";
import {useHistory} from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

// ----------------------------------------------------------------------

const OVERLAY_Styles ={
    position: 'fixed',
    top: 0,
    left: 0,
    right:0,
    bottom:0,
    backgroundColor: 'rgba(0,0,0, .2)',
    zIndex:100

}
const style = {

    padding:'50px',
    zIndex:100,
minWidth:'320px',
    maxWidth:"80%",
    borderRadius: 5,


    position: 'absolute',
    top: '50%',
    left: '50%',
    radius:3,
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({





    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    },

    root: {
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },

        '&:hover .AvatarBackdrop': {
            opacity: 0.5,
        },
    },
    input: {
        display: "none",


    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        '&:hover .imageBackdrop': {
            opacity: 0.5,
        },
    },


}));






const User=  (props) => {
    const [isloading, setIsloading] = useState(false);




    const classes = useStyles();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));






    let history =useHistory()









    const dispatcher = useDispatch();

    let account = useSelector((state) => state.account);



    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_MODAL_INFORMATION,
            });
        }
    }, [])
    const handleClose=()=>{

        dispatcher({
            type:CLOSE_MODAL_INFORMATION,
        });

    }


    let open1 = useSelector((state) => state.modal);






    return (
        <Fragment>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"

                open={open1.ModalInformation}
                onClose={handleClose}

                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <div style={OVERLAY_Styles}>
                    <ClickAwayListener onClickAway={handleClose}>

                    <Fade in={open1.ModalInformation}>

                    <Box sx={{ ...style,  }} >
                        <IconButton sx={{float:'right'}}               label="close">
                            <CloseIcon onClick={handleClose}  color="disabled"      />
                        </IconButton>
                        <ThemeConfig>





                            <grid>

                                <Typography sx={{mt:1}} id="child-modal-title"
                                            gutterBottom
                                            variant={matchDownSM ? 'h4' : 'h4'}
                                            align={"center"}  >
                                    User Information               </Typography></grid>

                                        <FormControl fullWidth sx={{mb:3}}  className={classes.root}>


                                                    <Avatar src={`${configData.API_SERVER}${open1.user.photo}`} className={classes.large}  />


                                        </FormControl>

                                        <Grid
                                            container
                                            spacing={3}
                                        >
                                            <Grid
                                                item
                                                md={6}
                                                xs={6}
                                            >







                                                <Grid item xs={6} >
                                                    <Typography  fullWidth
                                                                 label="First name"
                                                                 name="firstName"
                                                                 id="username"   fontSize="17px" textAlign={matchDownSM ? 'center' : ''}>
                                                        Name :
                                                    </Typography>

                                                    <Typography  fullWidth
                                                                 label="First name"
                                                                 name="firstName"
                                                                 id="username" color="black"  fontSize="18px" textAlign={matchDownSM ? 'center' : ''}>
                                                        {open1.user.username}

                                                    </Typography>
                                                </Grid>



                                            </Grid>

                                            <Grid
                                                item
                                                md={6}
                                                xs={6}
                                            >
                                                <Grid item md={6} >
                                                    <Typography  fullWidth
                                                                 label="First name"
                                                                 name="firstName"
                                                                 id="username"   fontSize="17px" textAlign={matchDownSM ? 'center' : ''}>
                                                        Phone :
                                                    </Typography>

                                                    <Typography  fullWidth
                                                                 label="First name"
                                                                 name="firstName"
                                                                 id="username" color="black"  fontSize="18px" textAlign={matchDownSM ? 'center' : ''}>
                                                        {open1.user.phone}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <Grid item xs={12} >
                                                    <Typography  fullWidth
                                                                 label="First name"
                                                                 name="firstName"
                                                                 id="username"   fontSize="17px" textAlign={matchDownSM ? 'center' : ''}>
                                                        Email :
                                                    </Typography>

                                                    <Typography  fullWidth
                                                                 label="First name"
                                                                 name="firstName"
                                                                 id="username" color="black"  fontSize="18px" textAlign={matchDownSM ? 'center' : ''}>
                                                        {open1.user.email}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                item
                                                md={12}
                                                xs={12}
                                            >
                                                <Grid item md={12} >
                                                    <Typography  fullWidth
                                                                 label="First name"
                                                                 name="firstName"
                                                                 id="username"   fontSize="17px" textAlign={matchDownSM ? 'center' : ''}>
                                                        Role :
                                                    </Typography>
                                                    <Typography  fullWidth
                                                                 label="First name"
                                                                 name="firstName"
                                                                 id="username" color="black"   fontSize="18px" textAlign={matchDownSM ? 'center' : ''}>
                                                        {open1.user.role}
                                                    </Typography>
                                                </Grid>
                                            </Grid>







                                            <Grid md={12}  container spacing={2} alignItems="center" justifyContent="center" stroke-linecap="round">
                                                <Grid item xs={12} md={12} >

                                                    <Grid
                                                        container
                                                        direction={'row'}
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <Grid item mb={2}>
                                                            <Stack alignItems="center" justifyContent="center">

                                                                <Grid container   sx={{mt:3.75 }} alignItems="center" >


                                                                    <Grid md={12} container alignItems="center" >
                                                    <AnimateButton>
                                                            <Button
                                                                onClick={handleClose}
                                                                disableElevation
                                                                fullWidth
                                                                type="submit" size="large"
                                                                variant="contained"
                                                                color="secondary">{CLOSE}</Button>



                                                    </AnimateButton>
                                                                    </Grid>
                                                                </Grid>
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
</Grid>





                        </ThemeConfig>
                    </Box>
                    </Fade>
                        </ClickAwayListener >

                </div>

            </Modal>


        </Fragment>
    )
        ;
}
export default User;
