import { filter } from 'lodash';
import React, {Fragment, useEffect, useState} from 'react';
import {io} from "socket.io-client";



// material
import Fade from '@mui/material/Fade';

import {
    Box, ClickAwayListener, Grid,
    Modal, Stack, Typography,
} from '@mui/material';
// components
import ThemeConfig from "../../../themes/theme2"


import Backdrop from '@mui/material/Backdrop';



import {useDispatch, useSelector} from "react-redux";
import {
    CLICK,
    CLOSE_Confirm_Share_Workspace_MODAL,
    CLOSE_MODAL, CLOSE_MODAL_SHARE, INISIALIZE_FILTRED_USER,
     LOGOUT,
} from "../../../store/actions";

import {useHistory, useParams} from "react-router-dom";


import {
    Button,
    useMediaQuery, useTheme
} from "@material-ui/core";

import {makeStyles} from "@material-ui/styles";
import {LoadingButton} from "@material-ui/lab";
import SaveIcon from "@mui/icons-material/Save";
import AnimateButton from "../../../animation/AnimateButton";
import axios from "axios";
import configData from "../../../config";
import {Cancel, Change, Changing, Share, SHARE, Sharing} from "../../Button/actionButton";


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

// ----------------------------------------------------------------------








const Modal_confirm=  (props) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    const [isloading, setIsloading] = useState(false);
let maxWidth="90%"
let minWidth=matchDownMD?"70%":"35%"
    const style = {
        maxWidth,
        minWidth,
        padding:'50px',
        zIndex:100,

        borderRadius: 2,


        position: 'absolute',
        top: '50%',
        left: '50%',
        radius:3,
        transform: 'translate(-50%, -50%)',

        bgcolor: 'background.paper',
        border: '0px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    let history = useHistory();









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

                dispatcher({
                    type:CLOSE_Confirm_Share_Workspace_MODAL,

                })

                dispatcher(  {
                    type:CLOSE_MODAL_SHARE,

                })

                dispatcher({
                    type:INISIALIZE_FILTRED_USER,
                    payload:{card:props.card,userId:props.user._id}
                })

                console.log("AIDMUBAREK")
                console.log(props.card.Share)
                dispatcher({
                    type:CLICK,
                    payload: {text:"Workspace has been shared successfully",severity:"success"}
                })

                try {
                    axios
                        .post( configData.API_SERVER + 'api/users/addNotification',{
                            token:account.token,
                            receiver:props.user._id,
                            sender:account.user._id,
                            type:"shared",
                            read:false,
                            text: ` has shared ${props.card.WorkspaceName} with you`
                        }).then((response)=>{

                        socket.socket.emit("send_Notification",{notification:response.data.notification,UserId:props.user._id,User:account.user})

                        })
                }catch (e) {

                }




            }})
            .catch(function (error) {


            })

    };






    return (
        <Fragment>
            {console.log(matchDownMD)}
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
                    <ClickAwayListener onClickAway={handleClose}>

                    <Fade in={open1.ModalStateShare}>

                        <Box sx={{ ...style,  }} >
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
                                                        align="center"
                                                    >
                                                        Confirmm Share
                                                    </Typography>
                                                    <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''} align="center">
                                                        Are you sure to Share this Workspace with {props.name} ?
                                                    </Typography>
                                                </Stack>

                                            </Grid>

                                            <Grid container alignItems={"center"}>
                                                <Grid xs={6}>
                                                    <Box
                                                        sx={{
                                                            mr:1,
                                                            mt: 2,

                                                        }}
                                                    >



                                                        <AnimateButton>
                                                            {isloading?(<LoadingButton variant="contained"   fullWidth size="large" loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">{Sharing}</LoadingButton>):
                                                                <Button
                                                                    disableElevation
                                                                    fullWidth
                                                                    onClick={Click}
                                                                    type="submit" size="large"
                                                                    variant="contained"
                                                                    color="secondary">{Share}</Button>}



                                                        </AnimateButton>

                                                    </Box>
                                                </Grid>
                                                <Grid xs={6}>

                                                    <Box
                                                        sx={{
                                                            mt: 2,
                                                            marginLeft:1
                                                        }}
                                                    >
                                                        <AnimateButton>

                                                            <Button disableElevation  disabled={isloading} size="large"  onClick={handleClose} fullWidth variant="contained" color="error">{Cancel}</Button>
                                                        </AnimateButton>

                                                    </Box>
                                                </Grid>

                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>

                            </ThemeConfig>
                        </Box>

                    </Fade>
                    </ClickAwayListener>
                </div>


            </Modal>


        </Fragment>
    )
        ;
}
export default Modal_confirm;
