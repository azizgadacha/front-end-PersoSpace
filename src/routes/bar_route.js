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

const AuthBar = Preparation_du_page(lazy(() => import('../views/slidebar')));


//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {

    const location = useLocation();

    return (



        <React.Fragment>
            <Route path={['/dashboard']}>

                <Switch location={location} key={location.pathname}>
                    <Animation_entre_page>

                            <Route path="/dashboard" component={AuthBar} />




                    </Animation_entre_page>
                </Switch>
            </Route>

        </React.Fragment>
    );
};

export default Routes;
