import { useHistory} from "react-router-dom";

import { filter } from 'lodash';
import React, {Fragment,  useState} from 'react';
// material
import {
    Stack,

    Typography,
    Box, TableCell,  Avatar, Button,
} from '@mui/material';

import configData from "../../config";

import {useDispatch, useSelector} from "react-redux";
import {
    CLOSE_DELETE_MODAL,
    DELETE,
    OPEN_DELETE_MODAL,
    OPEN_EDIT_MODAL,
    OPEN_MODAL_INFORMATION
} from "../../store/actions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useMediaQuery, useTheme} from "@material-ui/core";
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------







const Cells=  ({userPar}) => {



    const dispatcher = useDispatch();


    let history = useHistory();



    const handleViewModal = () => {
        dispatcher({
            type:OPEN_MODAL_INFORMATION,
            payload: {user:userPar}
        })

    }


    const handleClickEditModal = () => {

        dispatcher({
            type:OPEN_EDIT_MODAL,
            payload: {objet:userPar}
        })


    }


    const handleClickModal = () => {

        dispatcher({
            type:OPEN_DELETE_MODAL,
            payload: {objet:userPar}
        })}
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
    const matchDownMD= useMediaQuery(theme.breakpoints.down('md'));
    const matchDownXL = useMediaQuery(theme.breakpoints.down('xl'));





    return ( <Fragment>

            <TableCell sx={{minWidth:"100%"}} component="th" scope="row" padding="none">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar alt={userPar.username}  src={`${configData.API_SERVER}${userPar.photo}`}/>
                    <Typography variant="subtitle2" noWrap>
                        {userPar.username}
                    </Typography>
                </Stack>
            </TableCell>





            <TableCell align="left" sx={{minWidth:"100%"}}>
                <Stack sx={{mr:2}} direction="column"  justifyContent="space-between" >


                    <Button sx={{mb:1}}  onClick={handleClickEditModal}  variant="outlined"  color="info" >
                        <EditIcon />
                    </Button>
                    <Button  sx={{mb:1}} onClick={handleClickModal} variant="outlined" color="error"  >
                        <DeleteIcon />

                    </Button>
                    <Button   variant="outlined"  sx={{mb:1}} onClick={handleViewModal} color="info"  >
                        <VisibilityIcon />

                    </Button>

                </Stack>


            </TableCell>
        </Fragment>

    )
        ;
}
export default Cells;