import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField, Typography
} from '@mui/material';
import {useMediaQuery} from "@material-ui/core";
import {useSelector} from "react-redux";

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const AccountProfileDetails = (props) => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const account = useSelector((state) => state.account);




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
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
export default AccountProfileDetails;
