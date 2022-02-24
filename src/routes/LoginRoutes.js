import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import Verif_login_Guard from './../guard_root/verif_login_Guard';
import Animation_entre_page from '../animation/Animation_entre_page';
import  Preparation_du_page from '../animation/Preparation_du_page';

// login routing
const AuthLogin = Preparation_du_page(lazy(() => import('../views/login')));
const Authverif = Preparation_du_page(lazy(() => import('../views/verif_password')));

const AuthRegister = Preparation_du_page(lazy(() => import('../views/register')));
const AuthForget = Preparation_du_page(lazy(() => import('../views/forget_password')));

//-----------------------|| AUTH ROUTING ||-----------------------//
const LoginRoutes = () => {
    const location = useLocation();
    return (
        <Route path={['/login', '/register','/forget','/forget/:token']}>

                <Switch location={location} key={location.pathname}>
                    <Animation_entre_page>
                        <Verif_login_Guard>
                            <Route path="/login" component={AuthLogin} />
                            <Route path="/register" component={AuthRegister} />
                            <Route path="/forget" component={AuthForget} />
                            <Route path="/forget/:token" component={Authverif} />

                        </Verif_login_Guard>
                    </Animation_entre_page>
                </Switch>

        </Route>
    );
};
export default LoginRoutes;
