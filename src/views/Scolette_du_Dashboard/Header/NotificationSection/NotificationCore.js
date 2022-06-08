import React, {Fragment} from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography, useTheme
} from '@material-ui/core';

// assets
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons';
import User1 from './../../../../assets/images/users/user-round.svg';
import NotificationSkelton from "../../../../composant_de_style/cards/Skeleton/NotificationSkelton/NotificationSkelton";
import SkeletonEarningCard from "../../../../composant_de_style/cards/Skeleton/EarningCard";
import {useDispatch, useSelector} from "react-redux";
import config from "../../../../config";
import configData from "../../../../config";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {EDIT_NOTIFICATION, LOGOUT} from "../../../../store/actions";

// style constant


//-----------------------|| NOTIFICATION LIST ITEM ||-----------------------//

const NotificationCore = ({notification,}) => {
    const notificationList = useSelector((state) => state.notification);
    const dispatcher = useDispatch();
    const account = useSelector((state) => state.account);

    let history =useHistory()
let loc ;
    const handleclick=async () => {
        let IdListe = []
        if (window.location.pathname.includes('html')) {
            loc = window.location.hash
        } else {
            loc = window.location.pathname
        }
        if (loc.includes('SharedWorkspaces')) {
            history.go(0)

        }
        else{
            history.push("/dashboard/SharedWorkspaces")

        }
        let i = 0
        i++

        let j = 0
        let parcour = async () => {
            for (let elem of (notificationList.notificationListe)) {
                j++

                if (!elem.notification.read) {

                    //elem[1].read=!elem[1].read
                    IdListe.push(elem.notification._id)
                }
            }
        }
        await parcour()


        if (IdListe.length >= 1) {

            let result = await axios.post(configData.API_SERVER + 'api/Notification/editNotification', {
                token: account.token,
                IdListe
            })

            if (result.data.notConnected) {
                dispatcher({type: LOGOUT});
                history.push("/login");
            } else {

                dispatcher({
                    type: EDIT_NOTIFICATION, payload: {listNotification: IdListe}
                });
            }
        }


    }











    const theme = useTheme();
   let TimeFromDb= new Date(notification.notification.date)
let TimeToLog
    let thisTime = new Date()
    let TimeInSeconde=(parseInt((thisTime-TimeFromDb)/1000))

    if((TimeInSeconde/60/60/24/7)>1){
        if((TimeInSeconde/60/60/24/7)<2)
        TimeToLog=`${parseInt(TimeInSeconde/60/60/24/7)} week`
        else
            TimeToLog=`${parseInt(TimeInSeconde/60/60/24/7)} weeks`
    }
    else if((TimeInSeconde/60/60/24)>1){
        if((TimeInSeconde/60/60/24)<2)
            TimeToLog=`${parseInt(TimeInSeconde/60/60/24)} day`
        else
            TimeToLog=`${parseInt(TimeInSeconde/60/60/24)} days`


    }
    else if((TimeInSeconde/60/60)>1) {
        if((TimeInSeconde/60/60)<2)
            TimeToLog = `${parseInt(TimeInSeconde/60/60)} hour`
        else
            TimeToLog = `${parseInt(TimeInSeconde/60/60)} hours`

    }
    else if((TimeInSeconde/60)>1) {
        if((TimeInSeconde/60)<2)
            TimeToLog = `${parseInt(TimeInSeconde/60)} minut`
        else
            TimeToLog = `${parseInt(TimeInSeconde / 60)} minuts`

    }
    else
        TimeToLog = "just Now"


let color
    if(!notification.notification.read)
        color=theme.palette.primary.light

    const useStyles = makeStyles((theme) => ({

        listAction: {
            top: '10px'
        },
        actionColor: {
            color: theme.palette.grey[500]
        },

        listItem: {
            padding: 0
        },


        listChipError: {
            color: theme.palette.orange.dark,
            backgroundColor: theme.palette.orange.light,
            height: '24px',
            padding: '0 6px',
            marginRight: '5px'
        },
        listChipWarning: {
            color: theme.palette.warning.dark,
            backgroundColor: theme.palette.warning.light,
            height: '24px',
            padding: '0 6px'
        },

        listContainer: {
            paddingLeft: '56px'
        },

        paddingBottom: {
            paddingBottom: '3px'
        },
        itemAction: {
            cursor: 'pointer',
            padding: '16px',
            /* '&:hover': {*/
            background:  color,
            /*}*/
            '&:hover': {
            background: theme.palette.primary.light
            }
        }
    }));

    const classes = useStyles();
    return (

        <Fragment>

            <Divider />



            <div className={classes.itemAction} onClick={handleclick} sx={{background: theme.palette.primary.light}}>
                <ListItem alignItems="center" className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar alt={notification.user.username}  src={`${configData.API_SERVER}${notification.user.photo}`} />
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">{notification.user.username}</Typography>} />
                    <ListItemSecondaryAction className={classes.listAction}>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>


                                <Typography variant="caption" display="block" gutterBottom className={classes.actionColor}>
                                    {TimeToLog}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className={classes.listContainer}>
                    <Grid item xs={12} className={classes.paddingBottom}>
                        <Typography variant="subtitle2">{notification.user.username} {notification.notification.text} {notification.NameShared} </Typography>
                    </Grid>
                    {!notification.notification.read&&(
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item>
                                <Chip label="Unread" className={classes.listChipError} />
                            </Grid>

                        </Grid>
                    </Grid>)}
                </Grid>
            </div>
        </Fragment>
    );
};

export default NotificationCore;
