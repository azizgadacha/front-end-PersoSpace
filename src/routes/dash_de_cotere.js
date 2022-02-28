import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from '../views/Scolette_du_Dashboard';
import Preparation_du_page from "./../animation/Preparation_du_page";

import AuthGuard from './../guard_root/AuthGuard';
import Sidebar from "../views/Scolette_du_Dashboard/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {SET_MENU} from "../store/actions";


// dashboard routing
const DashboardDefault = Preparation_du_page(lazy(() => import('../views/dashboard/Default')));

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
    const dispatch = useDispatch();

    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };
    const leftDrawerOpened = useSelector((state) => state.customization.opened);

    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard/default',

                '/dashboard/utils/util-typography',
                '/dashboard/utils/util-color',
                '/dashboard/utils/util-shadow',

                '/dashboard/sample-page'
            ]}
        >

            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

                        <Route path="/dashboard/default" component={DashboardDefault} />

                        <Route path="/dashboard/utils/util-typography" component={UtilsTypography} />
                        <Route path="/dashboard/utils/util-color" component={UtilsColor} />
                        <Route path="/dashboard/utils/util-shadow" component={UtilsShadow} />
                        <Route path="/dashboard/icons/material-icons" component={UtilsMaterialIcons} />

                        <Route path="/dashboard/sample-page" component={SamplePage} />
                    </AuthGuard>
                </Switch>

            </MainLayout>
        </Route>
    );
};

export default MainRoutes;