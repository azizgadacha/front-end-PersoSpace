import PropTypes from 'prop-types';
import React, {useState} from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {Avatar, Grid, Typography, useMediaQuery, useTheme} from '@material-ui/core';

import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GetAppTwoToneIcon from '@material-ui/icons/GetAppOutlined';
import FileCopyTwoToneIcon from '@material-ui/icons/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@material-ui/icons/PictureAsPdfOutlined';

import ArchiveTwoToneIcon from '@material-ui/icons/ArchiveOutlined';


// project imports
import MainCard from './../../../composant_de_style/cards/MainCard';
import SkeletonEarningCard from './../../../composant_de_style/cards/Skeleton/EarningCard';

// assets
import EarningIcon from './../../../assets/images/icons/earning.svg';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { useDispatch, useSelector } from 'react-redux';

import {
    CLICKED,

    CLOSE_DELETE_MODAL, IDWORKSPACE,

    OPEN_DELETE_MODAL, OPEN_MODAL_SHARE,

} from "../../../store/actions";

import {useHistory, useLocation, useParams} from "react-router-dom";
import config from "../../../config";
import {Box, Button, ListItem, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import AnimateButton from "../../../animation/AnimateButton";
import {LoadingButton} from "@material-ui/lab";
import SaveIcon from "@mui/icons-material/Save";
import {Cancel, Delete, Deleting, Widget, Workspaces} from "../../Button/actionButton";
import {initialState as userSt} from "../../../store/UserReducer";
import {useRouteMatch} from "react-router";
import ListItemButton from "@material-ui/core/ListItemButton";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";


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

const Item = ({ item }) => {
    let location
    let workspaces = useSelector((state) => state.workspace);

    if(window.location.pathname.includes('html'))
        location=window.location.hash
    else
        location=window.location.pathname
    let arrayOfLink=location.split("/")


    let history =useHistory()

    let handleClickItem=(item)=>{
        if((arrayOfLink[1]).includes('Profile')){
history.push(arrayOfLink[1])

        }else {
        let index1
        workspaces.listeName.find(function(itemOfListe, i){
            if(item[1] === itemOfListe[1]){
                index1 = i;

                return i;

            }
        });

        let finalListe=[]
        for(let i=0;i<=index1;i++){

            finalListe .push((workspaces.listeName[i])[1])

        }

        if(location.includes('/dashboard/default'))
            history.push(config.defaultPath+"/"+finalListe.join('/'))
        else
            history.push('/dashboard/VisualizationOfWorkspace'+"/"+finalListe.join('/'))
    }}
    const theme = useTheme();

    const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme.breakpoints.down('xl'));



    return (
        <ListItem sx={{maxWidth:"100px"}}  key={item[1]} disablePadding>
            <ListItemButton        style={{ backgroundColor: 'transparent' }} onClick={()=>{handleClickItem(item)}}>
                <ListItemIcon>


                    <NavigateNextRoundedIcon />

                </ListItemIcon>
                <ListItemText primary={item[0]} />

            </ListItemButton>
        </ListItem>
    );
};


export default Item;