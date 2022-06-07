import React, {useEffect, useState} from 'react';
import {
    Alert,

    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid, Stack, TextField,
} from '@mui/material';
import {
    FormControl,
    FormHelperText,
    InputLabel, MenuItem,
    OutlinedInput,
    Select, useMediaQuery, useTheme,

} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import ThemeConfig from "../../../themes/theme2";
import {Formik} from "formik";
import * as Yup from "yup";

import {CLICK, CLOSE_MODAL, LOGOUT, OPEN_MODAL} from "../../../store/actions";

import AnimateButton from "../../../animation/AnimateButton";

import Password_verify from "../../modal/password_verify_modal";
import _ from "lodash";
import {Cancel, Change, Changing, Edit, Edit_Information, Edit_Password, Editing} from "../../Button/actionButton";
import axios from "axios";
import configData from "../../../config";
import {useHistory} from "react-router-dom";
import {LoadingButton} from "@material-ui/lab";
import SaveIcon from "@mui/icons-material/Save";



const AccountProfileDetails = ({file,notChanged,errorMessage,setErrorMessage,setNotChanged}) => {
    let history =useHistory()

    const handleClick = () => {
      history.push("/Profile")
    }


  const dispatcher = useDispatch();

    const [isloading, setIsloading] = useState(false);

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
    const theme = useTheme();

    const account = useSelector((state) => state.account);
    let open1 = useSelector((state) => state.modal);

    const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));


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
            username: account.user.username,
            email: account.user.email,
            phone: account.user.phone,
            submit: null
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(100,"must contain only 100 digits").required('Email is required'),
            username: Yup.string().required('Username is required').min(6,"must contain minimum 6 digits  "),

              phone:Yup.string().required().matches(/^[0-9]+$/, "Must be only digits").min(8, 'Must be exactly 8 digits').max(8, 'Must be exactly 8 digits'),


          })}
          onSubmit={(values) => {
              setIsloading(true)
              setNotChanged(false)




             if( (_.isEqual(values, {username:account.user.username,phone:account.user.phone,email:account.user.email,submit:null}))&&(file===`${configData.API_SERVER}${account.user.photo}`))
             {
                 setIsloading(false)
                 setNotChanged(true)

                 setErrorMessage( "  You didn't change any things")

             }
                 else{

                 axios.post( configData.API_SERVER + 'api/User/all', {
                     user_id:account.user._id,
                     email: values.email,
                     username:values.username,
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
                              if((response.data.users).length==0) {
                                  setVal(values)
                                  setIsloading(false)

                                  dispatcher({
                                      type: OPEN_MODAL,

                                  });
                              }else{
                                  setIsloading(false)

                                  setNotChanged(true)
                                  setErrorMessage( `  a user with same ${ response.data.users[0].email==values.email?'email':'username'} already exist `)


                              }
                             } else {
                                 setIsloading(false)

                                 dispatcher({
                                     type:CLICK,
                                     payload: {text:"internel problem",severity:"error"}
                                 })

                                   }
                                    }}).catch(()=>{
                     setIsloading(false)

                     dispatcher({
                         type:CLICK,
                         payload: {text:"internel problem",severity:"error"}
                     })
                 })






          }}

      }

      >
        {({ errors,setFieldValue, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form  noValidate onSubmit={handleSubmit} >


               <Card sx={{minHeight:{matchDownLG}?"100%":null}}>
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


                  { notChanged&&(
                  <Grid
                      item
                      md={12}
                      xs={12}
                  >
                        <Alert variant="filled" autoHideDuration={4000} severity="error">
                            {errorMessage}
                  </Alert>
                  </Grid>)}
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                  <Grid item xs={12} >
                    <FormControl fullWidth error={Boolean(touched.username && errors.username)} >
                      <TextField label="username" required variant="outlined"
                          id="outlined-adornment-username-register"
                                 name="username"
                          value={values.username}
                          onChange={(e)=>{
                              setNotChanged(false)
                              handleChange(e)




                          }}



                      />

                      {touched.username && errors.username && (
                          <FormHelperText error id="standard-weight-helper-text--username">
                            {errors.username}
                          </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                  <Grid item xs={12} >
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)} >
                      <TextField label="Email" required variant="outlined"
                          id="outlined-adornment-email-register"
                          type="email"
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                                 onChange={(e)=>{
                                     setNotChanged(false)
                                     handleChange(e)


                                 }}

                      />
                      {touched.email && errors.email && (
                          <FormHelperText error id="standard-weight-helper-text--register">
                            {' '}
                            {errors.email}{' '}
                          </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid
                    item
                    md={6}
                    xs={12}
                >
                  <Grid item xs={12} >
                    <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} >
                        <TextField label="phone" required variant="outlined"
                          id="outlined-adornment-phone-register"
                          type="phone"
                          value={values.phone}
                          name="phone"
                          onBlur={handleBlur}
                                   onChange={(e)=>{
                                       setNotChanged(false)

                                       handleChange(e)


                                   }}

                      />
                      {touched.phone && errors.phone && (
                          <FormHelperText error id="standard-weight-helper-text--register">
                            {' '}
                            {errors.phone}{' '}
                          </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                  <Grid item xs={12} >



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
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <AnimateButton>

                            <Button
                                fullWidth

                                size="large"
                                type="submit"
                                color="error"
                                variant="contained"
                                onClick={handleClick}

                            >
                                {Cancel}         </Button>
                        </AnimateButton>
                    <AnimateButton>
                      {isloading?(<LoadingButton  disableElevation
                                                  fullWidth
                                                  size="large"
                                                  type="submit"
                                                  variant="contained" loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">{Editing}</LoadingButton>):
                          <Button
                              disableElevation
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                              color="secondary"
                              sx={{minWidth:'90px'}}
                          >
                              {Edit}
                          </Button>}


                  </AnimateButton>



                    </Stack>

                </Box>
              </Card>









            </form>
        )}
      </Formik>
        {open1.ModalState && (<Password_verify file={file}    user={val}/>)}

    </ThemeConfig>
);
};
export default AccountProfileDetails;
