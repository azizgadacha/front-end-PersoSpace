import React, {useState} from 'react';


import configData from '../../../config';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button, Grid, useMediaQuery, useTheme,


} from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';


import axios from 'axios';

// project imports

//use ref ta3mil ref  lil objet   min il react

import AnimateButton from '../../../animation/AnimateButton';



import {useDispatch, useSelector} from "react-redux";

import {CLICK, CLOSE_DELETE_MODAL, DELETE, DELETE_USER, USER_DELETE} from "../../../store/actions";
import {LoadingButton} from "@material-ui/lab";
import {Cancel, Delete, Deleting} from "../../Button/actionButton";

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

const DeleteUser = (props) => {


    const [isloading, setIsloading] = useState(false);
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


            })
            .catch(function (error) {


            })


    };


    return (
        <React.Fragment>



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
                                    color="error">{Delete} </Button>}



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

                            <Button disableElevation size="large"  onClick={props.handleClose} fullWidth variant="contained" color="secondary">{Cancel}</Button>
                        </AnimateButton>

                    </Box>
                </Grid>

            </Grid>





</React.Fragment>
    );
};

export default DeleteUser;
