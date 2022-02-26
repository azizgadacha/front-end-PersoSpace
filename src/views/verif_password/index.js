import React, {useEffect} from 'react';
import {Link as RouterLink, useHistory, useParams} from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports

// style
import AuthWrapper1 from './../../composant_de_style/AuthWrapper1';
import Logo from './../../assets/Logo';
import AuthCardWrapper from './../../composant_de_style/AuthCardWrapper';
import RestVerif from './RestVerif';
import axios from "axios";
import configData from "../../config";


// assets

//================================|| LOGIN MAIN ||================================//

const Login = async() => {
    const theme = useTheme();
    let {token}=useParams()
    let history = useHistory();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
await useEffect(()=>{
    try {
        console.log(token)

        axios
            .post( configData.API_SERVER + 'users/checkValidity', {token
            })
            .then(function (response) {

                if (!response.data.success) {
                    history.push('/login');

                } })
            .catch(function (error) {
                history.push('/login');

            });
    } catch (err) {
        history.push('/login');

    }

},[])
    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
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
                                                     Reinstall password
                                                    </Typography>
                                                    <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                                        Enter your new password
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                         </Grid>
                                     <Grid item xs={12}>
                                        <RestVerif />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                {/*    <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>*/}
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
