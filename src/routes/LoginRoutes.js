import React, {lazy} from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

// project imports
import config from './../config';
import {Button, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import Animation_entre_page from "../animation/Animation_entre_page";
import Verif_login_Guard from "../guard_root/verif_login_Guard";
import Preparation_du_page from "../animation/Preparation_du_page";



// login routing

    const Authverif = Preparation_du_page(lazy(() => import('../views/verif_password')));

const AuthLogin = Preparation_du_page(lazy(() => import('../views/login')));
const AuthRegister = Preparation_du_page(lazy(() => import('../views/register')));
const AuthForget = Preparation_du_page(lazy(() => import('../views/forget_password')));

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {

    const location = useLocation();

    return (



<React.Fragment>
<Route path={['/login', '/register','/forget',"/change/:token"]}>

                <Switch location={location} key={location.pathname}>
                    <Animation_entre_page>
                        <Verif_login_Guard>
                            <Route path="/login" component={AuthLogin} />
                            <Route path="/register" component={AuthRegister} />
                            <Route path="/forget" component={AuthForget} />
                            <Route path="/change/:token" component={Authverif} />
                    </Verif_login_Guard>


                    </Animation_entre_page>
                </Switch>
</Route>

</React.Fragment>
    );
};

export default Routes;
