import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from '../views/Scolette_du_Dashboard';
import Preparation_du_page from "./../animation/Preparation_du_page";

import AuthGuard from './../guard_root/AuthGuard';
//import sidebar from "../views/Scolette_du_Dashboard/Sidebar";
//import Profil from "../views/Profile";


// dashboard routing
const Profile = Preparation_du_page(lazy(() => import('../views/Profile/index')));
const Sidebar = Preparation_du_page(lazy(() => import('../views/Profile/index')));

// Bare_du_cotte routing
const UtilsTypography = Preparation_du_page(lazy(() => import('../views/Bare_du_cotte/Typography')));
const UtilsColor = Preparation_du_page(lazy(() => import('../views/Bare_du_cotte/Color')));
const UtilsShadow = Preparation_du_page(lazy(() => import('../views/Bare_du_cotte/Shadow')));
const UtilsMaterialIcons = Preparation_du_page(lazy(() => import('../views/Bare_du_cotte/MaterialIcons')));
const UtilsTablerIcons = Preparation_du_page(lazy(() => import('../views/Bare_du_cotte/TablerIcons')));

// sample page routing
const SamplePage = Preparation_du_page(lazy(() => import('../views/sample-page')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard/default',


            ]}
        >


                <Switch location={location} key={location.pathname}>
                    <Route path="/dashboard/default" component={Profile} />

                </Switch>

        </Route>
    );
};

export default MainRoutes;