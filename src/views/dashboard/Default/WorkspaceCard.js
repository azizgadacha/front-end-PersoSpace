import PropTypes from 'prop-types';
import React, {useState} from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {Avatar,  Grid, Typography} from '@material-ui/core';

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

    CLOSE_DELETE_MODAL, IDWORKSPACE, INISIALIZE_FILTRED_USER,

    OPEN_DELETE_MODAL, OPEN_MODAL_SHARE,

} from "../../../store/actions";

import {useHistory, useParams} from "react-router-dom";
import config from "../../../config";
import {Box, Button, Menu, MenuItem} from "@mui/material";
import AnimateButton from "../../../animation/AnimateButton";
import {LoadingButton} from "@material-ui/lab";
import SaveIcon from "@mui/icons-material/Save";
import {Cancel, Delete, Deleting, Widget, Workspaces} from "../../Button/actionButton";
import {initialState as userSt} from "../../../store/UserReducer";


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

const WorkspaceCard = ({ isLoading,card }) => {
    let history =useHistory()
    let userSt= useSelector((state) => state.user);

    const classes = useStyles();
    const  OpenWidget=()=>{

        history.push(config.defaultPath+'/widget/'+ card._id)


    }

   
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        console.log(anchorEl)
    };

    let open = useSelector((state) => state.modal);
    const dispatcher = useDispatch();
    let {id}=useParams()
    const click = () => {
        console.log('im the card  '+card.WorkspaceName)
        let card1=card;
        dispatcher({
            type:IDWORKSPACE,
            payload: {card1}


        });
        history.push(config.defaultPath+'/'+ card._id)
    }
    const shareWorkspaces = () => {
console.log(card.Share)
        dispatcher({
            type:INISIALIZE_FILTRED_USER,
            payload:{card:card.Share}
        })
        console.log(userSt.filtred)
        //console.log("rani el shareWorkspaces ")
       // console.log(userSt.users)
        //console.log(card)
        dispatcher(  {
            type:OPEN_MODAL_SHARE,
            payload:{card:card}
        })
        handleCloseMenu()


    };
    const handleClick = () => {

        dispatcher({
            type:OPEN_DELETE_MODAL,
            payload: {objet:card}


        });
        handleCloseMenu()
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
    return (
        <React.Fragment>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <Grid container direction="column" >
                        <Grid item>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Avatar variant="rounded" className={classes.avatar}
                                            onClick={click}
                                    >
                                        <img src={EarningIcon} alt="Notification" />
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <Avatar
                                        variant="rounded"
                                        className={classes.avatarRight}
                                        aria-controls="menu-earning-card"
                                        aria-haspopup="true"

                                        onClick={handleClickMenu}
                                    >
                                        <MoreHorizIcon fontSize="inherit" />

                                    </Avatar>

                                    {console.log("helle"+ Boolean(anchorEl) )}
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
                                            <ShareIcon  fontSize="inherit" className={classes.menuItem} /> Share Workspace
                                        </MenuItem>
                                        <MenuItem onClick={handleClick}>
                                            <DeleteIcon fontSize="inherit"  className={classes.menuItem} /> Delete Workspace
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMenu}>
                                            <EditIcon fontSize="inherit"  className={classes.menuItem} /> Edit Workspace
                                        </MenuItem>

                                    </Menu>


                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <Grid alignItems="center">
                                <Grid item  align="center">
                                    <Typography   align="center"  className={classes.cardHeading}>{card.WorkspaceName}</Typography>


                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item

                              sx={{ mb:0.25 }}>
                            <Typography align="center" className={classes.subHeading}>{card.description}</Typography>
                        </Grid>
                        <Grid container alignItems={"center"}>

                            <Grid xs={6}>
                                <Box
                                    sx={


                                        {
                                            ml:0,
                                            mr:3,
                                            mt: 2,

                                        }}
                                >

                                    <AnimateButton>






                                            <Button
                                                disableElevation
                                                fullWidth
                                                  onClick={OpenWidget}
                                                type="submit" size="large"
                                                variant="contained"
                                                color="warning">{Widget} </Button>



                                    </AnimateButton>

                                </Box>
                            </Grid>
                            <Grid xs={6}>

                                <Box
                                    sx={{
                                        mt: 2,
                                        marginLeft:1
                                    }}
                                >
                                    <AnimateButton>


                                        <Button disableElevation size="large" onClick={click}  fullWidth variant="contained" color="warning">{Workspaces}</Button>
                                    </AnimateButton>

                                </Box>
                            </Grid>

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