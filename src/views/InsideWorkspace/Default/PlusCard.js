import React, {useEffect, useState} from 'react';
import { OPEN_MODAL, CLOSE_MODAL,  } from '../../../store/actions';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {Avatar, Card, CardContent, Grid, IconButton, Skeleton} from '@material-ui/core';
import EarningIcon from '../../../assets/images/icons/earning.svg';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import { MENU_OPEN } from '../../../store/actions';
//
import Modal from '../../modal/Add_InsideWorkspace'
import {IconPlus} from "@tabler/icons";

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




    const classes = useStyles();
    let open1 = useSelector((state) => state.modal);

    const dispatcher = useDispatch();

    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_MODAL,

            });
        }
    }, [])

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
                <IconButton     aria-label="close"  >

                    <IconPlus size={100.5}    />
                </IconButton>
            </Grid>

        </CardContent>
    </Card>

    {open1.ModalState && (<Modal  handleClose={handleClose} />)}




</React.Fragment>
    );
};

export default PlusCard;
