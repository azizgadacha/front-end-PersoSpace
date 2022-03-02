import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from '../views/Scolette_du_Dashboard';
import Preparation_du_page from "./../animation/Preparation_du_page";

import AuthGuard from './../guard_root/AuthGuard';
import Sidebar from "../views/Scolette_du_Dashboard/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {SET_MENU} from "../store/actions";
import SecondRoutes from "./SecondRoutes";
import Main from "./../views/Main";


// dashboard routing
const DashboardDefault = Preparation_du_page(lazy(() => import('../views/dashboard/Default')));

// Bare_du_cotte routing
const registre = Preparation_du_page(lazy(() => import('../views/register')));
const Profile = Preparation_du_page(lazy(() => import('../views/Profile/index')));

const UtilsMaterialIcons = Preparation_du_page(lazy(() => import('../views/Bare_du_cotte/MaterialIcons')));
const UtilsTablerIcons = Preparation_du_page(lazy(() => import('../views/Bare_du_cotte/TablerIcons')));

// sample page routing

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };
    const location = useLocation();

    return (
        <Route
            path={[


                '/dashboard'

            ]}
        >

            <MainLayout>


                <Switch location={location} key={location.pathname}>
                    <AuthGuard>


                        <Route path="/dashboard" component={Main} />

                    </AuthGuard>
                </Switch>

            </MainLayout>
        </Route>
    );
};

export default MainRoutes;