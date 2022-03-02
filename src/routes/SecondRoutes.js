import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import Preparation_du_page from "./../animation/Preparation_du_page";
import AuthGuard from './../guard_root/AuthGuard';
import ProfileLayout from '../views/Scolette_du_Dashboard/squellete _du_profile/index'



const Profile = Preparation_du_page(lazy(() => import('../views/Profile/index')));




//-----------------------|| Second ROUTING ||-----------------------//

const SecondRoutes = () => {
    const location = useLocation();

    return (



                <Switch location={location} key={location.pathname}>
                    <AuthGuard>

                        <Route path="/dashboard/Profile" component={Profile} />

                    </AuthGuard>
                </Switch>


    );
};

export default SecondRoutes;