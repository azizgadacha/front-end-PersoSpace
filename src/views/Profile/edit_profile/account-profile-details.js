import React, { useEffect } from 'react';
import {

  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
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

import { CLOSE_MODAL, OPEN_MODAL} from "../../../store/actions";

import AnimateButton from "../../../animation/AnimateButton";

import Passwoed_verify from "../../modal/password_verify_modal";



const AccountProfileDetails = (props, { ...others }) => {
  const dispatcher = useDispatch();

  const account = useSelector((state) => state.account);
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
            username: '',
            email: '',
            password: '',
            role: '',
            phone: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(100,"must contain only 100 digits").required('Email is required'),
            username: Yup.string().required('Username is required'),

            phone: Yup.number().typeError("Must be a number").required('phone number is required').integer("Must be a valid number").positive(),

            role: Yup.string().required('role is required')

          })}
          onSubmit={(values) => {



              console.log("d5alt3.0")


              let fd = new FormData();

              fd.append('username',values.username)
              fd.append('email',values.email)
              fd.append('phone',values.phone)
              fd.append('file',values.file)
              fd.append('role',values.role)
              fd.append('token',account.token)

console.log("d5alt")
                      dispatcher({
                          type:OPEN_MODAL,

                      });
              console.log("d5alt2.0")

          }

      }

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
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                  <Grid item xs={12} >
                    <FormControl fullWidth error={Boolean(touched.username && errors.username)} >
                      <InputLabel htmlFor="outlined-adornment-username-register">Username</InputLabel>
                      <OutlinedInput
                          id="outlined-adornment-username-register"
                          type="text"
                          value={values.username}
                          name="username"
                          onBlur={handleBlur}
                          onChange={handleChange}

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
                      <InputLabel htmlFor="outlined-adornment-email-register">Email</InputLabel>
                      <OutlinedInput
                          id="outlined-adornment-email-register"
                          type="email"
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}

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
                      <InputLabel htmlFor="outlined-adornment-phone-register">Phone Number</InputLabel>
                      <OutlinedInput
                          id="outlined-adornment-phone-register"
                          type="phone"
                          value={values.phone}
                          name="phone"
                          onBlur={handleBlur}
                          onChange={handleChange}

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
                    <FormControl fullWidth error={Boolean(touched.role&& errors.role)} >
                      <InputLabel  htmlFor="demo-simple-select-helper-label">Role</InputLabel>
                      <Select
                          labelId="demo-simple-select-helper-label"
                          id="role"
                          name="role"

                          value={values.role}
                          label="Role"
                          onBlur={handleBlur}
                          error={touched.role && Boolean(errors.role)}

                          onChange={handleChange}    >

                        <MenuItem value={"administrateur"}>administrateur</MenuItem>

                        <MenuItem value={"Simple Employer"}>Simple Employer</MenuItem>
                        <MenuItem value={"responsable resource humaine"}>responsable resource humaine</MenuItem>
                      </Select>
                      {touched.role && errors.role && (
                          <FormHelperText error id="standard-weight-helper-text--register">
                            {' '}
                            {errors.role}{' '}
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
                    <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >
                      Edit
                    </Button>
                  </AnimateButton>


                </Box>
              </Card>









            </form>
        )}
      </Formik>
        {console.log("wa sahbi")}
        {console.log(open1.ModalState)}

        {open1.ModalState && (<Passwoed_verify/>)}
    </ThemeConfig>
);
};
export default AccountProfileDetails;
