import React, {lazy} from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

// project imports
import config from './../config';

import SecondRoutes from "./SecondRoutes";
import Preparation_du_page from "../animation/Preparation_du_page";
import ErrorRoutes from "./ErroRoot";
const error = Preparation_du_page(lazy(() => import('../views/404page')));


//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
    const location = useLocation();

    return (

        <React.Fragment>
        <Switch>

            <Redirect exact from="/" to={config.defaultPath} />
            <React.Fragment>
                 <ErrorRoutes/>
                {/* Route for login */}
                <LoginRoutes />
                {/* Routes for main layouts */}
                <MainRoutes />
                <SecondRoutes/>

            </React.Fragment>


        </Switch>

        </React.Fragment>
    );
};

export default Routes;
