import React from 'react';

// material-ui
import { useTheme } from '@material-ui/core';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper1 from './../../composant_de_style/AuthWrapper1';
import AuthCardWrapper from './../../composant_de_style/AuthCardWrapper';
import RestRegister from './RestRegister';

// assets

//===============================|| AUTH3 - REGISTER ||===============================//

const Register = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>*/}

    return (
        <AuthWrapper1 >
            <Grid container direction="column" justifyContent="flex-end" sx={{ maxHeight: '100vh' }}>
                <Grid item xs={6}  >
                    <Grid container justifyContent="center"  alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }} >
                            <AuthCardWrapper >
                                <Grid container spacing={1} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }} >

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
Ajouter un nouveau compte
                                                    </Typography>

                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <RestRegister />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>

                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                </Grid>
            </Grid>
        </AuthWrapper1>

    );
};

export default Register;
