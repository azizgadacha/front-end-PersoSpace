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
import { CameraAlt as CameraIcon } from '@material-ui/icons'

import {

    Badge,
    DialogActions,
    DialogTitle,
    IconButton,
    Dialog,
    DialogContent,
} from '@material-ui/core'
import AvartarText from './AvartarText'
import React, {Fragment, useRef} from "react";
import {useSelector} from "react-redux";
import Profile from "./index";
import {makeStyles} from "@material-ui/styles";
import {useMediaQuery, useTheme} from "@material-ui/core";
import configData from "../../../config";


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
    const inputFileRef = useRef(null)

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
          <Badge
              badgeContent={
                  true && (
                      <IconButton
                          style={{ bottom: -140, left: -20 }}

                      >
                          <Avatar>
                              <CameraIcon style={{ color: 'black' }} />
                          </Avatar>
                      </IconButton>
                  )
              }
              style={{
                  position: 'absolute',
                  bottom: -30,
                  width: '170px',
                  height: '170px',
                  zIndex: 2,
                  left: '40%',
              }}
          >
              {(configData.API_SERVER+account.user.photo) ? (
                  <Avatar
                      style={{
                          width: '170px',
                          height: '170px',
                      }}
                  >
                      <img src={`${configData.API_SERVER}${account.user.photo}`}  width="100%" height="100%" alt="ffff" />
                  </Avatar>
              ) : (
                  <AvartarText
                      text="selem"
                      bg={true ? 'seagreen' : 'tomato'}
                      fontSize="40px"
                      size="170px"
                  />
              )}
          </Badge>
          <input
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
              ref={inputFileRef}

          />

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