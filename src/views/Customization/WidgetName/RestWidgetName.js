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
    CHANGE_NAME,

    CLICK,

    CLOSE_MODAL, CLOSE_WIDGET_MODAL, IS_LOADING_CHANGE,

    UPDATE,

} from "../../../store/actions";
import {Alert, LoadingButton} from "@material-ui/lab";
import {Grid, Stack, TextField} from "@mui/material";
import {Formik} from "formik";
import * as Yup from "yup";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {useHistory, useParams} from "react-router-dom";
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

const RestWidgetName = ( { buttonRef }) => {
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







    const dispatcher = useDispatch();
    let widget = useSelector((state) => state.widget);
    let {id}=useParams()

    return (
        <React.Fragment>

            <Formik
                initialValues={{

                    WidgetName: '',

                }}
                validationSchema={Yup.object().shape({

                    WidgetName: Yup.string().required("Widget Name is required"),

                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                    dispatcher({
                        type:IS_LOADING_CHANGE,

                    })



                    try{
                        axios.post( configData.API_SERVER + 'api/users/addWidget', {
                            superior_id:id,
                            widgetName: values.WidgetName,
                             type: widget.Type,
                            label:widget.label,
                            data:widget.Data,
                            token:account.token
                        })
                            .then(function (response) {
console.log("test1")
                                if (response.data.success) {
                                    console.log("test2")

                                    dispatcher({
                                        type:IS_LOADING_CHANGE,

                                    })
                                    dispatcher({
                                        type:CHANGE_NAME,
                                        payload: {WidgetNamee:values.widgetName}

                                    })
                                    console.log("test3")

                                    dispatcher({
                                        type:CLOSE_WIDGET_MODAL,

                                    })
                                    console.log("test3")

                                    dispatcher({
                                        type:CLICK,
                                        payload: {text:"Widget added successfuly",severity:"success"}
                                    })



                                    console.log("test4")




                                } else {



                                    console.log("test5")

                                        setStatus({ success: false });
                                        setSubmitting(false);

                                    dispatcher({
                                            type:IS_LOADING_CHANGE,

                                        })
                                    setErrors({ submit: response.data.msg });




                                    }
                            })
                            .catch(function (error) {
                                console.log("test6")

                                setStatus({ success: false });
                                setErrors({ submit: error.response.data.msg });
                                dispatcher({
                                    type:IS_LOADING_CHANGE,

                                })
                                dispatcher({
                                    type:CLICK,
                                    payload: {text:"intern probleme please retry later",severity:"error"}
                                });
                            });
                    } catch (err) {
                        console.log("7")

                        console.error(err);
                        if (scriptedRef.current) {

                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                            dispatcher({
                                type:CLICK,
                                payload: {text:"intern probleme please retry later",severity:"error"}
                            });
                        }
                    }
                }}
            >
                {({ errors,setFieldValue, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (

                    <form  noValidate onSubmit={handleSubmit}  >

                        <Box marginLeft={7}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                p: 2,
                            }}
                        >
                            <Grid item md={12} lg={12} xs={12}>

                                <Stack  alignItems="center" ml={4} justifyContent="center" >


                                <FormControl fullWidth error={Boolean(touched.WidgetName && errors.WidgetName)} >



                                    <TextField  label="WidgetName" required variant="outlined"
                                               id="outlined-adornment-username-register"
                                               name="WidgetName"
                                               value={values.WidgetName}
                                               onChange={handleChange}

                                    />

                                    {touched.WidgetName && errors.WidgetName && (
                                        <FormHelperText error id="standard-weight-helper-text--username">
                                            {errors.WidgetName}
                                        </FormHelperText>
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


                                </FormControl>
                                </Stack>
                            </Grid>

                            </Box>


                        <Button
                            style={{ display: 'none' }}
                            ref={buttonRef}

                            type="submit"

                        >
                            Sign IN
                        </Button>

                    </form>
                )}
            </Formik>

</React.Fragment>
    );
};

export default RestWidgetName;
