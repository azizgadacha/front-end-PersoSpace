import React, {lazy} from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';

// routes

// project imports

import Animation_entre_page from "../animation/Animation_entre_page";
import Verif_login_Guard from "../guard_root/verif_login_Guard";
import Preparation_du_page from "../animation/Preparation_du_page";
import config from "../config";



// login routing

    const Authverif = Preparation_du_page(lazy(() => import('../views/verif_password')));

const AuthLogin = Preparation_du_page(lazy(() => import('../views/login')));
const AuthForget = Preparation_du_page(lazy(() => import('../views/forget_password')));
const page404 = Preparation_du_page(lazy(() => import('../views/404page')));

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {

    const location = useLocation();

    return (



<React.Fragment>
<Route path={['/login','/forget',"/change/:token"]}>

                <Switch location={location} key={location.pathname}>
                    <Animation_entre_page>
                        <Verif_login_Guard>


                            <Route path="/login" component={AuthLogin} />
                            <Route path="/forget" component={AuthForget} />
                            <Route path="/change/:token" component={Authverif} />
                            <Redirect from="*" to="/404" />

                        </Verif_login_Guard>


                    </Animation_entre_page>
                </Switch>
</Route>

</React.Fragment>
    );
};

export default Routes;
