import { filter } from 'lodash';
import React, {Fragment, useEffect, useState} from 'react';
// material
import Fade from '@mui/material/Fade';

import {

    Box, ClickAwayListener, Divider,

    Modal,

} from '@mui/material';
// components
import ThemeConfig from "../../../themes/theme2"




import {useDispatch, useSelector} from "react-redux";
import {CLOSE_DELETE_MODAL, CLOSE_MODAL,} from "../../../store/actions";



import {

    Grid,
     useMediaQuery,
} from "@material-ui/core";

import {makeStyles} from "@material-ui/styles";

import Header from "./Header";
import RestPass from "./RestPass";

// ----------------------------------------------------------------------

const OVERLAY_Styles ={
    position: 'fixed',
    top: 0,
    left: 0,
    right:0,
    bottom:0,
    zIndex:100

}


// ----------------------------------------------------------------------




const User=  (props) => {


    const style = {
maxWidth:'100%',
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

    const handleCloseModal = ()=> {

            dispatcher({
                type:CLOSE_MODAL,
            });

    };




    return (
        <Fragment>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"

                open={open1.ModalState}
                onClose={handleCloseModal}

                closeAfterTransition
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <div style={OVERLAY_Styles}>
                    <ClickAwayListener onClickAway={handleCloseModal}>

                    <Fade in={open1.ModalState}>

                        <Box sx={matchDownSM? {...style}:{...style} } >
                        <ThemeConfig>

                            <Header   />

                            <Grid alignItems="center" justifyContent="center" >


                                    <RestPass  user={props.user}  file={props.file} />
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
export default User;
