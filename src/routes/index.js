import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

// project imports
import config from './../config';

import SecondRoutes from "./SecondRoutes";
import Route_initial from "./Route_initial";


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
                <Route_initial />

                {/* Routes for Personal informations expect the Menu Items so*/}

            </React.Fragment>


        </Switch>

        </React.Fragment>
    );
};

export default Routes;
