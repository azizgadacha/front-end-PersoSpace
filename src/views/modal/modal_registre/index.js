import React from 'react';

// material-ui
import {useTheme} from '@material-ui/core';
import { Grid,   useMediaQuery } from '@material-ui/core';

// project imports
import DeleteUser from "./DeleteUser";
import {useSelector} from "react-redux";

// assets

//===============================|| AUTH3 - AddWorkspace ||===============================//
const Modal_Styles ={
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)',
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
const RegistreModal = (props) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    let open1 = useSelector((state) => state.modal);


    return (
        <div style={OVERLAY_Styles}>
            <div style={Modal_Styles}>

                {/*                <Header  name={props.user.username} type={"User"} />*/}
         <Grid container alignItems={"center"}>

             {console.log('ffsfsdf')}
             { console.log(open1.ModalState)}

             <DeleteUser   />
         </Grid>
            </div>

        </div>
    );
};

export default RegistreModal;
