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
import {useSelector} from "react-redux";
import config from "../../../../config";
import configData from "../../../../config";

// style constant


//-----------------------|| NOTIFICATION LIST ITEM ||-----------------------//

const NotificationCore = ({notification}) => {
    console.log("rani nhawas lena")
    const theme = useTheme();
   let TimeFromDb= new Date(notification[1].date)
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
    if(!notification[1].read)
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



            <div className={classes.itemAction} sx={{background: theme.palette.primary.light}}>
                <ListItem alignItems="center" className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar alt={notification[0].username}  src={`${configData.API_SERVER}${notification[0].photo}`} />
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">{notification[0].username}</Typography>} />
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
                        <Typography variant="subtitle2">{notification[1]._id} {notification[1].name}</Typography>
                    </Grid>
                    {!notification[1].read&&(
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
