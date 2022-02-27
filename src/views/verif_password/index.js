import React, {useEffect, useState} from 'react';
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
import {useDispatch} from "react-redux";
import AuthCardWrapper1 from "../../composant_de_style/AuthCardWrapper1";



// assets

//================================|| LOGIN MAIN ||================================//
const Verification = () => {
    const dispatcher = useDispatch();

    let {token}=useParams()
    let history=useHistory()

    const [success,setSucess]=useState(false)
    const [err,setErr]=useState(true)

    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
useEffect(()=>{
    console.log("3asfour"+token)

    const activationmail=async ()=>{

            console.log("3asfour"+token)
if(!token){

    dispatcher({
        type: "Click",
        payload: {text: "lien invalid", severity: 'error'}
    });

    history.push("/login")

}else
{
        try {
    let result = await axios
        .post(configData.API_SERVER + 'users/validation', {token,})
    setSucess(result.data.success)
    console.log("il ntija hya"+ result.data.success)
    console.log("il ntija hya"+ result)

    if(!result.data.success) {
        dispatcher({
            type: "Click",
            payload: {text: "lien invalid", severity: 'error'}
        });

        history.push("/login")
    }

}catch (err)
{
    console.log("tnekna")

    history.push("/login")
    err.response.data.success&&setErr(err.response.data.success)
}}
    }
   activationmail()

},[])

    return (

        success &&(

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
                            </AuthCardWrapper1>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </AuthWrapper1>
    ));
};

export default Verification;
