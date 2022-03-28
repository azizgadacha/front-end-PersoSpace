import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid, Stack,
  TextField, Typography
} from '@mui/material';
import {useMediaQuery} from "@material-ui/core";
import {useSelector} from "react-redux";

import {Edit_Information, Edit_Password} from "../../Button/actionButton"
import {useHistory} from "react-router-dom";

const AccountProfileDetails = (props) => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const account = useSelector((state) => state.account);
  let history =useHistory()

  const handleEdit =()=>{

    history.push('/ProfileEdit')
  }


  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >







                <Grid item xs={12} >
                    <label> User:      </label>

                    <Typography  fullWidth
                                 label="First name"
                                 name="firstName"
                                 id="username" color="black"  fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                    {account.user.username}

                    </Typography>
                </Grid>



            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Grid item xs={12} >
                <label>Email:      </label>

                <Typography  fullWidth
                             label="First name"
                             name="firstName"
                             id="username" color="black"  fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                  {account.user.email}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Grid item xs={12} >
                <label>Phone:      </label>

                <Typography  fullWidth
                             label="First name"
                             name="firstName"
                             id="username" color="black"  fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                  {account.user.phone}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Grid item xs={12} >
                <label>       Role:      </label>

                <Typography  fullWidth
                             label="First name"
                             name="firstName"
                             id="username" color="black"  fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                     {account.user.role}
                </Typography>
              </Grid>
            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>*/}
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

          <Button
            color="primary"
            variant="contained"
            onClick={handleEdit}
          >
            {Edit_Information}          </Button>

          <Button
              color="primary"
              variant="contained"
          >
            {Edit_Password}         </Button>

            </Stack>
        </Box>

      </Card>
    </form>
  );
};
export default AccountProfileDetails;
