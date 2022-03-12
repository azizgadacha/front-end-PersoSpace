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

import {useSelector} from "react-redux";
import RestUser from "./RestUser";
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------


const User=  (props) => {

    let account = useSelector((state) => state.account);
    const [success,setSucess]=useState(false)
    const [userListe,setUserListe]=useState([])


   useEffect(() => {

    axios
        .post(configData.API_SERVER + 'users/all', {

          token: account.token
        }).then((result) => {
      console.log("im gere")
      console.log(result.data.users)
     setUserListe( result.data.users)
        setSucess(true)
    })
  }, [])





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


            <RestUser  USERLIST={userListe} />

        </ThemeConfig>
      </Container>
))
  ;
}
export default User;
