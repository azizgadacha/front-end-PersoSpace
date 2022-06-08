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
import {ADD_USER, CLICK, CLOSE_MODAL, LOGOUT, UPDATE} from "../../../store/actions";


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
import {Add, Adding, Cancel} from "../../Button/actionButton";
import {useHistory} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
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


// ----------------------------------------------------------------------






const useStyles = makeStyles((theme) => ({
    largeImage: {

        width: theme.spacing(20),
        height: theme.spacing(20),
        top: "50%",
        left: "50%",
        right: "50%",
        bottom: "50%",
        transform: 'translate(-2%,2%)',
        borderRadius : "50%",
        overflow: "hidden",
        border: "1px solid grey",
    },

    uploadBtn:{
        height: '0%',
        width: '100%',
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        color: 'wheat',
        lineHeight : '160px',
        fontFamily: 'sans-serif',
        fontSize: '16px',
        cursor: "pointer",
        backgroundColor: "#000000",
        opacity: '0.8',

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
    const theme = useTheme();

    const  minWidth='330px'

    const style = {

        padding:'50px',
        zIndex:100,
minWidth,
        borderRadius: 5,
maxHeight:"90%",

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










//our selectors

    let account = useSelector((state) => state.account);
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
    let [source, setSource] = React.useState("/static/images/avatar_1.png");

    const handleCapture = ({target}) => {
        const fileReader = new FileReader();
        // const name = target.accept.includes('image') ? 'images' : 'videos';

        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            setSource(e.target.result);
        };
    };

    const classes = useStyles();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    let socket = useSelector((state) => state.socket);






    let history =useHistory()









    const dispatcher = useDispatch();




    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_MODAL,
            });
        }
    }, [])



    let open1 = useSelector((state) => state.modal);

    const handleClose=()=>{



        setSource("/static/images/avatar_1.png")
        dispatcher({
            type:CLOSE_MODAL,
        });
    }
let location=null
    if(window.location.pathname.includes('html'))
        location=window.location.hash
    else
        location=window.location.pathname



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
                    <ClickAwayListener onClickAway={handleClose}>

                    <Fade in={open1.ModalState}>

                    <Box sx={{ ...style,  }}>
                        <IconButton sx={{float:'right'}}               aria-label="close">
                            <CloseIcon onClick={handleClose}  color="disabled"      />
                        </IconButton>
                        <ThemeConfig>

                            <Formik
                                initialValues={{
                                    username: '',
                                    email: '',
                                    role: 'administrateur',
                                    phone: '',

                                    submit: null
                                }}
                                validationSchema={Yup.object().shape({
                                    email: Yup.string().email('Must be a valid email').max(100,"must contain only 100 digits").required('Email is required'),
                                    username: Yup.string().required('Username is required'),
                                   phone:Yup.string().required().matches(/^[0-9]+$/, "Must be only digits").min(8, 'Must be exactly 8 digits').max(8, 'Must be exactly 8 digits'),
                                    role: Yup.string().required('role is required')

                                })}
                                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
