import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {Avatar,  Grid, Typography} from '@material-ui/core';

// project imports
import MainCard from './../../../composant_de_style/cards/MainCard';
import SkeletonEarningCard from './../../../composant_de_style/cards/Skeleton/EarningCard';

// assets
import EarningIcon from './../../../assets/images/icons/earning.svg';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { useDispatch, useSelector } from 'react-redux';

import {

    CLOSE_DELETE_MODAL, IDWORKSPACE,

    OPEN_DELETE_MODAL,

} from "../../../store/actions";
import Modal_Delete_Workspace from "../../modal_delete_workspace";
import ThemeConfig from "../../../themes/theme2";
import {useHistory} from "react-router-dom";
import config from "../../../config";

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
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
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
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
        backgroundColor: theme.palette.secondary[800],
        marginTop: '8px'
    },
    avatarRight: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary[200],
        zIndex: 1
    },
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px'
    },
    subHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color: theme.palette.secondary[200]
    },
    avatarCircle: {
        cursor: 'pointer',
        ...theme.typography.smallAvatar,
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.secondary.dark
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    },
    menuItem: {
        marginRight: '14px',
        fontSize: '1.25rem'
    }
}));

//===========================|| DASHBOARD DEFAULT - EARNING CARD ||===========================//

const WorkspaceCard = ({ isLoading,card }) => {
    const classes = useStyles();


    /* const handleClick = (event) => {
         setAnchorEl(event.currentTarget);
     };

     */


    let open = useSelector((state) => state.modal);
    const dispatcher = useDispatch();
    let history =useHistory()
    const click = () => {
        console.log('im the card  '+card.WorkspaceName)
        dispatcher({
            type:IDWORKSPACE,
            payload: {card}


        });
        history.push(config.defaultPath + card._id)
    }
    const handleClick = () => {

        dispatcher({
            type:OPEN_DELETE_MODAL,
            payload: {card}


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
    return (
        <React.Fragment>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <Grid container direction="column">
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

                                        onClick={handleClick}
                                    >

                                        <MoreHorizIcon fontSize="inherit" />
                                    </Avatar>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid  alignItems="center">
                                <Grid item  align="center">
                                    <Typography align="center"  className={classes.cardHeading}>{card.WorkspaceName}</Typography>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography align="center" className={classes.subHeading}>{card.description}</Typography>
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