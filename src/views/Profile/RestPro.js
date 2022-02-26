import React, {useState,useEffect} from 'react';
import {Link as RouterLink, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import configData from '../../config';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText, Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack, TextField,
    Typography, useMediaQuery
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project imports
import useScriptRef from '../../hooks/useScriptRef';
import AnimateButton from '../../animation/AnimateButton';
import { ACCOUNT_INITIALIZE } from '../../store/actions';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {Alert} from "@material-ui/lab";

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

//============================|| API JWT - LOGIN ||============================//

const RestPro = (props, { ...others }) => {
    const classes = useStyles();
    const dispatcher = useDispatch();

    const scriptedRef = useScriptRef();
    const [checked, setChecked] = React.useState(true);

    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [info,setInfo]=useState('');
    const account = useSelector((state) => state.account);


    useEffect(()=>{

        axios
            .post( configData.API_SERVER + 'users/Profile',{token:account.token})
            .then(response =>{

                //console.log('nemchi')

                console.log(response);
                setInfo(response.data)


            })
            .catch(function (error) {
                console.log('le menemchich zeda')
                console.log('error')

            })
    },[])
    return (
        <React.Fragment>

            <form >
                <Grid container spacing={matchDownSM ? 0 : 2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Username"
                            margin="normal"
                            name="username"
                            id="username"
                            type="text"
                            value={JSON.stringify(info.username)}
                        />

                    </Grid>
                </Grid>
                <FormControl >
                    <InputLabel htmlFor="outlined-adornment-email-register">Email</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email-register"
                        type="email"

                        name="email"

                    />

                </FormControl>
<Grid item xs={12}>
                <FormControl>
                    <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password-register"
                        type={showPassword ? 'text' : 'password'}

                        name="password"
                        label="Password"
                     />

                </FormControl>
</Grid>
            </form>
        </React.Fragment>

    );
};

export default RestPro;
