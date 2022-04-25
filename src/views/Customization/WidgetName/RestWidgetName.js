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
    ADD_WIDGET,
    CHANGE_NAME,

    CLICK,

    CLOSE_MODAL, CLOSE_WIDGET_MODAL, INISIALIZE_STORE, INIZIALIZE_STEPS, IS_LOADING_CHANGE,

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
let link
    let data
    return (
        <React.Fragment>

            <Formik
                initialValues={{

                    WidgetName: '',

                }}
                validationSchema={Yup.object().shape({

                    WidgetName: Yup.string().min(4,"widget name should contain 4 digit minimum").required("Widget Name is required"),

                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                    dispatcher({
                        type:IS_LOADING_CHANGE,

                    })
if(widget.sourceDB)
{
    link='api/users/shareData'
    data={token:account.token, idData:widget.idData, WidgetName:values.WidgetName, superiorID:id,type:widget.Type}
}
else
{
    link='api/users/addWidget'
data={superior_id:id, WidgetName: values.WidgetName, type: widget.Type, label:widget.label, dataWidget:widget.dataWidget, token:account.token}

}


                    try{
                        axios.post( configData.API_SERVER + link, data)
                            .then(function (response) {
                                if (response.data.success) {

                                    dispatcher({
                                        type:IS_LOADING_CHANGE,

                                    })

                                    console.log("lommmmm2222222222")

                                    dispatcher({
                                        type:CHANGE_NAME,
                                        payload: {WidgetName:values.WidgetName}

                                    })
                                    console.log("l2")
                                    console.log(response.data)
                                    console.log(response.data.widget)


                                    dispatcher({
                                        type:ADD_WIDGET,
                                        payload: {widget:response.data.widget}

                                    })

                                    dispatcher({
                                        type:INIZIALIZE_STEPS

                                    })



                                    dispatcher({
                                        type:CLOSE_WIDGET_MODAL,

                                    })



                                    dispatcher({
                                        type:CLICK,
                                        payload: {text:"Widget added successfuly",severity:"success"}
                                    })



                                } else {




                                        setStatus({ success: false });
                                        setSubmitting(false);

                                    dispatcher({
                                            type:IS_LOADING_CHANGE,

                                        })
                                    setErrors({ submit: response.data.msg });




                                    }
                            })
                            .catch(function (error) {

                                setStatus({ success: false });
                                setErrors({ submit: error.response.data.msg });
                                dispatcher({
                                    type:IS_LOADING_CHANGE,

                                })

                                dispatcher({
                                    type:INIZIALIZE_STEPS

                                })



                                dispatcher({
                                    type:CLOSE_WIDGET_MODAL,

                                })
                                dispatcher({
                                    type:CLICK,
                                    payload: {text:"intern probleme please retry later",severity:"error"}
                                });
                            });
                    } catch (err) {

                        if (scriptedRef.current) {

                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);

                            dispatcher({
                                type:INIZIALIZE_STEPS

                            })



                            dispatcher({
                                type:CLOSE_WIDGET_MODAL,

                            })
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
