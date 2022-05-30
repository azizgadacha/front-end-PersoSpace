import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider, Grid,
    Typography
} from '@mui/material';
import configData from "../../../config";
import React, {Fragment} from "react";
import {useSelector} from "react-redux";
import Profile from "./index";
import {makeStyles} from "@material-ui/styles";
import {useMediaQuery, useTheme} from "@material-ui/core";
import BareProfile from "../BareProfile";


const useStyles = makeStyles((theme) => ({
    largeImage: {

        width: theme.spacing(15),
        height: theme.spacing(15),
        top: "50%",
        left: "50%",
        right: "50%",
        bottom: "50%",
        transform: 'translate(-2%,20%)',
        borderRadius : "50%",
        overflow: "hidden",
        border: "1px solid grey",
    },

    uploadBtn:{
        height: '0%',
        width: '100%',
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        color: 'wheat',
        lineHeight : '100px',
        fontFamily: 'sans-serif',
        fontSize: '13px',
        cursor: "pointer",
        backgroundColor: "#000000",
        opacity: '0.6',

    },


    large: {

        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: theme.spacing(1), },
    large1: {

        height: theme.spacing(15),

        position: "relative",
        width: "50%",
        margin: theme.spacing(1), '&:hover': {
            height: "100%",       },


    },


}));
const AccountProfile = (props) => {
    const theme = useTheme();


    const account = useSelector((state) => state.account);

    const classes = useStyles();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    return(
        <Card   sx={{minHeight:{matchDownLG}?"100%":null}}   >
            <Grid  container
                   spacing={0}
                   direction="column"
                   alignItems="center"
                   justifyContent="center"
                   style={{ minHeight: '40vh' }}
            >


                <div className={classes.largeImage} >
                    <img src={`${configData.API_SERVER}${account.user.photo}`} id="photo" />

                    <label htmlFor="file" className={classes.uploadBtn}  id="labelStyle">Choose Photo</label>
                </div>
                <Typography mt={3}
                            color="textPrimary"
                            gutterBottom
                            variant={matchDownSM ? 'h3' : 'h2'}  >
                    {account.user.username}
                </Typography>




            </Grid>

        </Card>
    )};
export default AccountProfile;