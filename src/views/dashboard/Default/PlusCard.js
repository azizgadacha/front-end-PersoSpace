
import React, {useEffect, useState} from 'react';
import {OPEN_MODAL, CLOSE_MODAL, CLOSE_DELETE_MODAL,} from '../../../store/actions';
import {IconPlus} from '@tabler/icons';
import {Tooltip, useMediaQuery, useTheme,} from '@material-ui/core';
// material-ui
import { makeStyles } from '@material-ui/styles';
import {Avatar, Card, CardContent, Grid, IconButton, Skeleton} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
//
import ModalAdd from '../../modal/Add_Workspace_Modal'
import {Stack} from "@mui/material";

// style constant
const useStyles = makeStyles({
    cardHeading: {
        marginRight: '8px',
        marginTop: '18px',
        marginBottom: '14px'
    }
});

//-----------------------|| SKELETON EARNING CARD ||-----------------------//

const PlusCard = () => {
    const theme = useTheme();

    const dispatcher = useDispatch();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));


    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_MODAL,

            });
        }
    }, [])
    const classes = useStyles();
    let open1 = useSelector((state) => state.modal);


    const handleClick = () => {
        dispatcher({
            type:OPEN_MODAL,

        });
    };

    function handleClose  () {
        dispatcher({
            type:CLOSE_MODAL,

        });
    };

    return (


        <React.Fragment>
            <Card>
                <CardContent>


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

                    <Grid container  sx={{mt:2.8 ,mb:2.30}} onClick={handleClick} alignItems="center" >


                        <Tooltip title="Add Workspace">
                            <Grid container alignItems="center" >

                        <IconButton   alt="Add Workspace"   aria-label="close"  >

                        <IconPlus size={100.5}    />
</IconButton>
                            </Grid>
                        </Tooltip>
                    </Grid>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {open1.ModalState && (<ModalAdd  handleClose={handleClose} />)}




        </React.Fragment>
    );
};

export default PlusCard;
