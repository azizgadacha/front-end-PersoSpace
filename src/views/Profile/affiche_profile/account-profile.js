import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import configData from "../../../config";
import React, {Fragment} from "react";
import {useSelector} from "react-redux";
import Profile from "./index";
import {makeStyles} from "@material-ui/styles";
import {useMediaQuery, useTheme} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({

    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: theme.spacing(1),

    },


}));
const AccountProfile = (props) => {
    const theme = useTheme();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

const account = useSelector((state) => state.account);

    const classes = useStyles();

return(
    <Fragment>
<Card >
    <CardContent >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
          <Avatar src={`${configData.API_SERVER}${account.user.photo}`}  className={classes.large}/>


          <Typography
          color="textPrimary"
          gutterBottom
          variant={matchDownSM ? 'h3' : 'h2'}  >
          {account.user.username}
        </Typography>


      </Box>
    </CardContent>
    <Divider />

  </Card>
    </Fragment>
)};
export default AccountProfile;