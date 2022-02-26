import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import configData from '../../config';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
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
import {useSelector} from "react-redux";

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

const RestProfile = ({ ...others }) => {
    const classes = useStyles();
    let history = useHistory();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

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
    const account = useSelector((state) => state.account);
    const [info,setInfo]=useState([]);



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
                        <Grid container spacing={6} >

                            <Grid item   xs={12} >
                                <label>Username: </label>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="username"
                                    id="username"
                                    type="text"
                                    value={(info.username)}
                                />
                            </Grid>
                            <Grid>

                            </Grid>

                            <Grid item xs={12} alignItems="baseline" >
                                <label>Email:      </label>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="email"
                                    id="email"
                                    type="text"
                                    value={(info.email)}
                                />
                            </Grid>

                        </Grid>

                    </form>

        </React.Fragment>
    );
};

export default RestProfile;
