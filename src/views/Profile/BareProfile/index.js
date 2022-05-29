import React, {Fragment, useState} from 'react';

import {List, ListItem, ListItemIcon, ListItemText, Stack} from "@mui/material";
import config from "../../../config";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";




// material-ui
import { makeStyles } from '@material-ui/styles';


// project imports

// assets

import { useDispatch, useSelector } from 'react-redux';


import {useHistory, useLocation, useParams} from "react-router-dom";
import ListItemButton from "@material-ui/core/ListItemButton";
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';



// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.primary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&>div': {
            position: 'relative',
            zIndex: 5
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.primary[800],
            borderRadius: '50%',
            zIndex: 1,
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            zIndex: 1,
            width: '210px',
            height: '210px',
            background: theme.palette.primary[800],
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
    },
    content: {
        padding: '20px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.primary[800],
        color: '#fff',
        marginTop: '8px'
    },

    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '0px',
        marginBottom: '0px'
    },
    subHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color: theme.palette.primary[200]
    },
    avatarCircle: {
        ...theme.typography.smallAvatar,
        cursor: 'pointer',
        backgroundColor: theme.palette.primary[200],
        color: theme.palette.primary.dark
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    }
}));

//===========================|| DASHBOARD DEFAULT - EARNING CARD ||===========================//

const Item = () => {
    let location
    let workspaces = useSelector((state) => state.workspace);

    if(window.location.pathname.includes('html'))
        location=window.location.hash
    else
        location=window.location.pathname

    let history =useHistory()

    let handleClickItem=(item)=>{


    }

    return (

    <List component={Stack} direction="row">

        <Fragment>

            <ListItem sx={{maxWidth:"100px"}}  key={1} disablePadding>
                <ListItemButton sx={{maxWidth:"80px"}}   sx={{marginLeft:0,whiteSpace: 'normal',}}      style={{ backgroundColor: 'transparent' }} onClick={()=>{

                    history.push(config.defaultPath)

                }}>
                    <ListItemIcon   sx={{ whiteSpace: "normal"  }}>
                        <HomeRoundedIcon sx={{ whiteSpace: "normal"  }} />
                        <ListItemText primary="home" sx={{ whiteSpace: "normal"  }} />

                    </ListItemIcon>
                </ListItemButton>
            </ListItem>
            <ListItem sx={{maxWidth:"120px"}}  key={3} disablePadding>
                <ListItemButton       style={{ backgroundColor: 'transparent' }} onClick={()=>{handleClickItem()}}>
                    <ListItemIcon>


                        <NavigateNextRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItemButton>
            </ListItem>
        </Fragment>
    </List>


    );
};


export default Item;























