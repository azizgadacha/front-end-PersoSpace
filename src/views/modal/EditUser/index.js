import { filter } from 'lodash';
import React, {Fragment, useEffect, useState} from 'react';
// material
import Fade from '@mui/material/Fade';

import {

    Box,

    Modal,

} from '@mui/material';
// components
import ThemeConfig from "../../../themes/theme2"




import {useDispatch, useSelector} from "react-redux";
import { CLOSE_MODAL,} from "../../../store/actions";



import {

    Grid,
     useMediaQuery,
} from "@material-ui/core";

import {makeStyles} from "@material-ui/styles";
import EditModalCore from "./EditModalCore";
import EditModal from "../EditModal/EditModal";

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

    padding:'50px',
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





const User=  (props) => {





    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const dispatcher = useDispatch();
    let account = useSelector((state) => state.account);
    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_MODAL,
            });
        }
    }, [])
    let open1 = useSelector((state) => state.modal);
    const handleClose=()=>{
        dispatcher({
            type:CLOSE_MODAL,
        });
    }
    return (
        <Fragment>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"

                open={open1.ModalEditState}
                onClose={handleClose}

                closeAfterTransition
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <div style={OVERLAY_Styles}>

                    <Fade in={open1.ModalEditState}>

                        <Box sx={matchDownSM? {width:300,...style}:{width:450,...style} } >
                        <ThemeConfig>

                                <EditModal type={props.type} name={open1.objet.username} />
                                    {console.log("dddddd")}

                                    {console.log(open1.objet)}

                                    <EditModalCore objet={open1.objet} type={props.type}  />
                        </ThemeConfig>


                        </Box>
                    </Fade>

                </div>

            </Modal>


        </Fragment>
    )
        ;
}
export default User;
