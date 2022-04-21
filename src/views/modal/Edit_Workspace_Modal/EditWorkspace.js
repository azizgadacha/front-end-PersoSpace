import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import configData from '../../../config';
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
import useScriptRef from '../../../hooks/useScriptRef';
import AnimateButton from '../../../animation/AnimateButton';

// assets

import {Alert, LoadingButton} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";

import {ADD, ClOSE_EDIT_MODAL, CLOSE_MODAL, INISIALIZE} from "../../../store/actions";
import SaveIcon from "@mui/icons-material/Save";
import {Add, Adding, Cancel, Edit, Editing} from "../../Button/actionButton";
import _ from "lodash";

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

const EditWorkspace = (props) => {
    const [isloading, setIsloading] = useState(false);

    let history = useHistory();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');
    const account = useSelector((state) => state.account);
    const [changed, setChanged] = useState(false);

    //const [openModal,setOpenModal]=useState(false);
    const dispatcher = useDispatch();
    let link
    let id1
    let {id}=useParams()
    return (
        <React.Fragment>

            <Formik
                initialValues={{
                    card_id:props.card._id,
                    WorkspaceName: props.card.WorkspaceName,
                    description: props.card.description,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    WorkspaceName: Yup.string().required('WorkspaceName is required'),
                    description:Yup.string().required('Description is required')

                })}

                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                      setChanged(false)
                        if((!(props.card.WorkspaceName==values.WorkspaceName))||((!(props.card.description==values.description)))){

                            setChanged(true)
                        }
                        else {
                            setChanged(false)
                        }

                        setIsloading(true)

                    console.log("mansour")
                    {console.log("cardid:"+props.card._id)}
                    {console.log("WorkspaceName:"+props.card.WorkspaceName)}
                    {console.log("description:"+props.card.description)}
                    console.log(changed)

                    if(changed==true) {
                  try {
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


                              } else {
                                  setStatus({success: false});
                                  setErrors({submit: response.data.msg});
                                  setSubmitting(false);
                                  setIsloading(false)

                              }
                          })
                          .catch(function (error) {
                              setStatus({success: false});
                              setErrors({submit: error.response.data.msg});
                              setSubmitting(false);
                              setIsloading(false)

                          });

                  } catch (err) {
                      console.error(err);
                      if (scriptedRef.current) {
                          setStatus({success: false});
                          setErrors({submit: err.message});
                          setSubmitting(false);
                          setIsloading(false)

                      }
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
                        { !(changed) &&(
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
                                > { !(changed) &&(
                                                <Button
                                                    fullWidth
                                                    type="submit"
                                                    size="large"
                                                    variant="contained"
                                                    color="secondary">{Edit} </Button>)}


                                     { changed &&(
                                                <AnimateButton>
                                                    {isloading?(<LoadingButton variant="contained"   fullWidth size="large" loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">{Editing}</LoadingButton>):
                                                        <Button
                                                            fullWidth
                                                            type="submit"
                                                            size="large"
                                                            variant="contained"
                                                            color="secondary">{Edit} </Button>}



                                                </AnimateButton>)}



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








                    </form>
                )}
            </Formik>
        </React.Fragment>
    );
};

export default EditWorkspace;
