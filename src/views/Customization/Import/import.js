

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../Typography';
import {Button, Grid, IconButton, Stack} from "@mui/material";
import { withStyles } from "@material-ui/styles";
import UploadFileIcon from '@material-ui/icons/UploadFile';
import Dashboard from "../../dashboard/Default";
import {makeStyles, useTheme} from '@material-ui/styles';



const Import = ()=> {

    const theme = useTheme();

    return (
<Grid sx={{mt:3}}>

    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

        <Box

                                          sx={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                                              color:'grey'

                                          }}
        >
        <Button
            sx={{ flexDirection: 'column' ,ml:4,mr:6 }}
            variant="raised"
            color="secondary"
            disableRipple={true}


        >

            <UploadFileIcon sx={{ fontSize: '70px !important',marginBottom: "100dp"}} />

Import from CSV
        </Button>
        </Box>
        <Box

            sx={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                color:'grey'
            }}
        >
        <Button
        sx={{ flexDirection: 'column' }}
        variant="raised"
        color="primary"
        disableRipple={true}


    >

        <UploadFileIcon sx={{ fontSize: '70px !important',marginBottom: "100dp"}} />

Import
    </Button>
        </Box>

    </Stack>
</Grid>
    );
}
export default Import;