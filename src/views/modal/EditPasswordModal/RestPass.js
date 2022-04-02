import React, {useEffect, useState} from 'react';


import configData from '../../../config';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Typography, useMediaQuery, useTheme,


} from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';


import axios from 'axios';

// project imports

//use ref ta3mil ref  lil objet   min il react

import AnimateButton from '../../../animation/AnimateButton';



import {useDispatch, useSelector} from "react-redux";

import {
    ADD_USER,
    CLICK,
    CLOSE_DELETE_MODAL,
    CLOSE_MODAL,
    DELETE,
    DELETE_USER, OPEN_MODAL, UPDATE,
    USER_DELETE
} from "../../../store/actions";
import {Alert, LoadingButton} from "@material-ui/lab";
import {Avatar, Divider, Grid, Stack, TextField} from "@mui/material";
import {Formik} from "formik";
import * as Yup from "yup";
import config from "../../../config";
import {gridSpacing} from "../../../store/constant";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {useHistory} from "react-router-dom";
import useScriptRef from "../../../hooks/useScriptRef";
import {strengthColor, strengthIndicator} from "../../../verification_password/password-strength";
import Iconify from "../../ViewAll/import/customer/Iconify";

// style constant
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
    }
}));

//===========================|| API JWT - REGISTER ||===========================//

