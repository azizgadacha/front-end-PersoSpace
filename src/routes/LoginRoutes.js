import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

// project imports
import config from './../config';
import {Button, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import LoginnRoutes from "./loginnRoutes";
import Animation_entre_page from "../animation/Animation_entre_page";
import Verif_login_Guard from "../guard_root/verif_login_Guard";
import ChangeRoutes from "./ChangeRoutes";

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {

    return (

        <React.Fragment>
            <Switch>
                <Animation_entre_page>


                    <Verif_login_Guard>


                    {/* Route for login */}
                    <LoginnRoutes />
                    {/* Routes for main layouts */}
                     <ChangeRoutes/>
                        </Verif_login_Guard>


                </Animation_entre_page>
            </Switch>

        </React.Fragment>
    );
};

export default Routes;
