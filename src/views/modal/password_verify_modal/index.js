import React from 'react';

// material-ui

// project imports
import Header from "./Header"
import RestVerif from "./RestVerif"
import {Grid} from "@mui/material";

// assets

//===============================|| AUTH3 - AddWorkspace ||===============================//
const Modal_Styles ={
    position:'fixed',
    top:'50%',
    left:'45%',
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
const Passwoed_verify = (props) => {


    return (
        <div style={OVERLAY_Styles}>
            <div style={Modal_Styles}>

                <Header  type={"Workspace"} />
                <Grid container alignItems={"center"}>
                    <RestVerif handleClose={props.handleClose} card={props.card}  />
                </Grid>
            </div>

        </div>
    );
};

export default Passwoed_verify;
