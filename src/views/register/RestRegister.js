import React, {useEffect, useRef, useState} from 'react';
import {  useHistory } from 'react-router-dom';
import config from './../../config';
import configData from '../../config';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    FormControl,

    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel, MenuItem,
    OutlinedInput, Select,
    TextField,
    Typography,
    useMediaQuery
} from '@material-ui/core';

// validation des champs
import * as Yup from 'yup';
//pour lea gestion du formulaire
import { Formik } from 'formik';
//api pou le contact avec le back-end
import axios from 'axios';

// project imports

//use ref ta3mil ref  lil objet   min il react
import useScriptRef from '../../hooks/useScriptRef';
import AnimateButton from './../../animation/AnimateButton';
import { strengthColor, strengthIndicator } from '../../verification_password/password-strength';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {Alert} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import {CLICK} from "../../store/actions";
import ThemeConfig from "../../themes/theme2";
import {Avatar, Paper, Stack} from "@mui/material";
import {FileUpload} from "@material-ui/icons";

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
const useStyl = makeStyles((theme) => ({
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
//===========================|| API JWT - REGISTER ||===========================//

const RestRegister = ({ ...others }) => {
    const [source, setSource] = React.useState("/static/images/avatar_1.jpg");

    const [images, setImages] = React.useState([]);

    const handleCapture = ({target}) => {
        const fileReader = new FileReader();
       // const name = target.accept.includes('image') ? 'images' : 'videos';
console.log(target.files[0])

        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            setSource(e.target.result);
        };
    };

    let account = useSelector((state) => state.account);
    const classes1 = useStyl();

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

    const dispatcher = useDispatch();
    {/* const getInitialState = function () {
        return {
            previewOpen: false,
            img: null,
            savedImg: "http://www.placekitten.com/400/400"
        };
    }
    const handleFileChange = function (dataURI) {
        this.setState({
            img: dataURI,
            savedImg: this.state.savedImg,
        });
    }
    const handleSave = function (dataURI) {
        this.setState({
            previewOpen: false,
            img: null,
            savedImg: dataURI
        });
    }
    const handleRequestHide = function () {
        this.setState({
            previewOpen: false
        });
    }
*/}


    return (
        <React.Fragment>
            <ThemeConfig>

            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    role: '',
                    phone: '',
                    file:null,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(100,"must contain only 100 digits").required('Email is required'),
                    username: Yup.string().required('Username is required'),
                    password: Yup.string().max(100,"must contain only 100 digits").required('Password is required'),
                    phone: Yup.number().typeError("Must be a number").required('phone number is required').integer("Must be a valid number").positive(),

                    role: Yup.string().required('role is required')

                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {

                    try {
                        console.log(values.file)

                        axios

                            .post( configData.API_SERVER + 'users/register', {
                                username: values.username,
                                password: values.password,
                                email: values.email,
                                phone: values.phone,
                                photo: values.file,
                                role:values.role,
                                token:account.token
                            })
                            .then(function (response) {
                                if (response.data.success) {

                                    history.push( config.defaultPath);
                                    dispatcher({
                                        type:CLICK,
                                        payload: {text:"User added successfully",severity:"success"}
                                    });
                                } else {
                                    setStatus({ success: false });
                                    setErrors({ submit: response.data.msg });
                                    setSubmitting(false);
                                }
                            })
                            .catch(function (error) {
                                setStatus({ success: false });
                                setErrors({ submit: error.response.data.msg });
                                setSubmitting(false);
                            });
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors,setFieldValue, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form  noValidate onSubmit={handleSubmit} {...others}>





    {/* <div>
        <div className="avatar-photo">
            <FileUpload handleFileChange={this.handleFileChange} />
            <Button color="primary">Pick an Image</Button>
            <img src={this.state.savedImg} />
        </div>
        {this.state.previewOpen &&
            <AvatarPicker
                onRequestHide={handleRequestHide}
                previewOpen={this.state.previewOpen}
                onSave={handleSave}
                image={this.state.img}
                width={400}
                height={400}
            />
        }  }
    </div>

    <Button
        variant="contained"
        component="label"
    >
        Upload File
        <input
            type="file"
            hidden
        />
    </Button>
    <Typography>hell</Typography>
    {/*  <Box alignItems='center' display='flex' justifyContent='center' flexDirection='column'>
        <Box>
            <input accept="image/*" id="upload-company-logo" type='file' hidden />
            <label htmlFor="upload-company-logo">
                <Button component="span" >
                    <Paper elevation={6}>
                        <Avatar src="https://www.w3schools.com/howto/img_avatar.png" variant='rounded' />
                    </Paper>
                </Button>
            </label>
        </Box>
    </Box>
*/}

    <FormControl fullWidth  className={classes1.root}>

        <input
                             name="file" accept="image/*"
               onBlur={handleBlur}

               onChange={(event)=>{
            handleCapture(event);
                   handleChange(event)

                   setFieldValue("file",event.target.files[0])
                   console.log("rani   mchina mchina mchil=na")

        }}

               className={classes1.input} id="file" type="file"
        />
        <label htmlFor="file">
            <IconButton color="primary" aria-label="upload picture" component="span">
                <Avatar src={source} className={classes1.large} />
            </IconButton>
        </label>
    </FormControl>


    {/*
    <Button
        variant="contained"
        component="label"
    >
        Upload File
        <input
            type="file"
            hidden
        />
    </Button>
    <input
        accept="image/*"
        className={classes.input}
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
    />
    <label htmlFor="raised-button-file">
        <Button variant="raised" component="span" className={classes.button}>
            Upload
        </Button>
    </label>


*/}
    <Stack spacing={3}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>


                            <FormControl fullWidth error={Boolean(touched.username && errors.username)} className={classes.loginInput}>
                                <InputLabel htmlFor="outlined-adornment-username-register">Username</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-username-register"
                                    type="text"
                                    value={values.username}
                                    name="username"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    inputProps={{
                                        classes: {
                                            notchedOutline: classes.notchedOutline
                                        }
                                    }}
                                />

                                {touched.username && errors.username && (
                                    <FormHelperText error id="standard-weight-helper-text--username">
                                        {errors.username}
                                    </FormHelperText>
                                )}
                            </FormControl>


                            <FormControl fullWidth error={Boolean(touched.email && errors.email)} className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {' '}
                                    {errors.email}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

                        <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-phone-register">Phone Number</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-phone-register"
                                type="phone"
                                value={values.phone}
                                name="phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.phone && errors.phone && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {' '}
                                    {errors.phone}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>


                        <FormControl fullWidth error={Boolean(touched.role&& errors.role)} className={classes.loginInput}>
                            <InputLabel  htmlFor="demo-simple-select-helper-label">Role</InputLabel>
                            <Select
                                        sx={{minHeight:63}}
                                        labelId="demo-simple-select-helper-label"
                                        id="role"
                                name="role"

                                value={values.role}
                                        label="Role"
                                        onBlur={handleBlur}
                                        error={touched.role && Boolean(errors.role)}

                                onChange={handleChange}    >

                                <MenuItem value={"administrateur"}>administrateur</MenuItem>

                                <MenuItem value={"Simple Employer"}>Simple Employer</MenuItem>
                                <MenuItem value={"responsable resource humaine"}>responsable resource humaine</MenuItem>
                            </Select>
                            {touched.role && errors.role && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {' '}
                                    {errors.role}{' '}
                                </FormHelperText>
                            )}

                        </FormControl>

                        </Stack>

                        <FormControl fullWidth error={Boolean(touched.password && errors.password)} className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
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
                        </FormControl>
                    </Stack>

                        <Grid item>
                            <Typography variant="subtitle1" fontSize="0.75rem">
                                {level.label}
                            </Typography>
                            </Grid >
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Box
                                        backgroundColor={level.color}
                                        sx={{
                                            width: 85,
                                            height: 8,
                                            borderRadius: '7px'
                                        }}
                                    ></Box>
                                </Grid>

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




                        {errors.submit && (
                            <Box
                                sx={{
                                    mt: 3
                                }}
                            >
                                <Alert severity="error">{errors.submit}</Alert>

                            </Box>
                        )}
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
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Add User
                                </Button>
                            </AnimateButton>
                        </Box>

                    </form>
                )}
            </Formik>
                </ThemeConfig>

        </React.Fragment>
    );
};

export default RestRegister;
