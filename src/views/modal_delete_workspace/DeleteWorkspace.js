import React from 'react';


import configData from '../../config';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,


} from '@material-ui/core';


import axios from 'axios';

// project imports

//use ref ta3mil ref  lil objet   min il react

import AnimateButton from './../../animation/AnimateButton';



import {useDispatch, useSelector} from "react-redux";

import {CLICK, CLOSE_DELETE_MODAL, DELETE} from "../../store/actions";

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



    const account = useSelector((state) => state.account);
    //const [openModal,setOpenModal]=useState(false);
    const dispatcher = useDispatch();
    const Click = () => {
        axios
            .post( configData.API_SERVER + 'users/deleteworkspace',{
                token:account.token,
                id:account.user._id,
                WorkspaceName:props.card.WorkspaceName
            })
            .then(response =>{
                console.log('Delete Work')
                console.log(response.data);
                dispatcher({
                    type:CLOSE_DELETE_MODAL,
                })
                dispatcher({
                    type:DELETE,
                    payload: {work:response.data.workspaceitems}
                })
                dispatcher({
                    type:CLICK,
                    payload: {text:"Workspace Removed successfully",severity:"success"}
                })


            })
            .catch(function (error) {
                console.log(' Delete dont work')
                console.log('error')

            })


    };
    return (
        <React.Fragment>

            <Box
                            sx={{
                                mt: 2,
                                marginRight:2,
                                marginLeft:13
                            }}
                        >
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={Click}
                                    color="error"

                                >
                                    Delete
                                </Button>
                            </AnimateButton>

                        </Box>
                        <Box
                            sx={{
                                mt: 2,
                                marginLeft:2
                            }}
                        >
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    onClick={props.handleClose}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Cancel
                                </Button>
                            </AnimateButton>

                        </Box>

</React.Fragment>
    );
};

export default DeleteWorkspace;
