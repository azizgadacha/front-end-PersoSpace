import React, {Fragment, useEffect} from 'react';

// material-ui
import { useTheme } from '@material-ui/core';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

// project imports

import AccountProfile from "./account-profile";
import AccountProfileDetails from "./account-profile-details";
import {Box, Container} from "@mui/material";
import {CLOSE_MODAL} from "../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import configData from "../../../config";


// assets

//===============================|| AUTH3 - REGISTER ||===============================//

const Profile = () => {
    const account = useSelector((state) => state.account);

    let [file, setFile] = React.useState(`${configData.API_SERVER}${account.user.photo}`);

    const theme = useTheme();
    const dispatcher = useDispatch();
console.log(file)
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
