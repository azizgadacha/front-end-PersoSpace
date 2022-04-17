import { filter } from 'lodash';
import React, {Fragment,  useState} from 'react';
// material
import {
    Stack,

    Typography,
    Box, TableCell,  Avatar, Button,
} from '@mui/material';


import {useDispatch, useSelector} from "react-redux";
import {

    Confirm_Share_Workspace_MODAL,

} from "../../../store/actions";
import EditIcon from "@mui/icons-material/Edit";
import configData from "../../../config";

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------







const Cells=  ({userPar}) => {



    const dispatcher = useDispatch();

    const handleClickModal = () => {

        dispatcher({
            type:Confirm_Share_Workspace_MODAL,
            payload: {objet:userPar}
        })}






    return ( <Fragment>





            <TableCell align="left">{userPar.role}</TableCell>





        </Fragment>

    )
        ;
}
export default Cells;
