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
import {ListItemIcon, Skeleton} from "@mui/material";
import FormRange from "react-bootstrap/FormRange";
import ListItemButton from "@material-ui/core/ListItemButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

// style constant
const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        maxWidth: '330px',
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '300px'
        }
    },
    listAction: {
        top: '12px'
    },
    actionColor: {
        color: theme.palette.grey[500]
    },

    listItem: {
        padding: 0
    },
    sendIcon: {
        marginLeft: '8px',
        marginTop: '-3px'
    },
    listDivider: {
        marginTop: 0,
        marginBottom: 0
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
    listChipSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: '24px',
        padding: '0 6px'
    },
    listAvatarSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        border: 'none',
        borderColor: theme.palette.success.main
    },
    listAvatarPrimary: {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
        border: 'none',
        borderColor: theme.palette.primary.main
    },
    listContainer: {
        paddingLeft: '56px'
    },
    uploadCard: {
        backgroundColor: theme.palette.secondary.light
    },
    paddingBottom: {
        paddingBottom: '16px'
    },
    itemAction: {
        cursor: 'pointer',
        padding: '16px',

    }
}));

//-----------------------|| NOTIFICATION LIST ITEM ||-----------------------//

const LinkSkelton = () => {
    const load2=[1,2,3,4]

    return (
        <Fragment>
            <ListItem   sx={{minHeight:"100%",
                minWidth: "30%",marginLeft:2
            }} key={1} disablePadding>

                <ListItemButton style={{ backgroundColor: 'transparent' }}>
                    <ListItemIcon>


                        <HomeRoundedIcon />
                    </ListItemIcon>
                    <ListItemText  sx={{ whiteSpace: "normal"  }} />
                    <Skeleton width="80%" height={"100%"} />
                </ListItemButton>
            </ListItem>
            { load2.map((i) => (

                <ListItem
                    sx={{minHeight:"100%",
                        minWidth: "30%"
                    }}
                    disablePadding>
                    <ListItemButton  style={{ backgroundColor: 'transparent' }}>
                        <ListItemIcon>


                            <NavigateNextRoundedIcon />
                        </ListItemIcon>
                        <ListItemText  sx={{ whiteSpace: "normal"  }} />
                        <Skeleton width="80%" height={"100%"} />
                    </ListItemButton>

                </ListItem>
            ))

            }
        </Fragment>

    );
};

export default LinkSkelton;
