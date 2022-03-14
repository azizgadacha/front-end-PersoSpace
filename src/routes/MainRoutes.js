import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from '../views/Scolette_du_Dashboard';
import Preparation_du_page from "./../animation/Preparation_du_page";

import AuthGuard from './../guard_root/AuthGuard';

// dashboard routing
const DashboardDefault = Preparation_du_page(lazy(() => import('../views/dashboard/Default')));
const ViewAll = Preparation_du_page(lazy(() => import('../views/ViewAll/User')));

// Bare_du_cotte routing
const registre = Preparation_du_page(lazy(() => import('../views/register')));


// sample page routing

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
   
    const location = useLocation();

    return (

        <Route
            path={[
                '/dashboard/default',

                '/dashboard/registre',
                '/dashboard/viewAll',


            ]}
        >


        <MainLayout>
            <Switch location={location} key={location.pathname}>
                <AuthGuard>






                        <Route path="/dashboard/default" component={DashboardDefault} />

                        <Route path="/dashboard/registre" component={registre} />


                    <Route path='/dashboard/viewAll' component={ViewAll} onLeave={()=>{console.log("hemmmm666llo")}}/>




                    </AuthGuard>
                </Switch>
        </MainLayout>
        </Route>
    );
};

export default MainRoutes;