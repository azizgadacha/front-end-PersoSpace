import React, {Fragment, useEffect, useState} from 'react';

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

    const [notChanged, setNotChanged] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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

                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <List component={Stack} direction="row">

                    <BareProfile/>
                    <Item   item={["Edit Information","Edit Information"]}/>
                    </List>
                </Box>

            </Card>


            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 4
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
                            <AccountProfile errorMessage={errorMessage}  setErrorMessage={setErrorMessage} setFile={setFile} notChanged={notChanged} setNotChanged={setNotChanged} />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={7}
                            xs={12}
                        >
                            <AccountProfileDetails file={file} errorMessage={errorMessage}  setErrorMessage={setErrorMessage} setFile={setFile} notChanged={notChanged} setNotChanged={setNotChanged} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Fragment>

    );
};

export default Profile;
