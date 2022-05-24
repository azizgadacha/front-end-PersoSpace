import React, {Fragment} from 'react';

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
const Header = (props) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));


    return (






        <Grid container spacing={2} alignItems="center" justifyContent="center" stroke-linecap="round">
            <Grid item xs={12}>

                <Grid
                    container
                    direction={matchDownSM ? 'column-reverse' : 'row'}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item mb={2}>
                        <Stack alignItems="center" justifyContent="center">
                            <Typography
                                color={theme.palette.secondary.main}
                                gutterBottom
                                variant={matchDownSM ? 'h6':matchDownMD?'h4':"h3" }
                            >
                                Password verification
                            </Typography>
                            <Divider />

                            <Typography mt={1} variant="caption" fontSize="16px" textAlign= 'center' >

                            </Typography>
                            <Typography  variant="caption" fontSize="16px" textAlign='center' >
                                To verify your identities please enter your password
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>











    );
};

export default Header;
