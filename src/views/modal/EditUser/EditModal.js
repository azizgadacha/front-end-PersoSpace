import React, {Fragment, useState} from 'react';


import configData from '../../../config';

// maerial-ui
import {Box, Button, Grid,} from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';


import axios from 'axios';

// project imports


import AnimateButton from '../../../animation/AnimateButton';



import {useDispatch, useSelector} from "react-redux";

import {
    ADD_USER,
    CLICK,
    CLOSE_DELETE_MODAL, CLOSE_EDIT_MODAL,
    DELETE_WIDGET, UPDATE,
    USER_DELETE
} from "../../../store/actions";
import {LoadingButton} from "@material-ui/lab";
import {Cancel, Delete, Deleting} from "../../Button/actionButton";
import {useHistory, useParams} from "react-router-dom";

// style constant

//===========================|| API JWT - REGISTER ||===========================//

const DeleteModalCore = ({obj,type}) => {
    const handleCloseModal = ()=> {
        dispatcher({
            type:CLOSE_DELETE_MODAL,

        });
    };

    const [isloading, setIsloading] = useState(false);
    const account = useSelector((state) => state.account);
    //const [openModal,setOpenModal]=useState(false);

    const dispatcher = useDispatch();

let link
    let dataSend





    let {id}=useParams()

    const Click = () => {

        if(type=="User")

            {
                link='api/users/deleteUser'

                dataSend=  {token:account.token, user_id:obj._id}
            }


            else if (type=="Widget")
            {

                if(obj.widgetName){
                    link='api/users/deleteWidget'
                    dataSend=  {token:account.token,WidgetName:obj.WidgetName, superior_id:obj.superior_id}}
                else {
            link = 'api/users/deleteLinkWidget'
            dataSend=  {token:account.token,superior_id:id, idData:obj._id}}

    }
        setIsloading(true)


        axios
            .post( configData.API_SERVER + link,dataSend)
            .then(response =>{
                if(response.data.success){
                dispatcher({
                    type:CLOSE_DELETE_MODAL,
                })
              if(type=="User"){

                dispatcher({
                    type:USER_DELETE,
                    payload: {user:response.data.user}
                })}
            else {
            dispatcher({
             type:DELETE_WIDGET,
            payload: {widget:response.data.widget}
    })

              }
            console.log('je suis ici')

                    dispatcher({
                    type:CLICK,
                    payload: {text:`${type} has been deleted`,severity:"success"}
                })

                    dispatcher({
                        type:CLOSE_DELETE_MODAL,
                    })
                }
                else {
                    dispatcher({
                        type:CLOSE_DELETE_MODAL,
                    })
                    dispatcher({
                        type:CLICK,
                        payload: {text:response.data.msg,severity:"error"}
                    })
                }

                console.log('je suis ici')
                console.log(response.data)



            })
            .catch(function (error) {
                dispatcher({
                     type:CLOSE_DELETE_MODAL,
                })
                dispatcher({
                    type:CLICK,
                    payload: {text:"internel problem please try later",severity:"error"}
                })

            })


    };


    return (
        <Fragment>


            <Grid container alignItems={"center"}>
                <Grid xs={6}>
                    <Box
                        sx={


                        {
                            ml:0,
                            mr:3,
                            mt: 2,

                        }}
                    >
                        <AnimateButton>




                            {isloading?(<LoadingButton variant="contained"   fullWidth size="large" loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">{Deleting}</LoadingButton>):
                                <Button
                                    disableElevation
                                    fullWidth
                                    onClick={Click}
                                    type="submit" size="large"
                                    variant="contained"
                                    color="error">{Delete}</Button>}



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

                            <Button disableElevation size="large" disabled={isloading}  onClick={handleCloseModal} fullWidth variant="contained" color="secondary">{Cancel}</Button>
                        </AnimateButton>

                    </Box>
                </Grid>

            </Grid>





</Fragment>
    );
};

export default DeleteModalCore;











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
    TextField,
} from '@mui/material';
// components
import ThemeConfig from "../../../themes/theme2"


import Backdrop from '@mui/material/Backdrop';

import axios from "axios";
import configData from "../../../config";

import {useDispatch, useSelector} from "react-redux";
import { ADD_USER, CLICK, CLOSE_MODAL} from "../../../store/actions";


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

    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

// ----------------------------------------------------------------------

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






const EditModal=  ({obj}) => {
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
    const scriptedRef = useScriptRef();
    const dispatcher = useDispatch();

    let account = useSelector((state) => state.account);



    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_EDIT_MODAL,
            });
        }
    }, [])



    let open1 = useSelector((state) => state.modal);

    const handleClose=()=>{



        dispatcher({
            type:CLOSE_EDIT_MODAL,
        });
    }


    let history =useHistory()


    return (
        <Fragment>


                                <Formik
                                    initialValues={{
                                        role: obj.role,
                                    }}
                                    validationSchema={Yup.object().shape({
                                        role: Yup.string().required('role is required')
                                    })}
                                    onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {


                                        setIsloading(true)
                                        try {




                                            axios.post( configData.API_SERVER + 'api/users/editUser', {
                                              token:account.token,
                                                role:values.role,
                                                _id:account._id
                                            })
                                                .then(function (response) {

                                                    if (response.data.success) {
                                                        dispatcher({
                                                            type:UPDATE,
                                                            payload: {user:response.data.user}
                                                        });

                                                    } else {
                                                        if(response.data.administratorProblem)
                                                        {
                                                            dispatcher({
                                                            type:UPDATE,
                                                            payload: {user:response.data.user}
                                                        });
                                                            history.push(configData.defaultPath)

                                                            dispatcher({
                                                                type:CLICK,
                                                                payload: {text:'You are no langeran administrateur',severity:"error"}
                                                            });

                                                        }


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



        </Fragment>
    )
        ;
}
export default EditModal;

