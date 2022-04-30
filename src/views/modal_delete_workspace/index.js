import React from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import Modal_Delete from "../modal/Modal_delete"
import DeleteWorkspace from "./DeleteWorkspace";
import {ClickAwayListener} from "@mui/material";
import {CLOSE_DELETE_MODAL} from "../../store/actions";
import {useDispatch} from "react-redux";

// assets

//===============================|| AUTH3 - AddWorkspace ||===============================//
const Modal_Styles ={
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-30%,-50%)',
    backgroundColor:'#FFF',
    padding:'50px',
    zIndex:100
}
const OVERLAY_Styles ={
    position: 'fixed',
    top: 0,
    left: 0,
    right:0,
    bottom:0,
    backgroundColor: 'rgba(0,0,0, .2)',
    zIndex:100

}
const Modal_Delete_Workspace = (props) => {
    const dispatcher = useDispatch();

    function handleClose  () {
        dispatcher({
            type:CLOSE_DELETE_MODAL,

        });
    };

    return (
        <div style={OVERLAY_Styles}>
            <ClickAwayListener onClickAway={handleClose}>

            <div style={Modal_Styles}>

                <Modal_Delete  name={props.card.WorkspaceName} type={"Workspace"} />
         <Grid container alignItems={"center"}>
                <DeleteWorkspace handleClose={props.handleClose} card={props.card}  />
         </Grid>
            </div>
                </ClickAwayListener >

        </div>
    );
};

export default Modal_Delete_Workspace;
