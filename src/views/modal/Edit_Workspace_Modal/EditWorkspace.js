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

import {ClOSE_EDIT_MODAL, CLOSE_MODAL, INISIALIZE, OPEN_MODAL} from "../../../store/actions";

import AnimateButton from "../../../animation/AnimateButton";

import Password_verify from "../../modal/password_verify_modal";
import _ from "lodash";
import {Cancel, Edit} from "../../Button/actionButton";
import configData from "../../../config";
import axios from "axios";
import {useParams} from "react-router-dom";



const EditWorkspace = (props, { ...others }) => {

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
                        axios
                            .post(configData.API_SERVER + 'api/users/editworkspace', {
                                token: account.token,
                                card_id: props.card._id,
                                WorkspaceName: values.WorkspaceName,
                                description: values.description
                            })
                            .then(function (response) {
                                if (response.data.success) {
                                    setIsloading(false)
                                    let link
                                    let id1
                                    if (id) {
                                        link = 'api/users/getinsideworkspace'
                                        id1 = id
                                    } else {
                                        link = 'api/users/getworkspace'
                                        id1 = account.user._id
                                    }
                                    axios
                                        .post(configData.API_SERVER + link, {superior_id: id1, token: account.token})
                                        .then(response => {
                                            dispatcher({
                                                type: INISIALIZE,
                                                payload: {work: response.data.workspaceitems}
                                            })
                                        })
                                        .catch(function (error) {
                                        })
                                    dispatcher({
                                            type: ClOSE_EDIT_MODAL,
                                        }
                                    )
                                    dispatcher({
                                        type: "Click",
                                        payload: {text: "Workspace Edited successfully", severity: "success"}
                                    })
                                    console.log()
                                }
                            })

                    }}

                }

            >
                {({ errors,setFieldValue, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form  noValidate onSubmit={handleSubmit} {...others}>
                            <Divider />


                                <Grid
                                    container
                                    spacing={3}
                                >
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
