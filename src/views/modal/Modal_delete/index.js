import React from 'react';

// material-ui
import {useTheme} from '@material-ui/core';
import { Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';
import {Divider} from "@mui/material";

// project imports


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
const Modal_Delete = (props) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));


    return (
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
                                variant={matchDownSM ? 'h3' : 'h3'}
                            >
                                Delete {props.type}
                            </Typography>
                            <Divider />

                            <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                Are you sure to delete {props.type=="User"?props.obj.username: props.type=="Widget"?props.obj.WidgetName:props.name} ?
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
};

export default Modal_Delete;
