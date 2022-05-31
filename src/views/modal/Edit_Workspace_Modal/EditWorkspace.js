import React, {useEffect, useState} from 'react';
import {
    Alert,

    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid, TextField,
} from '@mui/material';
import {
    FormControl,
    FormHelperText,
    InputLabel, MenuItem,
    OutlinedInput,
    Select,

} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import ThemeConfig from "../../../themes/theme2";
import {Formik} from "formik";
import * as Yup from "yup";

import {
    CLICK,
    CLICKED_INISIALIZE,
    ClOSE_EDIT_MODAL,
    CLOSE_MODAL,
    DELETE,
    INISIALIZE, LOGOUT,
    OPEN_MODAL, UPDATE, UPDATE_WORKSPACE
} from "../../../store/actions";

import AnimateButton from "../../../animation/AnimateButton";

import Password_verify from "../../modal/password_verify_modal";
import _ from "lodash";
import {Cancel, Edit} from "../../Button/actionButton";
import configData from "../../../config";
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";



const EditWorkspace = (props, { ...others }) => {
    let location=null
    if(window.location.pathname.includes('html'))
        location=window.location.hash
    else
        location=window.location.pathname


    const dispatcher = useDispatch();
    const [changed, setChanged] = useState(false);
    const [val, setVal] = useState({});

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
    let history =useHistory()

    const account = useSelector((state) => state.account);
    let open1 = useSelector((state) => state.modal);
    const [isloading, setIsloading] = useState(false);
let {id}=useParams()
    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_MODAL,

            });
        }
    }, [])
    let workspaces = useSelector((state) => state.workspace);

    let link
    let id1
    let datasend
    return (

        <ThemeConfig>

            <Formik
                initialValues={{
                    WorkspaceName: props.card.WorkspaceName,
                    description: props.card.description,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    WorkspaceName: Yup.string().min(4).max(13)
                        .optional().required("WorkspaceName is required"),
                    description: Yup.string().min(4).max(25)
                        .optional().required("description is required")

                })}
                onSubmit={(values) => {
                    setChanged(false)


                    if( _.isEqual(values, {WorkspaceName: props.card.WorkspaceName,description: props.card.description,submit:null}))
                        setChanged(true)
                    else {

                        let visualise=false
                        if(location.includes('VisualizationOfWorkspace')){
                            visualise=true
                        }else
                            visualise=false

                        axios
                            .post(configData.API_SERVER + 'api/users/editworkspace', {
                                token: account.token,
                                user_id:account.user._id,
                                visualise,
                                card_id: props.card._id,
                                WorkspaceName: values.WorkspaceName,
                                description: values.description
                            })
                            .then(function (response) {

                                if(response.data.notConnected){
                                    dispatcher({ type: LOGOUT });
                                    history.push("/login");
                                    dispatcher({
                                        type:CLICK,
                                        payload: {text:"You are no longer connected",severity:"error"}
                                    })
                                }
                                else if(response.data.adminstratorProblem){
                                    dispatcher({
                                        type:UPDATE,
                                        payload: {user:response.data.user}
                                    });
                                    dispatcher({
                                            type: ClOSE_EDIT_MODAL,
                                        }
                                    )
                                    history.push(configData.defaultPath)

                                    setIsloading(false)




                                    dispatcher({
                                        type:CLICK,
                                        payload: {text:'You are no longer an administrator',severity:"error"}
                                    });

                                }

                                else{

                                if (response.data.success) {
                                    setIsloading(false)

                                    dispatcher({
                                        type:UPDATE_WORKSPACE,
                                        payload: {work:response.data.w}
                                    })

                                    dispatcher({
                                            type: ClOSE_EDIT_MODAL,
                                        }
                                    )
                                    dispatcher({
                                        type: "Click",
                                        payload: {text: "Workspace Edited successfully", severity: "success"}
                                    })
                                }
                                else{

                                    dispatcher({
                                            type: ClOSE_EDIT_MODAL,
                                        }
                                    )
                                    history.go(0)
                                    dispatcher({
                                        type: "Click",
                                        payload: {text: "Workspace No Longer Exist", severity: "error"}
                                    })
                                }
                            }})

                    }}

                }

            >
                {({ errors,setFieldValue, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form  noValidate onSubmit={handleSubmit} {...others}>


                                <Grid
                                    container
                                    spacing={3}
                                >

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="WorkspaceName*"
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
                                            label="description*"
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
                        { changed&&(
                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                                <Alert variant="filled" autoHideDuration={4000} severity="error">
                                    You didn't change any things
                                </Alert>
                            </Grid>)}
                        <Grid container alignItems={"center"}>
                            <Grid xs={6}>
                                <Box
                                    sx={


                                        {
                                            ml:0,
                                            mr:2,
                                            mt: 2,

                                        }}
                                >
                                    <Button
                                        fullWidth
                                        type="submit"
                                        size="large"
                                        variant="contained"
                                        color="secondary">{Edit} </Button>

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

                                        <Button disableElevation  size="large"  onClick={props.handleClose} fullWidth variant="contained" color="error">{Cancel}</Button>
                                    </AnimateButton>

                                </Box>
                            </Grid>

                        </Grid>
                            <Divider />










                    </form>
                )}
            </Formik>

        </ThemeConfig>
    );
};
export default EditWorkspace;
