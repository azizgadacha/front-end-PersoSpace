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
import {styled} from "@mui/material/styles";
import {Card} from "@mui/material";
import ThemeConfig from "../../themes/theme2";


const SectionStyle = styled(Grid)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    margin: theme.spacing(0, 3, 0, 0)


}));
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
    const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
    const matchDownMD= useMediaQuery(theme.breakpoints.down('md'));
    const matchDownXL = useMediaQuery(theme.breakpoints.down('xl'));

    return (
        <React.Fragment>

            <AuthWrapper1>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>


                    <Grid container direction="column" justifyContent="flex-end"  sx={{ minHeight: '100vh' }}>

                        <Grid item xs={12}>

                            <Grid container  justifyContent="center"  alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>

                                <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>

                                    <AuthCardWrapper1>

                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={((matchDownLG||matchDownXL)&&(!matchDownMD))?2:1}>

                                            <SectionStyle sx={{ display: { xs: 'none', md: 'nne',lg:'inline-block' } }}>
                                                <Stack justifyContent="center" spacing={1}>

                                                    <Grid item sx={{ mb: 3,  ml:4,mt:1}} >
                                                        <RouterLink to="#">
                                                            <Logo />

                                                        </RouterLink>
                                                    </Grid>
                                                </Stack>
                                                <Typography variant="h3" sx={{ px: 4, mt: 1.5, mb: 0 }}>
                                                    Manage the job more effectively with Minimal effort
                                                </Typography>
                                                <img alt="login" src="/static/illustrations/illustration_register.png" />


                                            </SectionStyle>

                                            <Grid container spacing={2} alignItems="center" justifyContent="center">



                                                        <Stack alignItems="center" justifyContent="center" spacing={0}>
                                                            <Typography
                                                                color={theme.palette.secondary.main}
                                                                gutterBottom
                                                                variant={matchDownSM ? 'h3' : 'h2'}
                                                            >
                                                                Hi, Welcome
                                                            </Typography>
                                                            <Typography variant="caption" fontSize="16px" >
                                                                Enter your credentials to continue
                                                            </Typography>
                                                        </Stack>
                                                    <RestLogin />

                                                <Grid item xs={12}>

                                                </Grid>
                                            </Grid>
                                        </Stack>

                                    </AuthCardWrapper1>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/*    <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>*/}
                    </Grid>
                </Stack>
            </AuthWrapper1>

            <Snackbar anchorOrigin ={{ vertical:"bottom", horizontal: 'right'}}  open= {open1.open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={open1.severity} sx={{ width: '100%' }}>
                    {open1.text}                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

export default Login;
