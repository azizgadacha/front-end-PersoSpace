import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from '../views/Scolette_du_Dashboard';
import Preparation_du_page from "./../animation/Preparation_du_page";

import AuthGuard from './../guard_root/AuthGuard';
import {useRouteMatch} from "react-router";

// dashboard routing
const DashboardDefault = Preparation_du_page(lazy(() => import('../views/dashboard/Default')));
const ViewAll = Preparation_du_page(lazy(() => import('../views/ViewAll/User')));
const widget = Preparation_du_page(lazy(() => import('../views/Widget')));

// Bare_du_cotte routing


// sample page routing

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
// [][dashbord][default]/id/id2/4
    const location = useLocation();
    console.log(location.pathname)
    let loc=location.pathname
    let array=loc.split("/")
    console.log(array)
    console.log(array.length)
    console.log(array.slice(3, (array.length)));

    const ar2 = array.slice(3, (array.length)-1);
    console.log(ar2)

    let link=ar2.join('/')

    console.log(link)
    console.log(ar2[0])
    return (


        <MainLayout>
            <Switch location={location} key={location.pathname}>
                <AuthGuard>




                    <Route exact path="/dashboard/default/widget/:id" component={widget} />

                    <Route exact path={`/dashboard/default/${ar2[0]=="widget"?"":link==""?'':link+'/'}:id`} component={DashboardDefault} />:



                    <Route exact path='/dashboard/viewAll' component={ViewAll} />


                   <Route exact path="/dashboard/default" component={DashboardDefault} />




                </AuthGuard>
                </Switch>
        </MainLayout>
    );
};

export default MainRoutes;