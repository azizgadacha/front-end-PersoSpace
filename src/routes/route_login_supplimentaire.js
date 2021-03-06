import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Loadable from '../animation/Preparation_du_page';

// project imports

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('../views/login_et_registre_avec_google/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('../views/login_et_registre_avec_google/Register3')));

//-----------------------|| AUTHENTICATION ROUTING ||-----------------------//

const AuthenticationRoutes = () => {
    const location = useLocation();

    return (
        <Route path={['/pages/login/login3', '/pages/register/register3']}>
                <Switch location={location} key={location.pathname}>
                    <Route path="/pages/login/login3" component={AuthLogin3} />
                    <Route path="/pages/register/register3" component={AuthRegister3} />
                </Switch>
        </Route>
    );
};

export default AuthenticationRoutes;
