import { filter } from 'lodash';
import React, {Fragment,  useState} from 'react';
// material
import {
    Stack,

    Typography,
    Box, TableCell,  Avatar, Button,
} from '@mui/material';


import {useDispatch, useSelector} from "react-redux";
import {CLOSE_DELETE_MODAL, DELETE, OPEN_DELETE_MODAL, OPEN_EDIT_MODAL} from "../../../store/actions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import configData from "../../../config";

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------







const Cells=  ({userPar}) => {



    const dispatcher = useDispatch();



    const handleClickEditModal = () => {

        dispatcher({
            type:OPEN_EDIT_MODAL,
            payload: {objet:userPar}
        })}


    const handleClickModal = () => {

        dispatcher({
            type:OPEN_DELETE_MODAL,
            payload: {objet:userPar}
        })}






    return ( <Fragment>

            <TableCell component="th" scope="row" padding="none">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar alt={userPar.username}  src={`${configData.API_SERVER}${userPar.photo}`}/>
                    <Typography variant="subtitle2" noWrap>
                        {userPar.username}
                    </Typography>
                </Stack>
            </TableCell>


            <TableCell align="left">{userPar.email}</TableCell>
            <TableCell align="left">{userPar.phone}</TableCell>

            <TableCell align="left">{userPar.role}</TableCell>




            <TableCell align="left">
                <Box sx={{ '& button': { m: 1 } }}>

                    <div>
                        <Button  sx={{width:180}} variant="outlined"  color="info" startIcon={<EditIcon />}>
                            Share Workspace
                        </Button>
                    </div>
                </Box>


            </TableCell>
        </Fragment>

    )
        ;
}
export default Cells;
