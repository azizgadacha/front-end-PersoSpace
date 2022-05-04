import React, {useState,Fragment} from 'react';


import configData from '../../../config';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,


} from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';


import axios from 'axios';

// project imports

//use ref ta3mil ref  lil objet   min il react

import AnimateButton from './../../../animation/AnimateButton';



import {useDispatch, useSelector} from "react-redux";

import {CLICK, CLOSE_DELETE_MODAL, CLOSE_MODAL, DELETE, DELETE_USER, LOGOUT, USER_DELETE} from "../../../store/actions";
import {LoadingButton} from "@material-ui/lab";
import Backdrop from "@mui/material/Backdrop";
import {Fade, Modal} from "@mui/material";
import ThemeConfig from "../../../themes/theme2";
import {useHistory} from "react-router-dom";

// style constant
const OVERLAY_Styles ={
    position: 'fixed',
    top: 0,
    left: 0,
    right:0,
    bottom:0,
    backgroundColor: 'rgba(0,0,0, .2)',
    zIndex:100

}
const style = {

    padding:'50px',
    zIndex:100,

    borderRadius: 5,


    position: 'absolute',
    top: '50%',
    left: '50%',
    radius:3,
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const useStyles = makeStyles((theme) => ({


    modal:{
        position: 'absolute',
        top: '50%',
        left: '50%',

        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,



    },


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



//===========================|| API JWT - REGISTER ||===========================//

const ConfirmShareWorkspace = (props) => {


    const [isloading, setIsloading] = useState(false);
    const classes = useStyles();
    let history =useHistory()
    const account = useSelector((state) => state.account);
    //const [openModal,setOpenModal]=useState(false);
    const dispatcher = useDispatch();
    const Click = () => {
        setIsloading(true)



        axios
            .post( configData.API_SERVER + 'api/users/deleteUser',{
                token:account.token,
                user_id:props.user._id,
            })
            .then(response =>{
                if(response.data.notConnected){
                    dispatcher({ type: LOGOUT });
                    history.push("/login");
                    dispatcher({
                        type:CLICK,
                        payload: {text:"You are no longer connected",severity:"success"}
                    })
                }
                else
                {


                dispatcher({
                    type:USER_DELETE,
                    payload: {user:response.data.user}
                })
                dispatcher({
                    type:CLOSE_DELETE_MODAL,
                })










                dispatcher({
                    type:CLICK,
                    payload: {text:"User has been deleted",severity:"success"}
                })


            }})
            .catch(function (error) {


            })


    };
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

                open={open1.ModalStateShare}
                onClose={handleClose}

                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <div style={OVERLAY_Styles}>

                    <Fade in={open1.ModalStateShare}>

                        <Box sx={{ ...style,  }} className={classes.modal}>
                            <ThemeConfig>
                            </ThemeConfig>
                        </Box>
                    </Fade>

                </div>

            </Modal>


        </Fragment>
    );
};

export default ConfirmShareWorkspace;
