import { filter } from 'lodash';
import React, {Fragment, useEffect, useState} from 'react';

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
    ADD_USER,
    CLICK, CLICKED_INISIALIZE, CLOSE_Confirm_Remove_Share_MODAL,
    CLOSE_Confirm_Share_Workspace_MODAL,
    CLOSE_DELETE_MODAL, ClOSE_EDIT_MODAL,
    CLOSE_MODAL, CLOSE_MODAL_REMOVE, CLOSE_MODAL_SHARE, INISIALIZE, INISIALIZE_FILTRED_USER, INISIALIZE_SHARED_USER,
    INISIALIZE_USER, LOGOUT, OPEN_MODAL_SHARE, UPDATE, UPDATE_WORKSPACE, USER_DELETE,
} from "../../../store/actions";

import {useHistory, useParams} from "react-router-dom";


import {
    Button,
    useMediaQuery, useTheme
} from "@material-ui/core";

import useScriptRef from "../../../hooks/useScriptRef";
import {makeStyles} from "@material-ui/styles";
import {LoadingButton} from "@material-ui/lab";
import SaveIcon from "@mui/icons-material/Save";
import AnimateButton from "../../../animation/AnimateButton";
import axios from "axios";
import configData from "../../../config";
import {Cancel, Remove, Removing, Share, Sharing} from "../../Button/actionButton";


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
    minWidth:"310px",
    maxWidth:"95%",
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

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({


    modal:{
        position: 'absolute',
        top: '50%',
        left: '50%',

        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '1px solid #000',
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
    const [source, setSource] = React.useState("/static/images/avatar_1.png");
    const classes = useStyles();
    let history = useHistory();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [showPassword, setShowPassword] = React.useState(false);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');



    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('username');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);


    let userSt= useSelector((state) => state.user);
    let open1 = useSelector((state) => state.modal);
    let socket = useSelector((state) => state.socket);






    let open = useSelector((state) => state.modal);
    function handleCloseModal  () {
        dispatcher({
            type:CLOSE_DELETE_MODAL,

        });
    };


    const [open5, setOpen5] = React.useState(false);
    const dispatcher = useDispatch();
    let account = useSelector((state) => state.account);

    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_MODAL,
            });
        }
    }, [])


    const theme = useTheme();
    let location=null
    if(window.location.pathname.includes('html'))
        location=window.location.hash
    else
        location=window.location.pathname
    const handleClose=()=>{
        dispatcher({
            type:CLOSE_Confirm_Remove_Share_MODAL,
        });
    }
    let {id}=useParams()
    let workspaces = useSelector((state) => state.workspace);
    let loc=window.location.pathname


    let array=loc.split("/")


    const ar2 = array.slice(3, (array.length));

    let link2=ar2.join('/')

    let link
    let id1
    let datasend
    const Click=()=>{
        setIsloading(true)
        let visualise=false
        if(location.includes('VisualizationOfWorkspace')){
            visualise=true
        }else
            visualise=false
//la liaison entre la partie front et la partie back se fait ?? travers ce bout de code durant lequel il y'aura l'envoie des donn??es a utilis?? et le type du m??thode du contoller souhait??

        axios
            .post( configData.API_SERVER + 'api/Workspace/removeShare',{
                token:account.token,
                card_id:props.card._id,
                visualise,
                user_id:props.user._id,
                owner_id:account.user._id
            })
            .then(response =>{
                if(response.data.notConnected) {
                    dispatcher({type: LOGOUT});
                    history.push("/login");
                }
                else {
                    if (response.data.success) {
                        dispatcher({
                            type:UPDATE_WORKSPACE,
                            payload: {work:response.data.Workspace}
                        })
                        dispatcher({
                            type:INISIALIZE_SHARED_USER,
                            payload:{card:props.card}
                        })
                        dispatcher({
                            type: CLOSE_Confirm_Remove_Share_MODAL,

                        })

                        dispatcher({
                            type: CLOSE_MODAL_REMOVE,

                        })


                        dispatcher({
                            type: CLICK,
                            payload: {text: "User has been Removed successfully", severity: "success"}
                        })

                        if (response.data.notification)
                        socket.socket.emit("RemoveShareNotification",{NotificationListe:[response.data.notification]})


                    }
                    else if(response.data.adminstratorProblem){
                        dispatcher({
                            type:UPDATE,
                            payload: {user:response.data.user}
                        });
                        dispatcher({
                            type: CLOSE_Confirm_Remove_Share_MODAL,

                        })
                        dispatcher({
                            type: CLOSE_MODAL_REMOVE,
                        });

                        history.push(configData.defaultPath)

                        setIsloading(false)
                        dispatcher({
                            type:CLICK,
                            payload: {text:'You are no longer an administrator',severity:"error"}
                        });

                    }else {
                        dispatcher({
                            type: CLOSE_Confirm_Remove_Share_MODAL,

                        })
                        dispatcher({
                            type: CLOSE_MODAL_REMOVE,
                        });

                        history.go(0)

                        dispatcher({
                            type: CLICK,
                            payload: {text: 'User Already has been removed from this Workspace', severity: "error"}
                        });

                    }
                }


            })
            .catch(function (error) {


            })

    };






    return (
        <Fragment>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"

                open={open1.ModalStateRemove}
                onClose={handleClose}

                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <div style={OVERLAY_Styles}>
                    <ClickAwayListener onClickAway={handleClose}>

                    <Fade in={open1.ModalStateRemove}>

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
                                                        Remove Share
                                                    </Typography>
                                                    <Stack alignItems="center" justifyContent="center" spacing={1}>

                                                        <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''} align="center">
                                                        Are you sure to Remove Share for {props.user.username} from {props.card.WorkspaceName} ?
                                                    </Typography>
                                                    </Stack>
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
                                                            {isloading?(<LoadingButton variant="contained"   fullWidth size="large" loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">{Removing}</LoadingButton>):
                                                                <Button
                                                                    disableElevation
                                                                    fullWidth
                                                                    onClick={Click}
                                                                    type="submit" size="large"
                                                                    variant="contained"
                                                                    color="secondary">{Remove}</Button>}



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
