import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {Card, CardContent, useTheme} from '@material-ui/core';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper1 from './../../composant_de_style/AuthWrapper1';
import Logo from './../../assets/Logo';
import RestWorkspace from '../modal/RestWorkspace'
import AuthCardWrapper1 from "../../composant_de_style/AuthCardWrapper1";
import zIndex from "@material-ui/core/styles/zIndex";

// assets

//===============================|| AUTH3 - AddWorkspace ||===============================//
const Modal_Styles ={
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-30%,-50%)',
    backgroundColor:'#FFF',
    padding:'50px',
    zIndex:100
}
const OVERLAY_Styles ={
    position: 'fixed',
    top: 0,
    left: 0,
    right:0,
    bottom:0,
    backgroundColor: 'rgba(0,0,0, .2)',
    zIndex:100

}
const Modal = ({}) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div style={OVERLAY_Styles}>
       <div style={Modal_Styles}>

           <Grid container spacing={2} alignItems="center" justifyContent="center" stroke-linecap="round">
               <Grid item xs={6}>
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
                                   Add Workspace
                               </Typography>
                               <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                   Enter your credentials to continue
                               </Typography>
                           </Stack>
                       </Grid>
                   </Grid>
               </Grid>
               <Grid item xs={6}>
                   <RestWorkspace />
               </Grid>
               <Grid item xs={6}>
                   <Divider />
               </Grid>
           </Grid>

       </div>

        </div>
    );
};

export default Modal;