setIsloading(true)
                                    try {



                                        let fd = new FormData();

                                        fd.append('username',values.username)
                                        fd.append('email',values.email)
                                        fd.append('phone',parseInt(values.phone))
                                        fd.append('file',values.file)
                                        fd.append('role',values.role)
                                        fd.append('token',account.token)
                                        fd.append('user_id',account.user._id)
                                        fd.append('sendtphoto',values.sendtphoto)

//la liaison entre la partie front et la partie back se fait à travers ce bout de code durant lequel il y'aura l'envoie des données a utilisé et le type du méthode du contoller souhaité

                                        axios.post( configData.API_SERVER + 'api/User/register', fd,{ headers: {
                                                "Content-Type": "multipart/form-data"
                                            }})
                                            .then(function (response) {
                                                if(response.data.notConnected){
                                                    dispatcher({ type: LOGOUT });
                                                    history.push("/login");
                                                    dispatcher({
                                                        type:CLICK,
                                                        payload: {text:"You are no longer connected",severity:"error"}
                                                    })
                                                }
                                                else if(response.data.administratorProblem){
                                                    dispatcher({
                                                        type:UPDATE,
                                                        payload: {user:response.data.user}
                                                    });

                                                        history.push(configData.defaultPath)
                                                    dispatcher({
                                                        type:CLICK,
                                                        payload: {text:"you are no longer an administrateur",severity:"error"}
                                                    })

                                                }else
                                                {
                                                if (response.data.success) {

                                                    dispatcher({
                                                        type:ADD_USER,
                                                        payload: {user:response.data.user}
                                                    });
                                                    setIsloading(false)
                                                    dispatcher({
                                                        type:CLOSE_MODAL,
                                                    });
                                                    setSource("/static/images/avatar_1.png")


                                                    dispatcher({
                                                        type:CLICK,
                                                        payload: {text:"User added successfully",severity:"success"}
                                                    });
                                                    console.log("eeeeeezrezrrzrr")

                                                    console.log(response.data.NotificationListe)
                                                    socket.socket.emit("send_Notification",{NotificationListe:response.data.NotificationListe,})

                                                   // NotificationListe
                                                } else {
                                                    setStatus({ success: false });
                                                    setErrors({ submit: response.data.msg });
                                                    setSubmitting(false);
                                                    setIsloading(false)

                                                }
                                            }})
                                            .catch(function (error) {
                                                setStatus({ success: false });
                                                setErrors({ submit: error.response.data.msg });
                                                setSubmitting(false);
                                                setIsloading(false)

                                            });
                                    } catch (err) {
                                        if (scriptedRef.current) {
                                            setStatus({ success: false });
                                            setErrors({ submit: err.message });
                                            setSubmitting(false);
                                            setIsloading(false)

                                        }
                                    }
                                }}
                            >
                                {({ errors,setFieldValue,setStatus,setSubmitting,setErrors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                    <form  noValidate onSubmit={handleSubmit} >



    <Stack alignItems="center" justifyContent="center" spacing={1}>
        <Stack alignItems="center" justifyContent="center" spacing={1}>
    <Typography
        color={theme.palette.secondary.main}
        gutterBottom
        variant={matchDownSM ? 'h3' : 'h3'}
    >
        Add User
    </Typography>


</Stack>
    </Stack>






                                        <Grid marginBottom={1} >

                                        <FormControl fullWidth  className={classes.root}>

                                            <div className={classes.largeImage} id="divStyle">
                                                <img src={source} id="photo" />
                                                <input type="file" id="file"  accept="image/*"
                                                       onChange={(event)=>{
                                                           if((((event.target.files[0].name).toLowerCase()).endsWith(".png"))||(((event.target.files[0].name).toLowerCase()).endsWith(".jpg"))||(((event.target.files[0].name).toLowerCase()).endsWith(".jpeg"))) {

                                                               handleCapture(event);
                                                               handleChange(event)

                                                               setFieldValue("file", event.target.files[0])
                                                               setFieldValue("sendtphoto", true)
                                                           }
                                                       else{
                                                               setStatus({ success: false });
                                                               setErrors({ submit: "You should enter PNG or JPG photo " });
                                                               setSubmitting(false);
                                                               setIsloading(false)

                                                           }
                                                       }}

                                                      id="file" type="file"/>
                                                <label htmlFor="file" className={classes.uploadBtn}  id="labelStyle">Choose Photo</label>
                                            </div>







                                        </FormControl>
                                        </Grid>


                                        <Stack spacing={2} id="transition-modal-title">
                                            <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={12}>

                                                <Grid container spacing={2}>
                                                    <Grid item  xs={12} >
                                                        <Grid container spacing={gridSpacing} >
                                                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                <FormControl  fullWidth error={Boolean(touched.username && errors.username)}>
                                                                    <TextField label="username" required variant="outlined"
                                                                               id="outlined-adornment-username-register"
                                                                               name="username"
                                                                               value={values.username}
                                                                               onBlur={handleBlur}
                                                                               onChange={handleChange}

                                                                    />

                                                                    {touched.username && errors.username && (
                                                                        <FormHelperText error id="standard-weight-helper-text--username">
                                                                            {errors.username}
                                                                        </FormHelperText>
                                                                    )}



                                                                </FormControl>
                                                            </Grid>
                                                            <Grid item lg={6} md={6} sm={6} xs={12}>

                                                                <FormControl fullWidth error={Boolean(touched.email && errors.email)} >
                                                                    <TextField label="Email" required variant="outlined"
                                                                               id="outlined-adornment-email-register"
                                                                               type="email"
                                                                               value={values.email}
                                                                               name="email"
                                                                               onBlur={handleBlur}
                                                                               onChange={handleChange}

                                                                    />
                                                                    {touched.email && errors.email && (
                                                                        <FormHelperText error id="standard-weight-helper-text--register">

                                                                            {errors.email}
                                                                        </FormHelperText>
                                                                    )}
                                                                </FormControl>
                                                            </Grid>


                                                        </Grid>
                                                    </Grid>

                                                </Grid>




                                            </Stack>

                                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>


                                                <Grid container spacing={3}>
                                                    <Grid item  xs={12} >
                                                        <Grid container spacing={gridSpacing} >
                                                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                                                                    <TextField label="phone" required variant="outlined"
                                                                               id="outlined-adornment-phone-register"
                                                                               type="phone"
                                                                               value={values.phone}
                                                                               name="phone"
                                                                               onBlur={handleBlur}
                                                                               onChange={handleChange}

                                                                    />
                                                                    {touched.phone && errors.phone && (
                                                                        <FormHelperText error id="standard-weight-helper-text--register">
                                                                            {' '}
                                                                            {errors.phone}{' '}
                                                                        </FormHelperText>
                                                                    )}
                                                                </FormControl>
                                                            </Grid>
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


                                                        </Grid>
                                                    </Grid>

                                                </Grid>

                                            </Stack>


                                        </Stack>












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
                                                        {isloading?(<LoadingButton variant="contained"   fullWidth size="large" loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">{Adding}</LoadingButton>):
                                                            <Button
                                                                disabled={isSubmitting}
                                                                disableElevation
                                                                fullWidth
                                                                type="submit" size="large"
                                                                variant="contained"
                                                                color="secondary">{Add}</Button>}



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
