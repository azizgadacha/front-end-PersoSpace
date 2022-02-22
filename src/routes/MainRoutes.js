import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
//import MainLayout from '../views/MainLayout/MainLayout';
//mport Loadable from '../animation/preparation_du_page';
import AuthGuard from './../guard_root/AuthGuard';


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

                '/sample-page'
            ]}
        >

                <Switch location={location} key={location.pathname}>
                    <AuthGuard>

                    </AuthGuard>
                </Switch>

        </Route>
    );
};

export default MainRoutes;
