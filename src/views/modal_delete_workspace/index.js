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
import DeleteWorkspace from "./DeleteWorkspace";

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
const Modal_Delete_Workspace = (props) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <div style={OVERLAY_Styles}>
            <div style={Modal_Styles}>

                <Grid container spacing={2} alignItems="center" justifyContent="center" stroke-linecap="round">
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
                                        Delete Workspace
                                    </Typography>
                                    <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                        Are you sure to delete this workspace ?
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
         <Grid container alignItems={"center"}>
                <DeleteWorkspace handleClose={props.handleClose} card={props.card}  />
         </Grid>
            </div>

        </div>
    );
};

export default Modal_Delete_Workspace;
