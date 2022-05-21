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


const useStyles = makeStyles((theme) => ({

    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: theme.spacing(1),

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
                   style={{ minHeight: '35vh' }}
            >
                <Avatar  src={`${configData.API_SERVER}${account.user.photo}`}  className={classes.large}/>


                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant={matchDownSM ? 'h3' : 'h2'}  >
                    {account.user.username}
                </Typography>


            </Grid>

        </Card>
    )};
export default AccountProfile;