import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from '../views/Scolette_du_Dashboard';
import Preparation_du_page from "./../animation/Preparation_du_page";
import AuthGuard from "../guard_root/AuthGuard";
import {Alert} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";

// dashboard routing
const DashboardDefault = Preparation_du_page(lazy(() => import('../views/dashboard/Default')));

// Bare_du_cotte routing
const UtilsTypography = Preparation_du_page(lazy(() => import('../views/Bare_du_cotte/Typography')));
const UtilsColor = Preparation_du_page(lazy(() => import('../views/Bare_du_cotte/Color')));
const UtilsShadow = Preparation_du_page(lazy(() => import('../views/Bare_du_cotte/Shadow')));
const UtilsMaterialIcons = Preparation_du_page(lazy(() => import('../views/Bare_du_cotte/MaterialIcons')));
const UtilsTablerIcons = Preparation_du_page(lazy(() => import('../views/Bare_du_cotte/TablerIcons')));
const Profile = Preparation_du_page(lazy(() => import('../views/Profile')));

// sample page routing
const SamplePage = Preparation_du_page(lazy(() => import('../views/sample-page')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard/default',

                '/utils/util-typography',
                '/utils/util-color',
                '/utils/util-shadow',
                '/icons/tabler-icons',
                '/icons/material-icons',
                '/Profile',
                '/sample-page'
            ]}
        >
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        <Route path="/dashboard/default" component={DashboardDefault} />

                        <Route path="/utils/util-typography" component={UtilsTypography} />
                        <Route path="/utils/util-color" component={UtilsColor} />
                        <Route path="/utils/util-shadow" component={UtilsShadow} />
                        <Route path="/icons/tabler-icons" component={UtilsTablerIcons} />
                        <Route path="/icons/material-icons" component={UtilsMaterialIcons} />
                        <Route path="/Profile" component={Profile} />

                        <Route path="/sample-page" component={SamplePage} />
                    </AuthGuard>
                </Switch>

            </MainLayout>
        </Route>
    );
};

export default MainRoutes;