import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

// project imports
import config from './../config';

import SecondRoutes from "./SecondRoutes";


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

                {/* Routes for Personal informations expect the Menu Items so*/}
                <SecondRoutes/>

            </React.Fragment>


        </Switch>

        </React.Fragment>
    );
};

export default Routes;
