import { filter } from 'lodash';
import React, {Fragment, useEffect, useState} from 'react';
// material
import Fade from '@mui/material/Fade';

import {
    Stack,
    Container,
    Typography,
    Box,
    Card,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,
    Avatar,
    Button,
    TablePagination,
    Modal,
    TextField, Divider, ClickAwayListener,
} from '@mui/material';
// components
import ThemeConfig from "../../../themes/theme2"


import Backdrop from '@mui/material/Backdrop';

import axios from "axios";
import configData from "../../../config";

import {useDispatch, useSelector} from "react-redux";
import {ADD_USER, CLICK, CLOSE_DELETE_MODAL, CLOSE_MODAL, INISIALIZE_USER,} from "../../../store/actions";

import { useHistory} from "react-router-dom";

import {Formik} from "formik";
import * as Yup from "yup";
import config from "../../../config";
import {
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, useMediaQuery, useTheme
} from "@material-ui/core";
import {gridSpacing} from "../../../store/constant";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {Alert, LoadingButton} from "@material-ui/lab";
import AnimateButton from "../../../animation/AnimateButton";
import useScriptRef from "../../../hooks/useScriptRef";
import {strengthColor, strengthIndicator} from "../../../verification_password/password-strength";
import {makeStyles} from "@material-ui/styles";
import SaveIcon from "@mui/icons-material/Save";
import RestWorkspace from "./RestWorkspace";

// ----------------------------------------------------------------------




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






const ModalAdd=  (props) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
console.log("3aslema")
console.log(matchDownMD)


    const style = {
        minWidth:matchDownMD?"80%":"5%",

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

    };
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

    const handleCapture = ({target}) => {
        const fileReader = new FileReader();
        // const name = target.accept.includes('image') ? 'images' : 'videos';

        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            setSource(e.target.result);
        };
    };

    const classes = useStyles();
















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



    let open1 = useSelector((state) => state.modal);

    const handleClose=()=>{
        dispatcher({
            type:CLOSE_MODAL,
        });
    }
   


    return (
        <Fragment>
            {/*open={open1.ModalState}*/}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"

                open={true}
                onClose={handleClose}

                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <div style={OVERLAY_Styles}>
                    <ClickAwayListener onClickAway={handleClose}>

                    <Fade in={true}>

                        <Box sx={{ ...style,  }}>


                            <ThemeConfig>








                                {console.log("salut sava")}
                                {console.log(matchDownSM)}
                                {console.log(matchDownMD)}


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
                                                        variant={matchDownSM ? 'h3' : 'h3'}
                                                    >
                                                        Add Workspace
                                                    </Typography>
                                                    <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <RestWorkspace handleClose={props.handleClose}  />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
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
export default ModalAdd;









