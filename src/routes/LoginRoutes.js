import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import Verif_login_Guard from './../guard_root/verif_login_Guard';
import Animation_entre_page from '../animation/Animation_entre_page';
import  Preparation_du_page from '../animation/Preparation_du_page';

// login routing
const AuthLogin = Preparation_du_page(lazy(() => import('../views/login')));
const AuthRegister = Preparation_du_page(lazy(() => import('../views/register')));
//-----------------------|| AUTH ROUTING ||-----------------------//
const LoginRoutes = () => {
    const location = useLocation();
    return (
        <Route path={['/login', '/register']}>

                <Switch location={location} key={location.pathname}>
                    <Animation_entre_page>
                        <Verif_login_Guard>
                            <Route path="/login" component={AuthLogin} />
                            <Route path="/register" component={AuthRegister} />
                        </Verif_login_Guard>
                    </Animation_entre_page>
                </Switch>

        </Route>
    );
};
export default LoginRoutes;
