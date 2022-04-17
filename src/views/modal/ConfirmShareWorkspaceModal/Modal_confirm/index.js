import { filter } from 'lodash';
import React, {Fragment, useEffect, useState} from 'react';

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
    CLICK,
    CLOSE_Confirm_Share_Workspace_MODAL,
    CLOSE_DELETE_MODAL,
    CLOSE_MODAL, CLOSE_MODAL_SHARE, INISIALIZE, INISIALIZE_FILTRED_USER,
    INISIALIZE_USER, OPEN_MODAL_SHARE, USER_DELETE,
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
    let open1 = useSelector((state) => state.modal);

    const handleClose=()=>{
        dispatcher({
            type:CLOSE_Confirm_Share_Workspace_MODAL,
        });
    }
    let {id}=useParams()

    const Click=()=>{
    console.log("1    "   +  props.user._id)
        console.log("2   "   +  props.card._id)
        setIsloading(true)


        axios
            .post( configData.API_SERVER + 'api/users/shareWorkspace',{
                token:account.token,
                card_id:props.card._id,
                user_id:props.user._id,
            })
            .then(response =>{

                {/*dispatcher({
                    type:USER_DELETE,
                    payload: {user:response.data.user}
                })
                */}
                dispatcher({
                    type:CLOSE_Confirm_Share_Workspace_MODAL,

                })

                dispatcher(  {
                    type:CLOSE_MODAL_SHARE,

                })
                let link
                let id1
                if (id) {
                    link = 'api/users/getinsideworkspace'
                    id1=id
                } else {
                    link = 'api/users/getworkspace'
                    id1=account.user._id
                }
                axios
                    .post( configData.API_SERVER + link,{superior_id:id1, token:account.token})
                    .then(response =>{
                        dispatcher({
                                type:INISIALIZE,
                                payload: {work:response.data.workspaceitems}
                            })})
                    .catch(function (error) {
                    })

                dispatcher({
                    type:CLICK,
                    payload: {text:"Workspace has been shared successfully",severity:"success"}
                })




            })
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
