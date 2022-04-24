
import React, {useEffect, useState} from 'react';
import {OPEN_MODAL, CLOSE_MODAL, CLOSE_DELETE_MODAL,} from '../../../store/actions';
import {IconPlus} from '@tabler/icons';
import {Tooltip,} from '@material-ui/core';
// material-ui
import { makeStyles } from '@material-ui/styles';
import {Avatar, Card, CardContent, Grid, IconButton, Skeleton} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
//
import ModalAdd from '../../modal/Add_Workspace_Modal'

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

    const dispatcher = useDispatch();


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
                    <Grid container  sx={{mt:3.75 ,mb:3.30,ml:12}} onClick={handleClick} alignItems="center" >


                        <Tooltip title="Add Workspace">

                        <IconButton   alt="Add Workspace"   aria-label="close"  >

                        <IconPlus size={100.5}    />
</IconButton>
                        </Tooltip>
                    </Grid>

                </CardContent>
            </Card>

            {open1.ModalState && (<ModalAdd  handleClose={handleClose} />)}




        </React.Fragment>
    );
};

export default PlusCard;
