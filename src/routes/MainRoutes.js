import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from '../views/Scolette_du_Dashboard';
import Preparation_du_page from "./../animation/Preparation_du_page";

import AuthGuard from './../guard_root/AuthGuard';
import {useRouteMatch} from "react-router";

// dashboard routing
const DashboardDefault = Preparation_du_page(lazy(() => import('../views/dashboard/Default')));
const SharedWorkspaces = Preparation_du_page(lazy(() => import('../views/dashboard/Default')));
const ViewAll = Preparation_du_page(lazy(() => import('../views/ViewAll/User')));
const widget = Preparation_du_page(lazy(() => import('../views/Widget')));

const Profile = Preparation_du_page(lazy(() => import('../views/Profile/affiche_profile')));

const ProfileEdit = Preparation_du_page(lazy(() => import('../views/Profile/edit_profile')));
const ProfileEdit2 = Preparation_du_page(lazy(() => import('../views/Profile/edit_profilePassword')));
// Bare_du_cotte routing


// sample page routing

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
// [][dashbord][default]/id/id2/4
    const location = useLocation();
    let loc=location.pathname
    let array=loc.split("/")


    const ar2 = array.slice(3, (array.length)-1);

    let link=ar2.join('/')

    const page404 = Preparation_du_page(lazy(() => import('../views/404page')));

    let linkName=`/dashboard/default/${ar2[0]=="widget"?"":link==""?'':link+'/'}:id`
    return (

        <Route
            path={[
                "/Profile",
                '/ProfileEdit',
                '/ProfileEditPass',

                "/dashboard/default/widget/:id",
                linkName,
                '/dashboard/viewAll',


                '/dashboard/default',
                '/dashboard/SharedWorkspaces',

            ]}
        >




        <MainLayout>
            <Switch location={location} key={location.pathname}>
                <AuthGuard>




                    <Route exact path="/dashboard/default/widget/:id" component={widget} />

                    <Route exact path={`/dashboard/default/${ar2[0]=="widget"?"":link==""?'':link+'/'}:id`} component={DashboardDefault} />:

                    <Route exact path="/dashboard/SharedWorkspaces" component={SharedWorkspaces} />

                    <Route exact path='/dashboard/viewAll' component={ViewAll} />


                   <Route exact path="/dashboard/default" component={DashboardDefault} />

                    <Route path="/Profile" component={Profile} />
                    <Route exact path="/ProfileEdit" component={ProfileEdit} />
                    <Route exact path="/ProfileEditPass" component={ProfileEdit2} />




                </AuthGuard>
                </Switch>
        </MainLayout>





        </Route>
            );
};

export default MainRoutes;