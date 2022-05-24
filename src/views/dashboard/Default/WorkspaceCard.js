import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {Avatar,  Grid, Typography} from '@material-ui/core';

import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CoPresentIcon from '@mui/icons-material/CoPresent';
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

    CLOSE_DELETE_MODAL, IDWORKSPACE, INISIALIZE_FILTRED_USER,

    OPEN_DELETE_MODAL, OPEN_EDIT_MODAL, OPEN_MODAL_REMOVE, OPEN_MODAL_Remove, OPEN_MODAL_SHARE,

} from "../../../store/actions";

import {useHistory, useLocation, useParams} from "react-router-dom";
import config from "../../../config";
import {Box, Button, Menu, MenuItem} from "@mui/material";
import AnimateButton from "../../../animation/AnimateButton";
import {LoadingButton} from "@material-ui/lab";
import SaveIcon from "@mui/icons-material/Save";
import {Cancel, Delete, Deleting, Widget, Workspaces} from "../../Button/actionButton";
import {initialState as userSt} from "../../../store/UserReducer";

import {useRouteMatch} from "react-router";
import {IconShare} from "@tabler/icons";


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

const WorkspaceCard = ({ isLoading,card,username }) => {
    let history =useHistory()
    let userSt= useSelector((state) => state.user);

    const classes = useStyles();
    const  OpenWidget=()=>{

        history.push(config.defaultPath+'/widget/'+ card._id)


    }



    let location
    if(window.location.pathname.includes('html'))
        location=window.location.hash
    else
        location=window.location.pathname
console.log("heyeyeye")
console.log(location)
    let array=location.split("/")


    const ar2 = array.slice(3, (array.length));

    let link=ar2.join('/')


   
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    let open = useSelector((state) => state.modal);
    const dispatcher = useDispatch();
    let {id}=useParams()
    const click = () => {
        let card1=card;
        dispatcher({
            type:IDWORKSPACE,
            payload: {card1}
        });
        dispatcher({
            type:CLICKED
        });
        if((location).includes('/dashboard/default'))
        history.push(`${config.defaultPath}/${link==""?"":link+"/"}${card._id}`)
        else
            history.push(`/dashboard/VisualizationOfWorkspace/${link==""?"":link+"/"}${card._id}`)

    }
    const shareWorkspaces = () => {
        dispatcher({
            type:INISIALIZE_FILTRED_USER,
            payload:{card:card,userId:null}
        })
        dispatcher(  {
            type:OPEN_MODAL_SHARE,
            payload:{card:card}
        })





        handleCloseMenu()




    };
    const RemoveShare = () => {
        dispatcher({
            type:INISIALIZE_FILTRED_USER,
            payload:{card:card,userId:null,location:"Remove",inside:"null"}
        })

        dispatcher(  {
            type:OPEN_MODAL_REMOVE,
            payload:{card:card}
        })

        handleCloseMenu()




    };

    const EditSpace=()=>{
        dispatcher({
            type:OPEN_EDIT_MODAL,
            payload: {objet:card}


        });
        handleCloseMenu()

    }

    const handleDelete = () => {
        handleCloseMenu()

        dispatcher({
            type:OPEN_DELETE_MODAL,
            payload: {objet:card}


        });
    };

    function handleClose  () {
        dispatcher({
            type:CLOSE_DELETE_MODAL,

        });
    };

    /*  const handleClose = () => {
          setAnchorEl(null);
      };


     */

    const workspaces = useSelector((state) => state.workspace);

    return (
            <React.Fragment>

                {isLoading ? (
                    <SkeletonEarningCard/>
                ) : (


                    <MainCard border={false} className={classes.card} contentClass={classes.content}>

                        <Grid container direction="column">
                            <Grid item>
                                {(!(location.includes('Shared'))) ?
                                    (
<Fragment>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar variant="rounded" className={classes.avatar}
                                                onClick={RemoveShare}
                                        >
                                            <IconShare/>
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Button>
                                        <Avatar
                                            variant="rounded"
                                            className={classes.avatarRight}
                                            aria-controls="menu-earning-card"
                                            aria-haspopup="true"

                                            onClick={handleClickMenu}
                                        >
                                            <MoreHorizIcon fontSize="inherit"/>

                                        </Avatar>
                                        </Button>
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
                                            <MenuItem onClick={shareWorkspaces}>
                                                <ShareIcon fontSize="inherit" className={classes.menuItem}/>
                                            </MenuItem>
                                            <MenuItem onClick={handleDelete}>
                                                <DeleteIcon fontSize="inherit" className={classes.menuItem}/>
                                            </MenuItem>
                                            <MenuItem onClick={EditSpace}>
                                                <EditIcon fontSize="inherit" className={classes.menuItem}/>
                                            </MenuItem>

                                        </Menu>


                                    </Grid>
                                </Grid>                                         </Fragment>
                                    ):null}

                                {((location=='/dashboard/VisualizationOfWorkspace')||(location=='/dashboard/SharedWorkspaces'))&&(
                                    <Grid item align="center">
                                        <Typography align="center"
                                                    className={classes.cardHeading}>{(location.includes('Shared'))?"SharedBy ":null}{username}</Typography>
                                    </Grid>
                                )}


                            </Grid>
                            <Grid item>
                                <Grid alignItems="center">
                                    <Grid item align="center">
                                        <Typography align="center"
                                                    className={classes.cardHeading}>{card.WorkspaceName}</Typography>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item

                                  sx={{mb: 0.25}}>
                                <Typography align="center"
                                            className={classes.subHeading}>{card.description}</Typography>
                            </Grid>
                            <Grid container alignItems={"center"}>

                                <Grid xs={6}>
                                    <Box
                                          marginLeft={(location).includes('Shared')?17:0}
                                        sx={

                                            {
                                                mr: 3,
                                                mt: 2,

                                            }}
                                    >
                                        <Grid item align="center">

                                        <AnimateButton>


                                            <Button
                                                align="center"
                                                disableElevation
                                                fullWidth
                                                onClick={OpenWidget}
                                                type="submit" size="large"
                                                variant="contained"
                                                color="warning">{Widget} </Button>


                                        </AnimateButton>
                                        </Grid>
                                    </Box>
                                </Grid>

                                {(! (location.includes("Shared"))) &&(

                                    <Grid xs={6}>

                                    <Box
                                        sx={{
                                            mt: 2,
                                            marginLeft: 1
                                        }}
                                    >
                                        <AnimateButton>

                                                <Button disableElevation size="large" onClick={click} fullWidth
                                                    variant="contained" color="warning">{Workspaces}</Button>
                                        </AnimateButton>

                                    </Box>
                                </Grid>
                                    )}
                            </Grid>
                        </Grid>
                    </MainCard>
                )}

            </React.Fragment>
        );

};

WorkspaceCard.propTypes = {
    isLoading: PropTypes.bool,
    card: PropTypes.object

};

export default WorkspaceCard;