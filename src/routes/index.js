import React, {lazy} from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

// project imports
import config from './../config';

import Preparation_du_page from "../animation/Preparation_du_page";
import ErrorRoutes from "./ErroRoot";
import errorPage from "../views/404page";
const page404 = Preparation_du_page(lazy(() => import('../views/404page')));


//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
    const location = useLocation();

    return (

        <Switch>

            <Redirect exact from="/" to={config.defaultPath} />
            <React.Fragment>

                {/* Route for login */}
                {/* Routes for main layouts */}
               <Switch>
                <MainRoutes />
                <LoginRoutes />
                   <ErrorRoutes/>

               </Switch>
            </React.Fragment>

        </Switch>

    );
};

export default Routes;
