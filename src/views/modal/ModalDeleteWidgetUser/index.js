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
import Modal_Delete from "../Modal_delete";
import DeleteModalCore from "./DeleteModal";

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

const useStyles = makeStyles((theme) => ({





    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    },

    root: {
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: "none",


    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },


}));






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

                open={open1.ModalDeleteState}
                onClose={handleClose}

                closeAfterTransition
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <div style={OVERLAY_Styles}>

                    <Fade in={open1.ModalDeleteState}>

                        <Box sx={matchDownSM? {width:300,...style}:{width:450,...style} } >
                        <ThemeConfig>

                                <Modal_Delete  obj={open1.objet} type={props.type} />
                                <Grid container alignItems={"center"}>


                                    <DeleteModalCore obj={open1.objet} type={props.type}  />
                                </Grid>
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
