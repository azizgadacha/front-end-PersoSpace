import React, {Fragment} from 'react';

// material-ui

// project imports
import RestWidgetName from "./RestWidgetName"
import Header from "./Header"
import {Grid} from "@mui/material";


// assets

//===============================|| AUTH3 - AddWorkspace ||===============================//

const WidgetName = ({ buttonRef }) => {


    return (
        <Fragment>



                    <Header  type={"Workspace"} />


                    <Grid container alignItems={"center"}>

                        <RestWidgetName buttonRef ={ buttonRef}  />
                    </Grid>


        </Fragment>

    );
};

export default WidgetName;
