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
import {Cancel, Changing, Edit, Editing} from "../../Button/actionButton";
import configData from "../../../config";
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import {LoadingButton} from "@material-ui/lab";
import SaveIcon from "@mui/icons-material/Save";



const EditWorkspace = (props, { ...others }) => {
    //On a étudié les deux cas (version Web et mobile) car le window.location.pathname(URL)différe dans les deux cas
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
    //récupération des valeus stockés dans le store
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
                    WorkspaceName: Yup.string().max(15,"must contain only 15 digits").min(4," name should contain 4 digit minimum").required(" Name is required"),
                    description: Yup.string().max(15,"must contain only 15 digits").min(4," name should contain 4 digit minimum").required(" description is required"),


                })}
                onSubmit={(values,{ setErrors, setStatus, setSubmitting }) => {
                    setIsloading(true)
                    setChanged(false)
                    if(location=='/dashboard/default'){
                        id1=account.user._id
                    }else{
                        id1=id
                    }
                    let  test={ submit: null,WorkspaceName:values.WorkspaceName.toLowerCase(),description:values.description.toLowerCase()}

                    if( _.isEqual(test, {WorkspaceName: props.card.WorkspaceName.toLowerCase(),description: props.card.description.toLowerCase(),submit:null})) {
                        setStatus({success: false});
                        setSubmitting(false);
                        setIsloading(false)
                        setErrors({submit: "you didn't change any things"});
                        setIsloading(false)

                        setChanged(true)
                    }


                else {
                        let onlyDesc=false
                        if(values.WorkspaceName==props.card.WorkspaceName){
                           onlyDesc=true
                        }
                        let visualise=false
                        if(location.includes('#/dashboard/VisualizationOfWorkspace')){
                            visualise=true
                        }else
                            visualise=false
//la liaison entre la partie front et la partie back se fait à travers ce bout de code durant lequel il y'aura l'envoie des données a utilisé et le type du méthode du contoller souhaité
                        axios
                            .post(configData.API_SERVER + 'api/Workspace/editworkspace', {
                                token: account.token,
                                user_id:account.user._id,
                                superior_id:id1,
                                onlyDesc,
                                visualise,
                                card_id: props.card._id,
                                WorkspaceName: values.WorkspaceName,
                                description: values.description
                            })
                            .then(function (response) {

                                if(response.data.notConnected){
                                    setIsloading(true)

                                    dispatcher({ type: LOGOUT });

                                    history.push("/login");
                                    dispatcher({
                                        type:CLICK,
                                        payload: {text:"You are no longer connected",severity:"error"}
                                    })
                                }
                                else if(response.data.adminstratorProblem){
                                    setIsloading(true)

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

                                }else if (response.data.Existance){
                                    setStatus({ success: false });
                                    setSubmitting(false);
                                    setIsloading(false)
                                    setErrors({ submit: response.data.msg });
                                    setIsloading(false)

                                    setChanged(true)


                                }


                                else
                                {

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
                                    setIsloading(true)

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
                                        payload: {text:response.data.msg, severity: "error"}
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
                                            onChange={(e)=>{

                                                setChanged(false)

                                                handleChange(e)}}
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
                                            onChange={(e)=>{

                                                setChanged(false)

                                                handleChange(e)}}
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
                                    {errors.submit}
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
                                    {isloading?(<LoadingButton variant="contained"   fullWidth size="large" loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">{Editing}</LoadingButton>):

                                        <Button
                                        fullWidth
                                        type="submit"
                                        size="large"
                                        variant="contained"
                                        color="secondary">{Edit} </Button>}

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

                                        <Button disableElevation disabled={isloading}  size="large"  onClick={props.handleClose} fullWidth variant="contained" color="error">{Cancel}</Button>
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
