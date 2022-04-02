import React, {useEffect} from 'react';

// material-ui

// project imports
import RestPass from "./RestPass"
import Header from "./Header"
import {Grid} from "@mui/material";
import {CLOSE_MODAL} from "../../../store/actions";
import {useDispatch} from "react-redux";

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
const PassChange = (props) => {
    const dispatcher = useDispatch();

    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_MODAL,

            });
        }
    }, [])

    return (
        <div style={OVERLAY_Styles}>
            <div style={Modal_Styles}>

                <Header  type={"Workspace"} />
                <Grid container alignItems={"center"}>

                    <RestPass  user={props.user}  />
                </Grid>
            </div>

        </div>
    );
};

export default PassChange;
