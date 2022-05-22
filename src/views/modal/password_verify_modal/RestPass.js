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

import Iconify from "../../ViewAll/import/customer/Iconify";


import {useDispatch, useSelector} from "react-redux";

import {

    CLICK,

    CLOSE_MODAL, LOGOUT,

    UPDATE,

} from "../../../store/actions";
import { LoadingButton} from "@material-ui/lab";
import {Divider, Grid, TextField} from "@mui/material";
import {Formik} from "formik";
import * as Yup from "yup";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {useHistory} from "react-router-dom";
import useScriptRef from "../../../hooks/useScriptRef";
import {strengthColor, strengthIndicator} from "../../../verification_password/password-strength";
import {Cancel, Edit, Editing} from "../../Button/actionButton";

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


    const handleClose=()=>{
        dispatcher({
                       type:CLOSE_MODAL,
                   });
    }
    let account = useSelector((state) => state.account);

    const classes = useStyles();
    let history = useHistory();
    const scriptedRef = useScriptRef();
    const [showPassword, setShowPassword] = React.useState(false);



    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };





    function handleShowPassword () {

                setShowPassword((show) => !show);


            }

    const [isloading, setIsloading] = useState(false);
    const dispatcher = useDispatch();

    return (
        <React.Fragment>

            <Formik
                initialValues={{

                    password: '',

                }}
                validationSchema={Yup.object().shape({

                    password: Yup.string().max(100,"must contain only 100 digits").required('Password is required'),

                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {

                    setIsloading(true)
                    let data
                    if((props.file)===(`${configData.API_SERVER}${account.user.photo}`)){
                     data={
                               id:account.user._id,
                               password: values.password,
                               email: props.user.email,
                               username:props.user.username,
                               role:props.user.role,
                         sendPhoto:false,
                               phone:props.user.phone,
                               token:account.token
}}else{



                         data = new FormData();

                        data.append('id',account.user._id)
                        data.append('password',values.password)
                        data.append('email',props.user.email)
                        data.append('phone',props.user.phone)
                        data.append('file',props.file)
                        data.append('role',props.user.role)
                        data.append('token',account.token)
                        data.append('sendPhoto',true)

                    }



                    try{


                        axios.post( configData.API_SERVER + 'api/users/edit', data)
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
                                        type:UPDATE,
                                        payload: {user:response.data.user}
                                    });

                                    dispatcher({
                                        type:CLICK,
                                        payload: {text:"information changed successfully",severity:"success"}
                                    });
                                    setIsloading(false)
                                    history.push("/Profile")

                                } else {

                                    if(response.data.passprob) {

                                        setVerifPass(true)


                                        setStatus({ success: false });
                                        setSubmitting(false);
                                        setIsloading(false)
                                    }

                                        else {

                                    setStatus({ success: false });
                                    setErrors({ submit: response.data.msg });
                                    setSubmitting(false);
                                        setIsloading(false)
                                        history.push("/Profile")
                                        dispatcher({
                                            type:CLICK,
                                            payload: {text:"intern probleme please retry later",severity:"error"}
                                        });

                                    }}
                            }})
                            .catch(function (error) {

                                setStatus({ success: false });
                                setErrors({ submit: error.response.data.msg });
                                setIsloading(false)
                                history.push("/Profile")
                                dispatcher({
                                    type:CLICK,
                                    payload: {text:"intern probleme please retry later",severity:"error"}
                                });
                            });
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {

                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                            setIsloading(false)
                            history.push("/Profile")
                            dispatcher({
                                type:CLICK,
                                payload: {text:"intern probleme please retry later",severity:"error"}
                            });
                        }
                    }
                }}
            >
                {({ errors,setFieldValue, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (

                    <form  noValidate onSubmit={handleSubmit}  {...others} >

                        {/*

                        <Grid container spacing={2} alignItems="center" justifyContent="center" stroke-linecap="round">
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction={matchDownSM ? 'column-reverse' : 'row'}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item>
                                        <Grid alignItems="center" justifyContent="center" >

                                            <Typography
                                                color={theme.palette.secondary.main}
                                                gutterBottom
                                                variant={matchDownSM ? 'h3' : 'h3'}
                                            >
                                                Password verification
                                            </Typography>
                                            <Divider />
                                            <Grid container alignItems={"center"}>

                                                <Typography variant="caption" fontSize="16px" textAlign= 'center' >
                                                    To verify your identities please enter your password
                                                </Typography>
                                            </Grid>


                                        </Grid>

                                    </Grid>

                                </Grid>

                            </Grid>
                        </Grid>





*/}







                                                           <Grid container alignItems={"center"}>

                        <Grid item xl={12} lg={12} md={12} xs={12}>
                            <Grid container alignItems={"center"}>

                            <FormControl fullWidth error={Boolean( touched.password && errors.password  )} >



                                    <TextField
                                        fullWidth={false}
                                        name="password"
                                        value={values.password}
                                        sx={{display:'flex',textAlign: 'center',min: 0, style: { textAlign: 'center' }}}                                       onBlur={handleBlur}
                                        id="outlined-adornment-password-register"
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        label="Password"

                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={(e)=>{handleShowPassword(0)}} edge="end">
                                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}

                                    />







                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-register">
                                            {errors.password}
                                        </FormHelperText>

                                    )}
                                    { !(errors.password) && verifPass && (
                                        <FormHelperText error id="standard-weight-helper-text-password-register">
                                            please verify your password
                                        </FormHelperText>

                                    )}

                                </FormControl>

                            </Grid>
                        </Grid>





                            </Grid>




                        <Box mt={2}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',

                            }}
                        >
                            <Box
                                sx={{
                                    mt: 2,
                                    mr:3
                                }}
                            >

                            <AnimateButton>

                                {isloading?(<LoadingButton fullWidth   sx={{width:100}} variant="contained" size="large" loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">{Editing}</LoadingButton>):    <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    sx={{width:100}}

                                >
                                    {Edit}

                                </Button>}




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
                                    {Cancel}

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
