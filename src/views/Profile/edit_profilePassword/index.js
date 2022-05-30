import React, {Fragment, useEffect} from 'react';

// material-ui
import { useTheme } from '@material-ui/core';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

// project imports

import AccountProfile from "./account-profile";
import AccountProfileDetails from "./account-profile-details";
import {Box, Card, Container, List, Stack} from "@mui/material";
import {CLOSE_MODAL} from "../../../store/actions";
import {useDispatch} from "react-redux";
import BareProfile from "../BareProfile";
import Item from "../../dashboard/Default/Item";


// assets

//===============================|| AUTH3 - REGISTER ||===============================//

const Profile = () => {
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
                        <Item   item={["Edit Password","Edit Password"]}/>

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
                            <AccountProfile />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={7}
                            xs={12}
                        >
                            <AccountProfileDetails />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Fragment>

    );
};

export default Profile;
