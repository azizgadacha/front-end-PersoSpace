import { Box, Container } from '@mui/material';
import { CustomerListResults } from './import/customer/customer-list-results';
import { CustomerListToolbar } from './import/customer/customer-list-toolbar';
import { customers } from './import/customer/customers';
import React from "react";


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
