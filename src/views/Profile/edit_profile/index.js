import React, {Fragment, useEffect} from 'react';

// material-ui
import { useTheme } from '@material-ui/core';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import PersonIcon from '@mui/icons-material/Person';
// project imports

import AccountProfile from "./account-profile";
import AccountProfileDetails from "./account-profile-details";
import {Box, Card, Container, List, ListItem, ListItemIcon, ListItemText, Stack} from "@mui/material";
import {CLOSE_MODAL} from "../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import configData from "../../../config";
import LinkSkealton from "../../../composant_de_style/cards/Skeleton/LinkSkealton/LinkSkealton";
import ListItemButton from "@material-ui/core/ListItemButton";
import config from "../../../config";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {useHistory} from "react-router-dom";
import Item from "../../dashboard/Default/Item";
import BareProfile from "../BareProfile";


// assets

//===============================|| AUTH3 - REGISTER ||===============================//

const Profile = () => {
    let history =useHistory()

    const account = useSelector((state) => state.account);

    let [file, setFile] = React.useState(`${configData.API_SERVER}${account.user.photo}`);

    const theme = useTheme();
    const dispatcher = useDispatch();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_MODAL,

            });
        }
    }, [])
    return (
        <Fragment>
            <Card xs={12}  >

                <Box ml={2} sx={{ width: '100%', bgcolor: 'background.paper' }}>
                   <BareProfile/>
                </Box>

            </Card>


            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                    >
                        Edit Information
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={4}
                            md={5}
                            xs={12}
                        >
                            <AccountProfile setFile={setFile} />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={7}
                            xs={12}
                        >
                            <AccountProfileDetails file={file} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Fragment>

    );
};

export default Profile;
