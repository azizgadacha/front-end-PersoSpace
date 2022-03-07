import React, {useEffect, useState} from 'react';
import {  useHistory } from 'react-router-dom';

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
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import WorkspaceCard from "../dashboard/Default/WorkspaceCard";
import {ADD, CLOSE_MODAL} from "../../store/actions";

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

const RestWorkspace = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');
    const account = useSelector((state) => state.account);
    //const [openModal,setOpenModal]=useState(false);
    const dispatcher = useDispatch();
    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    user_id:'',
                    WorkspaceName: '',
                    description: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    WorkspaceName: Yup.string().required('WorkspaceName is required'),
                    description:Yup.string().required('Description is required')

                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        axios
                            .post( configData.API_SERVER + 'users/addworkspace', {
                                token:account.token,
                                user_id:account.user._id,
                                WorkspaceName: values.WorkspaceName,
                                description: values.description
                            })
                            .then(function (response) {
                                if (response.data.success) {

                                    dispatcher({
                                        type:CLOSE_MODAL,


                                    }
                                    )

                                    dispatcher({
                                        type:ADD,
                                        payload: {work:[{WorkspaceName:values.WorkspaceName,description:values.description}]}


                                    })
                                    dispatcher({
                                        type:"Click",
                                        payload: {text:"Workspace added successfully",severity:"success"}
                                    })
                                    history.push(configData.defaultPath);

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
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="WorkspaceName"
                                    margin="normal"
                                    name="WorkspaceName"
                                    id="WorkspaceName"
                                    type="text"
                                    value={values.WorkspaceName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.WorkspaceName && Boolean(errors.WorkspaceName)}
                                />
                                {touched.WorkspaceName && errors.WorkspaceName && (
                                    <FormHelperText error id="standard-weight-helper-text--register">
                                        {errors.WorkspaceName}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="description"
                                    margin="normal"
                                    name="description"
                                    id="description"
                                    type="text"
                                    value={values.description}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.description && Boolean(errors.description)}
                                />
                                {touched.description && errors.description && (
                                    <FormHelperText error id="standard-weight-helper-text--register">
                                        {errors.description}
                                    </FormHelperText>
                                )}
                            </Grid>
                        </Grid>



                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box
                                    sx={{
                                        mb: 2
                                    }}
                                >
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
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
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
                                    Add Workspace
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
                                    onClick={props.handleClose}
                                    variant="contained"
                                    color="secondary"
                                >
                                 Cancel
                                </Button>
                            </AnimateButton>

                        </Box>

                    </form>
                )}
            </Formik>
        </React.Fragment>
    );
};

export default RestWorkspace;
