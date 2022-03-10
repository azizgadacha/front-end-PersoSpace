import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {Snackbar, useTheme} from '@material-ui/core';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports

// style
import AuthWrapper1 from './../../composant_de_style/AuthWrapper1';
import Logo from './../../assets/Logo';
import RestLogin from './RestLogin';

import AuthCardWrapper1 from "../../composant_de_style/AuthCardWrapper1";

import {Alert} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";



// assets

//================================|| LOGIN MAIN ||================================//

const Login = () => {
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
<React.Fragment>

        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper1>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <RouterLink to="#">
                                            <Logo />
                                        </RouterLink>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Hi, Welcome Back
                                                    </Typography>
                                                    <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                         </Grid>
                                     <Grid item xs={12}>
                                        <RestLogin />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper1>
                        </Grid>
                    </Grid>
                </Grid>
                {/*    <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>*/}
            </Grid>
        </AuthWrapper1>
    {console.log(open1)}
    <Snackbar anchorOrigin ={{ vertical:"bottom", horizontal: 'right'}}  open= {open1.open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={open1.severity} sx={{ width: '100%' }}>
            {open1.text}                </Alert>
    </Snackbar>
</React.Fragment>
    );
};

export default Login;
