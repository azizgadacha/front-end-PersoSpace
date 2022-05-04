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
import ShareIcon from "@mui/icons-material/Share";
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

            <TableCell component="th" scope="row" padding="none">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar alt={userPar.username}  src={`${configData.API_SERVER}${userPar.photo}`}/>
                    <Typography variant="subtitle2" noWrap>
                        {userPar.username}
                    </Typography>
                </Stack>
            </TableCell>






            <TableCell align="left">
                <Box sx={{ '& button': { m: 1 } }}>

                    <div>
                        <Button onClick={handleClickModal} sx={{width:180}} variant="outlined"  color="info" startIcon={<ShareIcon />}>
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
