import React, {Fragment} from 'react';

// material-ui
import {useTheme} from '@material-ui/core';
import { Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';
import {Divider} from "@mui/material";

// project imports


// assets

//===============================|| AUTH3 - AddWorkspace ||===============================//

const Header = (props) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <Fragment>

            <Grid
                container
                direction={matchDownSM ? 'column-reverse' : 'row'}
                alignItems="center"
                justifyContent="center"
            >
                <Grid item>
                    <Stack alignItems="center" justifyContent="center" spacing={1}>


                        <Typography variant="caption" mt={2} variant={matchDownSM ? 'h6' : 'h6'} textAlign={ 'center' }>
                            Plesse enter the name of the widget
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>









</Fragment>

    );
};

export default Header;
