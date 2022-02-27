import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

// project imports
import config from './../config';
import {Button, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {

    return (

        <React.Fragment>
        <Switch>
            <Redirect exact from="/" to={config.defaultPath} />
            <React.Fragment>


                {/* Route for login */}
                <LoginRoutes />
                {/* Routes for main layouts */}
                <MainRoutes />



            </React.Fragment>


        </Switch>

        </React.Fragment>
    );
};

export default Routes;
