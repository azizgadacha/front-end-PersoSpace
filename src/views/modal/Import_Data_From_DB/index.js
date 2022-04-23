import { filter } from 'lodash';
import React, {Fragment, useEffect, useState} from 'react';
// material
import Fade from '@mui/material/Fade';

import {

    Box, Grid, IconButton,

    Modal, useMediaQuery,

} from '@mui/material';
// components
import ThemeConfig from "../../../themes/theme2"




import {useDispatch, useSelector} from "react-redux";
import { CLOSE_MODAL,} from "../../../store/actions";




import {makeStyles} from "@material-ui/styles";
import DataModal from "./DataModal";
import Header from "./Header";
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

    padding:'30px',
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






const Import=  (props) => {

    const dispatcher = useDispatch();




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

                open={true}
                onClose={handleClose}

                closeAfterTransition
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <div style={OVERLAY_Styles}>

                    <Fade in={true}>

                        <Box sx={{...style}}>
                            <IconButton sx={{mt:0,float:'right'}}               label="close">
                                <CloseIcon onClick={handleClose}  color="disabled"      />
                            </IconButton>
                        <ThemeConfig>

                                <Header />


                                    <DataModal />
                        </ThemeConfig>


                        </Box>
                    </Fade>

                </div>

            </Modal>


        </Fragment>
    )
        ;
}
export default Import;
