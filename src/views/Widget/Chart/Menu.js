import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {Box, Button, Card, CardHeader, IconButton, Menu} from '@mui/material';
// utils
import { fNumber } from '../../Customization/formatNumber';
//
import BaseOptionChart  from './BaseOptionChart';
import {Avatar, Grid, MenuItem, TextField} from "@material-ui/core";
import React, {Fragment, useState} from "react";
import {gridSpacing} from "../../../store/constant";
import chartData from "../../dashboard/Default/chart-data/total-growth-bar-chart";
import MainCard from "../../../composant_de_style/cards/MainCard";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {makeStyles} from "@material-ui/styles";
import ThemeConfig from "../../../themes/theme2";
import {useTheme} from "@mui/material/styles";
import {useDispatch} from "react-redux";
import {OPEN_DELETE_MODAL, OPEN_EDIT_MODAL} from "../../../store/actions";








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
    },
    menuItem: {
        marginRight: '14px',
        fontSize: '1.25rem'
    },
    avatarRight:{
        backgroundColor: theme.palette.grey[120],
    }

}));





// ----------------------------------------------------------------------
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

export default function MenuList({data}) {


    const dispatcher = useDispatch();

    const handleClickEditModal = () => {

        dispatcher({
            type:OPEN_EDIT_MODAL,
            payload: {objet:data}
        })


    }

    const handleClickDelete = () => {
        handleCloseMenu()

        dispatcher({
            type:OPEN_DELETE_MODAL,
            payload: {objet:data}


        });
    };

    const theme = useTheme();

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    return (


<Fragment>
                                <IconButton
                                    variant="rounded"
                                    className={classes.avatarRight}
                                    aria-controls="menu-earning-card"
                                    aria-haspopup="true"
                                    onClick={handleClickMenu}
                                >
                                    <MoreHorizIcon  />

                                </IconButton>
                                <Menu
                                    id="menu-earning-card"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                    variant="selectedMenu"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                >

                                    <MenuItem onClick={handleClickDelete}>
                                        <DeleteIcon fontSize="inherit"  className={classes.menuItem} /> Delete Widget
                                    </MenuItem>
                                    <MenuItem  onClick={handleClickEditModal}>
                                        <EditIcon fontSize="inherit"  className={classes.menuItem} /> Edit widget
                                    </MenuItem>

                                </Menu>







</Fragment>


    );
}