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

import { CLOSE_MODAL, OPEN_MODAL} from "../../../store/actions";

import AnimateButton from "../../../animation/AnimateButton";

import Password_verify from "../../modal/password_verify_modal";
import _ from "lodash";
import {Edit} from "../../Button/actionButton";



const AccountProfileDetails = (props, { ...others }) => {

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
            role: account.user.role,
            phone: account.user.phone,
            submit: null
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(100,"must contain only 100 digits").required('Email is required'),
            username: Yup.string().required('Username is required').min(6,"must contain minimum 6 digits  "),

            phone: Yup.number().typeError("Must be a number").required('phone number is required').integer("Must be a valid number").positive(),

            role: Yup.string().required('role is required')

          })}
          onSubmit={(values) => {
              setChanged(false)
console.log("hnai")
              console.log(values)
              console.log("sahbi")

             if( _.isEqual(values, {username:account.user.username,phone:account.user.phone,email:account.user.email,role:account.user.role,submit:null}))
                 setChanged(true)
              else {


              console.log("d5alt3.0")


setVal(values)

                      dispatcher({
                          type:OPEN_MODAL,

                      });

          }}

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
                    md={6}
                    xs={12}
                >
                  <Grid item xs={12} >
                    <FormControl fullWidth error={Boolean(touched.username && errors.username)} >
                      <TextField label="username" required variant="outlined"
                          id="outlined-adornment-username-register"
                                 name="username"
                          value={values.username}
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
                      <TextField label="Email" required variant="outlined"
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
                        <TextField label="phone" required variant="outlined"
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

                      {account.user.role=="administrateur"?(
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



                        {/*

                      <InputLabel  htmlFor="demo-simple-select-helper-label">Role</InputLabel>
                      <Select sx={{height:55}}
                          labelId="demo-simple-select-helper-label"
                          id="role"
                          name="role"

                          value={values.role}
                          label="Role"
                          onBlur={handleBlur}
                          error={touched.role && Boolean(errors.role)}

                          onChange={handleChange}    >

                        <MenuItem value={"administrateur"}>administrateur</MenuItem>

                        <MenuItem value={"Simple Employer"}>simple employer</MenuItem>
                      </Select>
                      {touched.role && errors.role && (
                          <FormHelperText error id="standard-weight-helper-text--register">
                            {' '}
                            {errors.role}{' '}
                          </FormHelperText>
                      )}
*/}
                    </FormControl>):null}
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
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >
                        {Edit}
                    </Button>
                  </AnimateButton>


                </Box>
              </Card>









            </form>
        )}
      </Formik>
        {open1.ModalState && (<Password_verify     user={val}/>)}
        {console.log("wa sahbi")}
        {console.log(open1.ModalState)}

    </ThemeConfig>
);
};
export default AccountProfileDetails;
