import { filter } from 'lodash';
import React, {Fragment, useEffect, useState} from 'react';
// material
import Fade from '@mui/material/Fade';

import {
    Stack,
    Container,
    Typography,
    Box,
    Card,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,
    Avatar,
    Button,
    TablePagination,
    Modal,
    TextField,
} from '@mui/material';
// components
import ThemeConfig from "../../../themes/theme2"


import Backdrop from '@mui/material/Backdrop';

import axios from "axios";
import configData from "../../../config";

import {useDispatch, useSelector} from "react-redux";
import {ADD_USER, CLICK, CLOSE_DELETE_MODAL, CLOSE_MODAL, INISIALIZE_USER,} from "../../../store/actions";

import { useHistory} from "react-router-dom";

import {Formik} from "formik";
import * as Yup from "yup";
import config from "../../../config";
import {
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, useMediaQuery, useTheme
} from "@material-ui/core";
import {gridSpacing} from "../../../store/constant";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {Alert, LoadingButton} from "@material-ui/lab";
import AnimateButton from "../../../animation/AnimateButton";
import useScriptRef from "../../../hooks/useScriptRef";
import {strengthColor, strengthIndicator} from "../../../verification_password/password-strength";
import {makeStyles} from "@material-ui/styles";
import SaveIcon from "@mui/icons-material/Save";

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
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({


    modal:{
        position: 'absolute',
        top: '50%',
        left: '50%',

        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,



    },


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
    },
    input: {
        display: "none",


    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },


}));






const EditUser=  (props) => {
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










    const [open5, setOpen5] = React.useState(false);



    const dispatcher = useDispatch();

    let account = useSelector((state) => state.account);



    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_MODAL,
            });
        }
    }, [])



    let open1 = useSelector((state) => state.modal);

    const handleClose=()=>{
        dispatcher({
            type:CLOSE_MODAL,
        });
    }




    return (
        <Fragment>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"

                open={open1.ModalState}
                onClose={handleClose}

                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <div style={OVERLAY_Styles}>

                    <Fade in={open1.ModalState}>

                        <Box sx={{ ...style,  }} className={classes.modal}>
                            <ThemeConfig>

                                <Formik
                                    initialValues={{

                                        role: 'administrateur',
                                        phone: '',

                                        submit: null
                                    }}
                                    validationSchema={Yup.object().shape({
                                        email: Yup.string().email('Must be a valid email').max(100,"must contain only 100 digits").required('Email is required'),
                                        username: Yup.string().required('Username is required'),
                                        phone: Yup.number().typeError("Must be a number").required('phone is required').integer("Must be a valid number").positive(),

                                        role: Yup.string().required('role is required')

                                    })}
                                    onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                                        setIsloading(true)
                                        try {



                                            let fd = new FormData();

                                            fd.append('username',values.username)
                                            fd.append('email',values.email)
                                            fd.append('phone',values.phone)
                                            fd.append('file',values.file)
                                            fd.append('role',values.role)
                                            fd.append('token',account.token)
                                            fd.append('sendtphoto',values.sendtphoto)


                                            axios.post( configData.API_SERVER + 'api/users/register', fd,{ headers: {
                                                    "Content-Type": "multipart/form-data"
                                                }})
                                                .then(function (response) {

                                                    console.log(response.data)
                                                    if (response.data.success) {
                                                        console.log("hani lena")
                                                        console.log(response.data.user)

                                                        dispatcher({
                                                            type:ADD_USER,
                                                            payload: {user:response.data.user}
                                                        });
                                                        console.log("hani lena 200")
                                                        setIsloading(false)
                                                        dispatcher({
                                                            type:CLOSE_MODAL,
                                                        });
                                                        dispatcher({
                                                            type:CLICK,
                                                            payload: {text:"User added successfully",severity:"success"}
                                                        });

                                                    } else {
                                                        setStatus({ success: false });
                                                        setErrors({ submit: response.data.msg });
                                                        setSubmitting(false);
                                                        setIsloading(false)

                                                    }
                                                })
                                                .catch(function (error) {
                                                    setStatus({ success: false });
                                                    setErrors({ submit: error.response.data.msg });
                                                    setSubmitting(false);
                                                    setIsloading(false)

                                                });
                                        } catch (err) {
                                            console.error(err);
                                            if (scriptedRef.current) {
                                                setStatus({ success: false });
                                                setErrors({ submit: err.message });
                                                setSubmitting(false);
                                                setIsloading(false)

                                            }
                                        }
                                    }}
                                >
                                    {({ errors,setFieldValue, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                        <form  noValidate onSubmit={handleSubmit} >









                                                                <Grid item lg={6} md={6} sm={6} xs={12}>

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










                                            {strength !== 0 && (
                                                <FormControl fullWidth>
                                                    <Box
                                                        sx={{
                                                            mb: 2
                                                        }}
                                                    >

                                                    </Box>
                                                </FormControl>
                                            )}





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

                                                    <Box
                                                        sx={{
                                                            mt: 2,
                                                            marginRight:2,
                                                            marginLeft:4
                                                        }}
                                                    >
                                                        <AnimateButton>
                                                            {isloading?(<LoadingButton variant="contained" sx={{width:220}}  size="large" loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">Adding</LoadingButton>): <Button sx={{width:220}} disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" size="large"  variant="contained" color="secondary">Add User</Button>}



                                                        </AnimateButton>

                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            mt: 2,
                                                            marginLeft:1
                                                        }}
                                                    >
                                                        <AnimateButton>

                                                            <Button disableElevation sx={{width:220}} size="large" onClick={handleClose} variant="contained" color="error">Cancel</Button>
                                                        </AnimateButton>

                                                    </Box>

                                                </Grid>

                                            </Box>

                                        </form>
                                    )}
                                </Formik>
                            </ThemeConfig>
                        </Box>
                    </Fade>

                </div>

            </Modal>


        </Fragment>
    )
        ;
}
export default EditUser;