const RestPass = (props, { ...others }) => {
    const [verifPass, setVerifPass] = useState(false);

    const [confirm, setConfirm] = useState(false);

    const handleClose=()=>{
        dispatcher({
            type:CLOSE_MODAL,
        });
    }
    let account = useSelector((state) => state.account);
    const theme = useTheme();

    const classes = useStyles();
    let history = useHistory();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [showPassword0, setShowPassword0] = React.useState(false);
    const [showPassword1, setShowPassword1] = React.useState(false);
    const [showPassword2, setShowPassword2] = React.useState(false);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');






    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };


    useEffect(() => {
        changePassword('123456');
    }, []);
    function handleShowPassword (num) {
        console.log("salem sahbi")
        console.log(num)
        switch (num) {
            case 0: {
                console.log("fil0")
                setShowPassword0((show) => !show);
                break;

            }
                case 1: {
                    console.log("fil1")

                    setShowPassword1((show1) => !show1);
                    break;

                }
                    case 2: {
                        console.log("fil2")

                        setShowPassword2((show2) => !show2);
                        break;

                    }
                        default: {
                            setShowPassword0((show) => !show);
                            break;

                        }        }
    };


    const [isloading, setIsloading] = useState(false);
    //const [openModal,setOpenModal]=useState(false);
    const dispatcher = useDispatch();

    return (
        <React.Fragment>
            <Divider />
            <Divider />

            <Formik
                initialValues={{

                    old:'',
                    new:'',
                    confirm:'',

                }}
                validationSchema={Yup.object().shape({

                    old: Yup.string().max(100,"must contain only 100 digits").min(6,"old password must contain more then 6 digits"). required('old password is required'),
                    new : Yup.string().max(100,"must contain only 100 digits").min(6,"new password must contain more then 6 digits"). required('new password is required'),
                    confirm : Yup.string().max(100,"must contain only 100 digits").min(6,"confirm password must contain more then 6 digits"). required('confirm password is required'),

                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {


                    if (values.new!=values.confirm){
                        setConfirm(true)
                        setStatus({ success: false });
                        setSubmitting(false);
                    }else{


                        try{
                            axios.post( configData.API_SERVER + 'api/users/editPass', {
                                userID:account.user._id,
                                newPassword: values.new,
                                oldPassword: values.old,

                                token:account.token
                            })
                                .then(function (response) {

                                    console.log(response.data)
                                    if (response.data.success) {



                                        console.log("hani lena 200")
                                        console.log(response.data.user)

                                        dispatcher({
                                            type:UPDATE,
                                            payload: {user:response.data.user}
                                        });
                                        console.log("fdfsf")
                                        console.log(account.user)
                                        dispatcher({
                                            type:CLICK,
                                            payload: {text:"information changed successfully",severity:"success"}
                                        });
                                        history.push("/Profile")

                                    } else {

                                        if(response.data.passprob) {
                                            console.log("455hanui")

                                            console.log(verifPass)
                                            console.log("i wana try")

                                            setVerifPass(true)
                                            console.log("i wana try2.0")
                                            console.log(verifPass)


                                            console.log("hanui")
                                            console.log(verifPass)
                                            setStatus({ success: false });
                                            setSubmitting(false);

                                        }

                                        else {
                                            console.log("loj")

                                            setStatus({ success: false });
                                            setErrors({ submit: response.data.msg });
                                            setSubmitting(false);
                                            history.push("/Profile")
                                            dispatcher({
                                                type:CLICK,
                                                payload: {text:"intern probleme please retry later",severity:"error"}
                                            });

                                        }}
                                })
                                .catch(function (error) {
                                    console.log("loj2")

                                    setStatus({ success: false });
                                    setErrors({ submit: error.response.data.msg });
                                    history.push("/Profile")
                                    dispatcher({
                                        type:CLICK,
                                        payload: {text:"intern probleme please retry later",severity:"error"}
                                    });
                                });
                        } catch (err) {
                            console.error(err);
                            if (scriptedRef.current) {
                                console.log("loj3")

                                setStatus({ success: false });
                                setErrors({ submit: err.message });
                                setSubmitting(false);
                                history.push("/Profile")
                                dispatcher({
                                    type:CLICK,
                                    payload: {text:"intern probleme please retry later",severity:"error"}
                                });
                            }
                        }


                    }}}
            >
                {({ errors,setFieldValue, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form  noValidate onSubmit={handleSubmit}  {...others} >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mb:2,
                                mt:2,
                                ml:2
                            }}
                        >
                            <Grid item md={12} xs={12}>
                                <FormControl fullWidth error={Boolean(touched.old && errors.old)} >

                                    <TextField
                                        name="old"
                                        value={values.old}

                                        onBlur={handleBlur}
                                        id="outlined-adornment-password-old"
                                        required
                                        type={showPassword0 ? 'text' : 'password'}
                                        label="Password"
                                        onChange={(e) => {
                                            setVerifPass(false)
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={(e)=>{handleShowPassword(0)}} edge="end">
                                                        <Iconify icon={showPassword0 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}

                                    />







                                    {touched.old && errors.old && (
                                        <FormHelperText error id="standard-weight-helper-text-password-register">
                                            {errors.old}
                                        </FormHelperText>

                                    )}
                                    {! (errors.old) &&verifPass&& (
                                        <FormHelperText error id="standard-weight-helper-text-password-register">
                                            wrong password
                                        </FormHelperText>

                                    )}

                                </FormControl>






                            </Grid>

                        </Box >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mb:2,
                                ml:2


                            }}
                        >
                            <Grid item md={12} xs={12}>
                                <FormControl fullWidth error={Boolean(touched.new && errors.new)} >

                                    <TextField
                                        name="new"
                                        id="outlined-adornment-password-new"
                                        required
                                        value={values.new}

                                        onBlur={handleBlur}
                                        type={showPassword1 ? 'text' : 'password'}
                                        label="New password"
                                        onChange={(e) => {
                                            setConfirm(false)
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={(e)=>{handleShowPassword(1)}} edge="end">
                                                        <Iconify icon={showPassword1 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}

                                    />







                                    {touched.new && errors.new && (
                                        <FormHelperText error id="standard-weight-helper-text-password-register">
                                            {errors.new}
                                        </FormHelperText>

                                    )}

                                </FormControl>

                            </Grid>

                        </Box >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mb:2,
                                ml:2

                            }}
                        >
                            <Grid item md={12} xs={12}>
                                <FormControl fullWidth error={Boolean(touched.confirm && errors.confirm)} >

                                    <TextField
                                        name="confirm"
                                        id="outlined-adornment-password-confirm"
                                        required
                                        value={values.confirm}

                                        onBlur={handleBlur}
                                        type={showPassword2 ? 'text' : 'password'}
                                        label="Confirm password"
                                        onChange={(e) => {
                                            setConfirm(false)
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={(e)=>{handleShowPassword(2)}} edge="end">
                                                        <Iconify icon={showPassword2 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}

                                    />







                                    {touched.confirm && errors.confirm && (
                                        <FormHelperText error id="standard-weight-helper-text-password-register">
                                            {errors.confirm}
                                        </FormHelperText>

                                    )}
                                    { !(errors.new) && confirm && (
                                        <FormHelperText error id="standard-weight-helper-text-password-register">
                                            confirm and new password should be the same
                                        </FormHelperText>

                                    )}
                                </FormControl>

                            </Grid>

                        </Box >



                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                ml:3
                            }}
                        >
                            <Box
                                sx={{
                                    mt: 2,
                                    mr:3
                                }}
                            >
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        sx={{width:100}}

                                    >
                                        Edit
                                    </Button>
                                </AnimateButton>
                            </Box>

                            <Box
                                sx={{
                                    mt: 2
                                }}
                            >

                                <AnimateButton>
                                    <Button

                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"

                                        onClick={handleClose}
                                        variant="contained"
                                        color="error"
                                    >
                                        Cancel
                                    </Button>
                                </AnimateButton>
                            </Box>
                        </Box>
                    </form>
                )}
            </Formik>

        </React.Fragment>
    );
};

export default RestPass;
