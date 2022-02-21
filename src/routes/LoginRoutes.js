import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import verif_login_Guard from './../guard_root/verif_login_Guard';
import animation_entre_page from './../animation/animation_entre_page';
import  preparation_du_page from '../animation/preparation_du_page';

// login routing
const AuthLogin = preparation_du_page(lazy(() => import('../views/login')));
const AuthRegister = preparation_du_page(lazy(() => import('../views/register')));
//-----------------------|| AUTH ROUTING ||-----------------------//
const LoginRoutes = () => {
    const location = useLocation();
    return (
        <Route path={['/login', '/register']}>

                <Switch location={location} key={location.pathname}>
                    <animation_entre_page>
                        <verif_login_Guard>
                            <Route path="/login" component={AuthLogin} />
                            <Route path="/register" component={AuthRegister} />
                        </verif_login_Guard>
                    </animation_entre_page>
                </Switch>

        </Route>
    );
};
export default LoginRoutes;
