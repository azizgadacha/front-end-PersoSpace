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
    TextField,
} from '@mui/material';
// components
import ThemeConfig from "../../../themes/theme2"


import Backdrop from '@mui/material/Backdrop';

import axios from "axios";
import configData from "../../../config";

import {useDispatch, useSelector} from "react-redux";
import {ADD_USER, CLICK, ClOSE_EDIT_MODAL, CLOSE_MODAL, LOGOUT, UPDATE, USER_UPDATE} from "../../../store/actions";


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
import {Add, Adding, Cancel, Change, Changing} from "../../Button/actionButton";
import {useHistory} from "react-router-dom";

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






const EditModalCore=  ({objet}) => {
    let location
    if(window.location.pathname.includes('html'))
        location=window.location.hash
    else
        location=window.location.pathname
    const [isloading, setIsloading] = useState(false);

    const states = [
        {
            value: 'administrateur',
            label: 'administrateur'
        },
        {
            value: 'simple employer',
            label: 'simple employer'
        },

    ];


    const classes = useStyles();
    const scriptedRef = useScriptRef();
    const dispatcher = useDispatch();

    let account = useSelector((state) => state.account);



    useEffect(() => {
        return () => {
            dispatcher({
                type:ClOSE_EDIT_MODAL,
            });
        }
    }, [])



    let open1 = useSelector((state) => state.modal);

    const handleClose=()=>{



        dispatcher({
            type:ClOSE_EDIT_MODAL,
        });
    }


    let history =useHistory()


    return (
        <Fragment>


                                <Formik
                                    initialValues={{
                                        role: objet.role,
                                    }}
                                    validationSchema={Yup.object().shape({
                                        role: Yup.string().required('role is required')
                                    })}
                                    onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {


                                        setIsloading(true)
                                        if(objet.role==values.role){
                                            setStatus({ success: false });
                                            setErrors({ submit: "you didn't change any thing" });
                                            setSubmitting(false)
                                            setIsloading(false)
                                        }
                                        else{
//la liaison entre la partie front et la partie back se fait ?? travers ce bout de code durant lequel il y'aura l'envoie des donn??es a utilis?? et le type du m??thode du contoller souhait??

                                        try {



                                            axios.post( configData.API_SERVER + 'api/User/editUser', {
                                              token:account.token,

                                                role:values.role,
                                                userID:objet._id,
                                                user_id:account.user._id
                                            })
                                                .then(function (response) {
                                                    if(response.data.notConnected){
                                                        dispatcher({ type: LOGOUT });
                                                        history.push("/login");
                                                        dispatcher({
                                                            type:CLICK,
                                                            payload: {text:"You are no longer connected",severity:"error"}
                                                        })
                                                    }
                                                    else


                                                    {

                                                    if (response.data.success) {
                                                        dispatcher({
                                                            type:USER_UPDATE,
                                                            payload: {user:response.data.user}
                                                        });

                                                        dispatcher({
                                                            type:ClOSE_EDIT_MODAL,
                                                        });
                                                        dispatcher({
                                                            type:CLICK,
                                                            payload: {text:'user modified with success',severity:"success"}
                                                        });
                                                    } else {

                                                        if(response.data.administratorProblem)
                                                        {

                                                            setStatus({ success: false });
                                                            setSubmitting(false);
                                                            setIsloading(false)
                                                            dispatcher({
                                                                type:ClOSE_EDIT_MODAL,
                                                            });
                                                            dispatcher({
                                                                type:UPDATE,
                                                                payload: {user:response.data.user}
                                                            });
                                                            history.push(configData.defaultPath)

                                                            dispatcher({
                                                                type:CLICK,
                                                                payload: {text:'you are no longer an administrateur',severity:"error"}
                                                            });

                                                        }
                                                    }
                                                }})
                                                .catch(function (error) {
                                                    setIsloading(false)
                                                    dispatcher({
                                                        type:ClOSE_EDIT_MODAL,
                                                    });
                                                    history.push(configData.defaultPath)

                                                    dispatcher({
                                                        type:CLICK,
                                                        payload: {text:'externel error please try later',severity:"error"}
                                                    });
                                                });
                                        } catch (err) {

                                                setStatus({ success: false });
                                                setSubmitting(false);
                                                setIsloading(false)
                                                dispatcher({
                                                    type:ClOSE_EDIT_MODAL,
                                                });
                                                history.push(configData.defaultPath)

                                                dispatcher({
                                                    type:CLICK,
                                                    payload: {text:'externel error please try later',severity:"error"}
                                                });

                                        }
                                    }}}
                                >
                                    {({ errors,setFieldValue, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                        <form  noValidate onSubmit={handleSubmit} >
                                                      <Grid item lg={12} md={12} mt={3} sm={12} xs={12}>

                                                                    <FormControl fullWidth   error={Boolean(touched.role&& errors.role)} >

                                                                        <TextField
                                                                            fullWidth
                                                                            onChange={handleChange}
                                                                            required
                                                                            select
                                                                            SelectProps={{ native: true }}
                                                                            variant="outlined"
                                                                            id="role"
                                                                            name="role"

                                                                            value={values.role}
                                                                            label="Role"
                                                                            onBlur={handleBlur}
                                                                            error={touched.role && Boolean(errors.role)}

                                                                            onChange={handleChange}


                                                                        >
                                                                            {states.map((option) => (
                                                                                <option
                                                                                    key={option.value}
                                                                                    value={option.value}
                                                                                >
                                                                                    {option.label}
                                                                                </option>
                                                                            ))}
                                                                        </TextField>

                                                                    </FormControl>
                                                                </Grid>
                                            <Box
                                                sx={{
                                                    mt: 2
                                                }}
                                            >
                                                {errors.submit && (
                                                    <Box
                                                        sx={{
                                                            mt:1
                                                        }}
                                                    >
                                                        <Alert severity="error">{errors.submit}</Alert>

                                                    </Box>
                                                )}


                                                <Grid container alignItems={"center"}>
                                                    <Grid xs={6}>
                                                        <Box
                                                            sx={{
                                                                mr:1,
                                                                mt: 2,

                                                            }}
                                                        >
                                                            <AnimateButton>
                                                                {isloading?(<LoadingButton variant="contained"   fullWidth size="large" loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">{Changing}</LoadingButton>):
                                                                    <Button
                                                                        disabled={isSubmitting}
                                                                        disableElevation
                                                                        fullWidth
                                                                        type="submit" size="large"
                                                                        variant="contained"
                                                                        color="secondary">{Change}</Button>}



                                                            </AnimateButton>

                                                        </Box>
                                                    </Grid>
                                                    <Grid xs={6}>

                                                        <Box
                                                            sx={{
                                                                mt: 2,
                                                                marginLeft:1
                                                            }}
                                                        >
                                                            <AnimateButton>

                                                                <Button disableElevation  disabled={isSubmitting} size="large"  onClick={handleClose} fullWidth variant="contained" color="error">{Cancel}</Button>
                                                            </AnimateButton>

                                                        </Box>
                                                    </Grid>

                                                </Grid>

                                            </Box>

                                        </form>
                                    )}
                                </Formik>



        </Fragment>
    )
        ;
}
export default EditModalCore;

