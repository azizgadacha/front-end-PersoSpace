import React, {Fragment} from 'react';

// material-ui
import {
    Button,
    FormControl,
    FormHelperText,
    IconButton, InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select, Snackbar,
    useTheme
} from '@material-ui/core';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

// project imports

import AccountProfile from "./account-profile";
import AccountProfileDetails from "./account-profile-details";
import {Avatar, Box, Container, Stack} from "@mui/material";
import ThemeConfig from "../../../themes/theme2";
import {Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import configData from "../../../config";
import {ADD_USER, CLICK} from "../../../store/actions";
import config from "../../../config";
import {gridSpacing} from "../../../store/constant";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {Alert} from "@material-ui/lab";
import AnimateButton from "../../../animation/AnimateButton";
import {useDispatch, useSelector} from "react-redux";


// assets

//===============================|| AUTH3 - REGISTER ||===============================//

const Profile = () => {
    let open1 = useSelector((state) => state.snack);

    const dispatcher = useDispatch();



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatcher({
            type:"Close"
        });

    };


    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Fragment>


            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                    >
                        Account
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={4}
                            md={5}
                            xs={12}
                        >
                            <AccountProfile />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={7}
                            xs={12}
                        >
                            <AccountProfileDetails />
                        </Grid>
                    </Grid>
                </Container>
            </Box>





<ThemeConfig>


            <Snackbar anchorOrigin ={{ vertical:"bottom", horizontal: 'right'}}  open= {open1.open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={open1.severity} sx={{ width: '100%' }}>
                    {open1.text}                </Alert>
            </Snackbar>
</ThemeConfig>









        </Fragment>

    );
};

export default Profile;
