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
    FormHelperText, IconButton, InputAdornment,
     useMediaQuery, useTheme,

} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import ThemeConfig from "../../../themes/theme2";
import {Formik} from "formik";
import * as Yup from "yup";

import {CLICK, CLOSE_MODAL, LOGOUT, UPDATE} from "../../../store/actions";

import AnimateButton from "../../../animation/AnimateButton";

import {Edit, Editing} from "../../Button/actionButton";
import Iconify from "../../ViewAll/import/customer/Iconify";
import {useHistory} from "react-router-dom";
import useScriptRef from "../../../hooks/useScriptRef";
import {strengthColor, strengthIndicator} from "../../../verification_password/password-strength";
import {makeStyles} from "@material-ui/styles";
import axios from "axios";
import configData from "../../../config";
import {LoadingButton} from "@material-ui/lab";
import SaveIcon from "@mui/icons-material/Save";


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
const AccountProfileDetails = (props, { ...others }) => {
    const [verifPass, setVerifPass] = useState(false);

    const [confirm, setConfirm] = useState(false);


    let account = useSelector((state) => state.account);

    let history = useHistory();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [showPassword0, setShowPassword0] = React.useState(false);
    const [showPassword1, setShowPassword1] = React.useState(false);
    const [showPassword2, setShowPassword2] = React.useState(false);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');






    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };


    useEffect(() => {
        changePassword('123456');
    }, []);
    function handleShowPassword (num) {

        switch (num) {
            case 0: {
                setShowPassword0((show) => !show);
                break;

            }
            case 1: {

                setShowPassword1((show1) => !show1);
                break;

            }
            case 2: {

                setShowPassword2((show2) => !show2);
                break;

            }
            default: {
                setShowPassword0((show) => !show);
                break;

            }        }
    };


    const [isloading, setIsloading] = useState(false);
    //const [openModal,setOpenModal]=useState(false);
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
    let open1 = useSelector((state) => state.modal);

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

              old:'',
              new:'',
              confirm:'',

          }}
          validationSchema={Yup.object().shape({

              old: Yup.string().max(100,"must contain only 100 digits").min(6,"old password must contain more then 6 digits"). required('old password is required'),
              new : Yup.string().max(100,"must contain only 100 digits").min(6,"new password must contain more then 6 digits"). required('new password is required'),
              confirm : Yup.string().max(100,"must contain only 100 digits").min(6,"confirm password must contain more then 6 digits"). required('confirm password is required'),

          })}
          onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {

              setIsloading(true)
              if (values.new!=values.confirm){
                  setConfirm(true)
                  setStatus({ success: false });
                  setSubmitting(false);
                  setIsloading(false)
              }else{


                  try{
                      axios.post( configData.API_SERVER + 'api/users/editPass', {
                          userID:account.user._id,
                          newPassword: values.new,
                          oldPassword: values.old,

                          token:account.token
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
                              else
                              {



                              if (response.data.success) {





                                  dispatcher({
                                      type:UPDATE,
                                      payload: {user:response.data.user}
                                  });

                                  dispatcher({
                                      type:CLICK,
                                      payload: {text:"information changed successfully",severity:"success"}
                                  });
                                  setIsloading(false)
                                  history.push("/Profile")

                              } else {

                                  if(response.data.passprob) {



                                      setVerifPass(true)




                                      setStatus({ success: false });
                                      setSubmitting(false);
                                      setIsloading(false)

                                  }

                                  else {


                                      setStatus({ success: false });
                                      setErrors({ submit: response.data.msg });
                                      setSubmitting(false);
                                      setIsloading(false)
                                      history.push("/Profile")
                                      dispatcher({
                                          type:CLICK,
                                          payload: {text:"intern probleme please retry later",severity:"error"}
                                      });

                                  }}}
                          })
                          .catch(function (error) {

                              setStatus({ success: false });
                              setErrors({ submit: error.response.data.msg });
                              history.push("/Profile")
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
                          history.push("/Profile")
                          dispatcher({
                              type:CLICK,
                              payload: {text:"intern probleme please retry later",severity:"error"}
                          });
                      }
                  }


              }}}
      >
        {({ errors,setFieldValue, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form  noValidate onSubmit={handleSubmit} {...others}>


                <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                />
                <Divider />
                <CardContent>


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
                <Grid
                    item
                    md={8}
                    xs={12}
                >
                  <Grid item xs={12} >
                      <FormControl fullWidth error={Boolean(touched.old && errors.old)} >

                          <TextField
                              name="old"
                              value={values.old}

                              onBlur={handleBlur}
                              id="outlined-adornment-password-old"
                              required
                              type={showPassword0 ? 'text' : 'password'}
                              label="Password"
                              onChange={(e) => {
                                  setVerifPass(false)
                                  handleChange(e);
                                  changePassword(e.target.value);
                              }}
                              InputProps={{
                                  endAdornment: (
                                      <InputAdornment position="end">
                                          <IconButton onClick={(e)=>{handleShowPassword(0)}} edge="end">
                                              <Iconify icon={showPassword0 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                          </IconButton>
                                      </InputAdornment>
                                  )
                              }}

                          />







                          {touched.old && errors.old && (
                              <FormHelperText error id="standard-weight-helper-text-password-register">
                                  {errors.old}
                              </FormHelperText>

                          )}
                          {! (errors.old) &&verifPass&& (
                              <FormHelperText error id="standard-weight-helper-text-password-register">
                                  wrong password
                              </FormHelperText>

                          )}

                      </FormControl>
                  </Grid>
                </Grid>
                <Grid
                    item
                    md={8}
                    xs={12}
                >
                  <Grid item xs={12} >
                      <FormControl fullWidth error={Boolean(touched.new && errors.new)} >

                          <TextField
                              name="new"
                              id="outlined-adornment-password-new"
                              required
                              value={values.new}

                              onBlur={handleBlur}
                              type={showPassword1 ? 'text' : 'password'}
                              label="New password"
                              onChange={(e) => {
                                  setConfirm(false)
                                  handleChange(e);
                                  changePassword(e.target.value);
                              }}
                              InputProps={{
                                  endAdornment: (
                                      <InputAdornment position="end">
                                          <IconButton onClick={(e)=>{handleShowPassword(1)}} edge="end">
                                              <Iconify icon={showPassword1 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                          </IconButton>
                                      </InputAdornment>
                                  )
                              }}

                          />







                          {touched.new && errors.new && (
                              <FormHelperText error id="standard-weight-helper-text-password-register">
                                  {errors.new}
                              </FormHelperText>

                          )}

                      </FormControl>

                  </Grid>
                </Grid>

                <Grid
                    item
                    md={8}
                    xs={12}
                >
                  <Grid item xs={12} >
                      <FormControl fullWidth error={Boolean(touched.confirm && errors.confirm)} >

                          <TextField
                              name="confirm"
                              id="outlined-adornment-password-confirm"
                              required
                              value={values.confirm}

                              onBlur={handleBlur}
                              type={showPassword2 ? 'text' : 'password'}
                              label="Confirm password"
                              onChange={(e) => {
                                  setConfirm(false)
                                  handleChange(e);
                                  changePassword(e.target.value);
                              }}
                              InputProps={{
                                  endAdornment: (
                                      <InputAdornment position="end">
                                          <IconButton onClick={(e)=>{handleShowPassword(2)}} edge="end">
                                              <Iconify icon={showPassword2 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                          </IconButton>
                                      </InputAdornment>
                                  )
                              }}

                          />







                          {touched.confirm && errors.confirm && (
                              <FormHelperText error id="standard-weight-helper-text-password-register">
                                  {errors.confirm}
                              </FormHelperText>

                          )}
                          { !(errors.new) && confirm && (
                              <FormHelperText error id="standard-weight-helper-text-password-register">
                                  confirm and new password should be the same
                              </FormHelperText>

                          )}
                      </FormControl>
                  </Grid>
                </Grid>


              </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      p: 2
                    }}
                >
                  <AnimateButton>


                      {isloading?(<LoadingButton variant="contained" size="large" loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">{Editing}</LoadingButton>):  <Button

                          disableElevation
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          color="secondary"
                      >
                          {Edit}
                      </Button>}


                  </AnimateButton>


                </Box>
              </Card>









            </form>
        )}
      </Formik>


    </ThemeConfig>
);
};
export default AccountProfileDetails;
