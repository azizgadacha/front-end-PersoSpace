import { filter } from 'lodash';
import React, {Fragment, useEffect, useState} from 'react';
import {io} from "socket.io-client";



// material
import Fade from '@mui/material/Fade';

import {
    Box, Grid,
    Modal, Stack, Typography,
} from '@mui/material';
// components
import ThemeConfig from "../../../../themes/theme2"


import Backdrop from '@mui/material/Backdrop';



import {useDispatch, useSelector} from "react-redux";
import {
    ADD_USER,
    CLICK, CLICKED_INISIALIZE,
    CLOSE_Confirm_Share_Workspace_MODAL,
    CLOSE_DELETE_MODAL,
    CLOSE_MODAL, CLOSE_MODAL_SHARE, INISIALIZE, INISIALIZE_FILTRED_USER,
    INISIALIZE_USER, LOGOUT, OPEN_MODAL_SHARE, USER_DELETE,
} from "../../../../store/actions";

import {useHistory, useParams} from "react-router-dom";


import {
    Button,
    useMediaQuery, useTheme
} from "@material-ui/core";

import useScriptRef from "../../../../hooks/useScriptRef";
import {makeStyles} from "@material-ui/styles";
import {LoadingButton} from "@material-ui/lab";
import SaveIcon from "@mui/icons-material/Save";
import AnimateButton from "../../../../animation/AnimateButton";
import axios from "axios";
import configData from "../../../../config";


// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

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






const Modal_confirm=  (props) => {
    const [isloading, setIsloading] = useState(false);

    const states = [
        {
            value: 'administrateur',
            label: 'administrateur'
        },
        {
            value: 'simple employer',
            label: 'simple employer'
        },

    ];
    const classes = useStyles();
    let history = useHistory();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));









    const dispatcher = useDispatch();
    let account = useSelector((state) => state.account);
    let socket = useSelector((state) => state.socket);

    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_MODAL,
            });
        }
    }, [])


    const theme = useTheme();
    let open1 = useSelector((state) => state.modal);

    const handleClose=()=>{
        dispatcher({
            type:CLOSE_Confirm_Share_Workspace_MODAL,
        });
    }
    let loc=window.location.pathname


    let array=loc.split("/")


    const ar2 = array.slice(3, (array.length));

    const Click=()=>{
        setIsloading(true)

        axios
            .post( configData.API_SERVER + 'api/users/shareWorkspace',{
                token:account.token,
                card_id:props.card._id,
                user_id:props.user._id,
                user_username:account.user._id
            })
            .then(response =>{
                if(response.data.notConnected){
                    dispatcher({ type: LOGOUT });
                    history.push("/login");
                    dispatcher({
                        type:CLICK,
                        payload: {text:"You are no longer connected",severity:"error"}
                    })
                }
                else
                {
                    if (response.data.success) {

                    dispatcher({
                        type: CLOSE_Confirm_Share_Workspace_MODAL,

                    })

                    dispatcher({
                        type: CLOSE_MODAL_SHARE,

                    })

                    dispatcher({
                        type: INISIALIZE_FILTRED_USER,
                        payload: {card: props.card, userId: props.user._id}
                    })

                    console.log("AIDMUBAREK")
                    console.log(props.card.Share)
                    dispatcher({
                        type: CLICK,
                        payload: {text: "Workspace has been shared successfully", severity: "success"}
                    })

                    try {
                        axios
                            .post(configData.API_SERVER + 'api/users/addNotification', {
                                token: account.token,
                                receiver: props.user._id,
                                sender: account.user._id,
                                type: "shared",
                                read: false,
                                text: ` has shared ${props.card.WorkspaceName} with you`
                            }).then((response) => {

                            socket.socket.emit("send_Notification", {
                                notification: response.data.notification,
                                UserId: props.user._id,
                                User: account.user
                            })

                        })
                    } catch (e) {

                    }
                }

            else
                    {
                        dispatcher({
                            type: CLOSE_Confirm_Share_Workspace_MODAL,

                        })

                        dispatcher({
                            type: CLOSE_MODAL_SHARE,

                        })
                        history.go(0)
                        dispatcher({
                            type: CLICK,
                            payload: {text: "Workspace already Shared With this User", severity: "error"}
                        })
                    }}})
            .catch(function (error) {


            })

    };






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
                                <Grid container spacing={2} alignItems="center" justifyContent="center" stroke-linecap="round">
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Share Workspace
                                                    </Typography>
                                                    <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                                        Are you sure to Share this Workspace with {props.name} ?
                                                    </Typography>
                                                </Stack>


                                            </Grid>
                                            <Box
                                                sx={{
                                                    mt: 2,
                                                    marginRight:2,
                                                    marginLeft:5
                                                }}
                                            >
                                                <AnimateButton>
                                                    {isloading?(<LoadingButton variant="contained" sx={{width:118}}  size="large" loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">SHARING</LoadingButton>): <Button sx={{width:118}}disableElevation fullWidth size="large" type="submit" variant="contained" onClick={Click} color="error">Share</Button>}



                                                </AnimateButton>

                                            </Box>
                                            <Box
                                                sx={{
                                                    mt: 2,
                                                    marginLeft:2
                                                }}
                                            >
                                                <AnimateButton>

                                                    <Button disableElevation sx={{width:118}} size="large" onClick={handleClose} variant="contained" color="secondary">Cancel</Button>
                                                </AnimateButton>

                                            </Box>
                                        </Grid>
                                    </Grid>
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
export default Modal_confirm;
