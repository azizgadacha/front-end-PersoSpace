import React, {Fragment, useState} from 'react';


import configData from '../../../config';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button, Grid,


} from '@material-ui/core';


import axios from 'axios';

// project imports

//use ref ta3mil ref  lil objet   min il react

import AnimateButton from './../../../animation/AnimateButton';



import {useDispatch, useSelector} from "react-redux";

import {CLICK, CLOSE_DELETE_MODAL, ClOSE_EDIT_MODAL, DELETE, LOGOUT, UPDATE} from "../../../store/actions";
import {LoadingButton} from "@material-ui/lab";
import SaveIcon from "@mui/icons-material/Save";
import {useHistory} from "react-router-dom";
import {Cancel, Deleting} from "../../Button/actionButton";

// style constant
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
    }
}));

//===========================|| API JWT - REGISTER ||===========================//

const DeleteWorkspace = (props) => {

    let history =useHistory()

    const [isloading, setIsloading] = useState(false);


    const account = useSelector((state) => state.account);
    //const [openModal,setOpenModal]=useState(false);
    let open = useSelector((state) => state.modal);
    const workspaces = useSelector((state) => state.workspace);
    let location=null
    if(window.location.pathname.includes('html'))
        location=window.location.hash
    else
        location=window.location.pathname

    const dispatcher = useDispatch();
    const Click = () => {
        setIsloading(true)
        let visualise=false
        if(location.includes('VisualizationOfWorkspace')){
            visualise=true
        }else
            visualise=false

        axios
            .post( configData.API_SERVER + 'api/users/deleteworkspace',{
                token:account.token,
                superior_id:props.card._id,
                user_id:account.user._id,
                visualise,
                WorkspaceName:props.card.WorkspaceName,




            })
            .then(response =>{
                if(response.data.notConnected){
                    dispatcher({ type: LOGOUT });
                   history("/login");
                    dispatcher({
                        type:CLICK,
                        payload: {text:"You are no longer connected",severity:"success"}
                    })
                }
                else {
                    if (response.data.success) {

                        dispatcher({
                            type: CLOSE_DELETE_MODAL,
                        })
                        dispatcher({
                            type: DELETE,
                            payload: {work: response.data.workspaceitems}
                        })
                        dispatcher({
                            type: CLICK,
                            payload: {text: "Workspace Removed successfully", severity: "success"}
                        })
                    }
                    else if(response.data.adminstratorProblem){
                        dispatcher({
                            type:UPDATE,
                            payload: {user:response.data.user}
                        });
                        dispatcher({
                            type: CLOSE_DELETE_MODAL,
                        })
                        history.push(configData.defaultPath)

                        setIsloading(false)
                        dispatcher({
                            type:CLICK,
                            payload: {text:'You are no longer an administrator',severity:"error"}
                        });

                    }

                    else{
                        dispatcher({
                            type: CLOSE_DELETE_MODAL,
                        })
                        history.go(0)
                        dispatcher({
                            type: CLICK,
                            payload: {text: "Workspace No Longer Exist", severity: "error"}
                        })
                    }

                }})
            .catch(function (error) {


            })


    };
    return (

        <Fragment>


            <Grid container alignItems={"center"}>
                <Grid xs={6}>
                    <Box
                        sx={


                            {
                                ml:0,
                                mr:3,
                                mt: 2,

                            }}
                    >
                        <AnimateButton>




                            {isloading?(<LoadingButton variant="contained"   fullWidth size="large" loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">{Deleting}</LoadingButton>):
                                <Button
                                    disableElevation
                                    fullWidth
                                    onClick={Click}
                                    type="submit" size="large"
                                    variant="contained"
                                    color="error">{DELETE}</Button>}



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

                            <Button disableElevation size="large" disabled={isloading}                     onClick={props.handleClose}
                                    fullWidth variant="contained" color="secondary">{Cancel}</Button>
                        </AnimateButton>

                    </Box>
                </Grid>

            </Grid>





        </Fragment>













    );
};

export default DeleteWorkspace;
