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
    Typography
} from '@material-ui/core';

// assets
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons';
import User1 from './../../../../assets/images/users/user-round.svg';
import NotificationSkelton from "../../../../composant_de_style/cards/Skeleton/NotificationSkelton/NotificationSkelton";
import SkeletonEarningCard from "../../../../composant_de_style/cards/Skeleton/EarningCard";
import {useSelector} from "react-redux";

// style constant
const useStyles = makeStyles((theme) => ({

    listAction: {
        top: '22px'
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
        paddingBottom: '16px'
    },
    itemAction: {
        cursor: 'pointer',
        padding: '16px',
        '&:hover': {
            background: theme.palette.primary.light
        }
    }
}));

//-----------------------|| NOTIFICATION LIST ITEM ||-----------------------//

const NotificationCore = (Loading) => {
    const classes = useStyles();

    return (

        <Fragment>

            <Divider />



            <div className={classes.itemAction}>
                <ListItem alignItems="center" className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar alt="John Doe" src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
                    <ListItemSecondaryAction className={classes.listAction}>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom className={classes.actionColor}>
                                    2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className={classes.listContainer}>
                    <Grid item xs={12} className={classes.paddingBottom}>
                        <Typography variant="subtitle2">It is a long established fact that a reader will be distracted</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item>
                                <Chip label="Unread" className={classes.listChipError} />
                            </Grid>
                            <Grid item>
                                <Chip label="New" className={classes.listChipWarning} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
};

export default NotificationCore;
