import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from './import/customer/customer-list-results';
import { CustomerListToolbar } from './import/customer/customer-list-toolbar';
import { DashboardLayout } from './import/customer/dashboard-layout';
import { customers } from './import/customer/customers';
import {Grid} from "@material-ui/core";
import React from "react";
import AuthCardWrapper from "../../composant_de_style/AuthCardWrapper";
import AuthWrapper1 from "../../composant_de_style/AuthWrapper1";

const Customers = () => (


    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>

);

Customers.getLayout = (page) => (

    {page}

);

export default Customers;
