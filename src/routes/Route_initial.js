import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
//import MainLayout from '../views/Scolette_du_Dashboard';
import Preparation_du_page from "./../animation/Preparation_du_page";

import AuthGuard from './../guard_root/AuthGuard';
import {useDispatch, useSelector} from "react-redux";
import {SET_MENU} from "../store/actions";



// dashboard routing

// Bare_du_cotte routing
const  MainLayout = Preparation_du_page(lazy(() => import('../views/Scolette_du_Dashboard')));


// sample page routing

//-----------------------|| MAIN ROUTING ||-----------------------//

const Route_initial = () => {
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard',




            ]}
        >




                <Switch location={location} key={location.pathname}>
                <AuthGuard>
                        <Route path="/dashboard" component={MainLayout} />

                    </AuthGuard>
                </Switch>

        </Route>
    );
};

export default Route_initial;