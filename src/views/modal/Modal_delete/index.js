import React from 'react';

// material-ui
import {useTheme} from '@material-ui/core';
import { Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports


// assets

//===============================|| AUTH3 - AddWorkspace ||===============================//

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
