import { filter } from 'lodash';
import React, {Fragment, useEffect, useState} from 'react';
// material
import Fade from '@mui/material/Fade';

import {

    Box, ClickAwayListener,

    Modal,

} from '@mui/material';
// components
import ThemeConfig from "../../../themes/theme2"




import {useDispatch, useSelector} from "react-redux";
import {CLOSE_DELETE_MODAL, CLOSE_MODAL,} from "../../../store/actions";



import {

    Grid, IconButton,
    useMediaQuery,
} from "@material-ui/core";

import {makeStyles} from "@material-ui/styles";
import Modal_Delete from "../Modal_delete";
import DeleteModalCore from "./DeleteModal";
import DeleteWorkspace from "./DeleteModal";
import CloseIcon from "@mui/icons-material/Close";

// ----------------------------------------------------------------------

const OVERLAY_Styles ={
    position: 'fixed',
    top: 0,
    left: 0,
    right:0,
    bottom:0,
    zIndex:100

}
const style = {

maxWidth:'95%',
    paddingTop:'2px',
    paddingBottom:'40px',
    paddingLeft:'25px',
    paddingRight:'20px',
    zIndex:100,

    borderRadius: 3,

    position: 'absolute',
    top: '50%',
    left: '50%',
    radius:3,
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    border: '0px solid #000',

};

// ----------------------------------------------------------------------




const Modal_Delete_Workspace=  (props) => {


    function handleClose  () {
        dispatcher({
            type:CLOSE_DELETE_MODAL,

        });
    };



    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));











    const dispatcher = useDispatch();

    let account = useSelector((state) => state.account);



    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_DELETE_MODAL,
            });
        }
    }, [])



    let open1 = useSelector((state) => state.modal);






    return (
        <Fragment>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"

                open={open1.ModalDeleteState}
                onClose={handleClose}

                closeAfterTransition
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <div style={OVERLAY_Styles}>
                    <ClickAwayListener onClickAway={handleClose}>

                    <Fade in={open1.ModalDeleteState}>

                        <Box sx={matchDownSM? {width:300,...style}:{width:450,...style} } >
                            <IconButton sx={{float:'right'}}               label="close">
                                <CloseIcon onClick={handleClose}  color="disabled"      />
                            </IconButton>
                            <ThemeConfig>
                            <Modal_Delete  name={props.card.WorkspaceName} type={"Workspace"} />

                                <Grid container alignItems={"center"}>
                                    <DeleteWorkspace handleClose={props.handleClose} card={props.card}  />


                                </Grid>
                        </ThemeConfig>


                        </Box>
                    </Fade>
                        </ClickAwayListener >

                </div>

            </Modal>


        </Fragment>
    )
        ;
}
export default Modal_Delete_Workspace;
