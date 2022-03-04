import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {Avatar, Container, Grid, Typography} from '@material-ui/core';

// project imports
import MainCard from './../../../composant_de_style/cards/MainCard';
import SkeletonEarningCard from './../../../composant_de_style/cards/Skeleton/EarningCard';

// assets
import EarningIcon from './../../../assets/images/icons/earning.svg';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import configData from "../../../config";
import PlusCard from "./PlusCard";

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

const WorkspaceCard = ({ isLoading }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const dispatch = useDispatch();
    const listecard = useSelector((state) => state.card);

    const Click = () => {
        console.log("hello")
        dispatch({ type: "supprimer", card:{id:1}} )

    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [workspaces,setworkspaces]=useState([]);
    const account = useSelector((state) => state.account);


    useEffect(()=>{

        axios
            .post( configData.API_SERVER + 'users/getworkspace',{token:account.token})
            .then(response =>{
                console.log('nemchi')
                console.log(response.data.workspaceitems);
                setworkspaces(response.data.workspaceitems)
            })
            .catch(function (error) {
                console.log('le menemchich zeda')
                console.log('error')

            })
    },[])

   return(

      // <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}} >
       <div>
           <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    {workspaces.map((w)=>{
        return (
            <Grid item xs={2} sm={4} md={4} >
            <div style={{margin:'10px'}}>
                {isLoading ? (
                    <SkeletonEarningCard />
                ) : (

                    <MainCard border={false} className={classes.card} contentClass={classes.content} >
                        <Grid container direction="column" >
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar variant="rounded" className={classes.avatar}>
                                            <img src={EarningIcon} alt="Notification" />
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            className={classes.avatarRight}
                                            aria-controls="menu-earning-card"
                                            aria-haspopup="true"

                                            onClick={Click}
                                        >

                                            <MoreHorizIcon fontSize="inherit" />
                                        </Avatar>

                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid  alignItems="center">
                                    <Grid item  align="center">
                                        <Typography align="center"  className={classes.cardHeading}>{w.WorkspaceName}</Typography>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 1.25 }}>
                                <Typography align="center" className={classes.subHeading}>{w.description}</Typography>
                            </Grid>
                        </Grid>
                    </MainCard>

                )}
            </div>
            </Grid>

        );
    })}
               <Grid item lg={4} md={4} sm={4} xs={12}>
                   <PlusCard/>
               </Grid>
           </Grid>


</div>


);





};


WorkspaceCard.propTypes = {
    isLoading: PropTypes.bool
};

export default WorkspaceCard;
