import React, {lazy} from 'react';
import { Route, Switch, useLocation} from 'react-router-dom';

// routes

// project imports

import Animation_entre_page from "../animation/Animation_entre_page";
import Verif_login_Guard from "../guard_root/verif_login_Guard";
import Preparation_du_page from "../animation/Preparation_du_page";



// login routing


const page404 = Preparation_du_page(lazy(() => import('../views/404page')));

//-----------------------|| ROUTING RENDER ||-----------------------//

const ErrorRoutes = () => {

    const location = useLocation();

    return (



        <React.Fragment>
            <Route path={['*']}>

                <Switch location={location} key={location.pathname}>
                    <Animation_entre_page>


                            <Route path='*' component={page404} />


                    </Animation_entre_page>
                </Switch>
            </Route>

        </React.Fragment>
    );
};

export default ErrorRoutes;
