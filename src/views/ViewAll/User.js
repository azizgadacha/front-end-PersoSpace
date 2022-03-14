import { filter } from 'lodash';
import {useEffect, useState} from 'react';
// material
import {
  Stack,
  Container,
  Typography,
   Box,
} from '@mui/material';
// components
import ThemeConfig from "../../themes/theme2"



import axios from "axios";
import configData from "../../config";

import {useDispatch, useSelector} from "react-redux";
import RestUser from "./RestUser";
import {INISIALIZE, INISIALIZE_USER} from "../../store/actions";
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------


const User=  (props) => {



    const dispatcher = useDispatch();

    let account = useSelector((state) => state.account);
    let user = useSelector((state) => state.user);

    const [success,setSucess]=useState(false)


   useEffect(() => {

    axios
        .post(configData.API_SERVER + 'users/all', {
            id:account.user._id,

          token: account.token
        }).then((result) => {
      console.log("im gere")
      console.log(result.data.users)
        dispatcher({
            type:INISIALIZE_USER,
            payload: {users:result.data.users},
        })
        setSucess(true)

    })}, []);









  return (
      success&&(
      <Container>
        <ThemeConfig>

          <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
              }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h2" gutterBottom>
                User Liste
              </Typography>

            </Stack>
          </Box>


            <RestUser  USERLIST={user.users} />

        </ThemeConfig>
      </Container>
))
  ;
}
export default User;
