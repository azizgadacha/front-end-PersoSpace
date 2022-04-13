import React from 'react';
import {useHistory, useParams} from 'react-router-dom';

import configData from '../../config';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    FormControl,

    FormHelperText,
    Grid,

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

// assets

import {Alert} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";

import { ADDINSIDEWORKSPACE, CLOSE_MODAL} from "../../store/actions";

// style constant



//===========================|| API JWT - REGISTER ||===========================//

const RestInsideWorkspace = (props) => {

    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');
    const account = useSelector((state) => state.account);
    const dispatcher = useDispatch();
    let {id}=useParams()
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
                            .post( configData.API_SERVER + 'api/users/addinsideworkspace', {
                                token:account.token,
                                superior_id:id,
                                WorkspaceName: values.WorkspaceName,
                                description: values.description
                            })
                            .then(function (response) {
                                if (response.data.success) {
                                    console.log("ena el data")
                                    console.log(response.data.WorkspaceID)
                                    dispatcher({
                                            type:CLOSE_MODAL,


                                        }
                                    )

                                    dispatcher({
                                        type:ADDINSIDEWORKSPACE,
                                        payload: {work:[{WorkspaceName:values.WorkspaceName,description:values.description,_id:response.data.WorkspaceID}]}


                                    })
                                    dispatcher({
                                        type:"Click",
                                        payload: {text:"Workspace added successfully",severity:"success"}
                                    })
                                    //history.push(configData.defaultPath +'/'+ id );
                                    console.log()


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

export default RestInsideWorkspace;