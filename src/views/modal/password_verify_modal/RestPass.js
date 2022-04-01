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
    DELETE_USER, UPDATE,
    USER_DELETE
} from "../../../store/actions";
import {Alert, LoadingButton} from "@material-ui/lab";
import {Avatar, Divider, Grid, Stack} from "@mui/material";
import {Formik} from "formik";
import * as Yup from "yup";
import config from "../../../config";
import {gridSpacing} from "../../../store/constant";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {useHistory} from "react-router-dom";
import useScriptRef from "../../../hooks/useScriptRef";
import {strengthColor, strengthIndicator} from "../../../verification_password/password-strength";
import {Cancel, Edit} from "../../Button/actionButton";

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
    const theme = useTheme();

    const classes = useStyles();
    let history = useHistory();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [showPassword, setShowPassword] = React.useState(false);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };


    useEffect(() => {
        changePassword('123456');
    }, []);



    const [isloading, setIsloading] = useState(false);
    //const [openModal,setOpenModal]=useState(false);
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


                    try{
                        axios.post( configData.API_SERVER + 'api/users/edit', {
                            userID:account.user._id,
                            password: values.password,
                            email: props.user.email,
                            username:props.user.username,
                            role:props.user.role,
                            phone:props.user.phone,
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
                }}
            >
                {({ errors,setFieldValue, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (

                    <form  noValidate onSubmit={handleSubmit}  {...others} >

                        <Box marginLeft={7}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                p: 2,
                            }}
                        >
                            <Grid item md={11} xs={12}>
                            <FormControl fullWidth error={Boolean( touched.password && errors.password  )} >
                                <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password-register"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    name="password" margin="2"
                                    label="Password"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        setVerifPass(false)
                                        handleChange(e);
                                        changePassword(e.target.value);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </            InputAdornment>
                                    }
                                     inputProps={{
                                        classes: {
                                            notchedOutline: classes.notchedOutline
                                        }
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

                            </Box>



                        <Box marginLeft={11}
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
                                    {Edit}

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
