import React from 'react';

// material-ui
import {useTheme} from '@material-ui/core';
import { Grid,   useMediaQuery } from '@material-ui/core';

// project imports

import ConfirmShareWorkspace from "./ConfirmShareWorkspace";
import Modal_confirm from "./Modal_confirm";

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


const Modal_Delete_User = (props) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <div style={OVERLAY_Styles}>
            {/*<div style={Modal_Styles}>*/}
                <Modal_confirm name={props.user.username} type={"User"} />

                {/*<Grid container alignItems={"center"}>
                <ConfirmShareWorkspace handleClose={props.handleClose} user={props.user}  />
         </Grid>
         */}

        </div>
    );
};

export default Modal_Delete_User;
