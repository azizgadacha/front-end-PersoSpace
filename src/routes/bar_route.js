import React, {lazy} from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';

// routes


import Preparation_du_page from "../animation/Preparation_du_page";
import Sidebar from "../views/Scolette_du_Dashboard/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {SET_MENU} from "../store/actions";



// login routing

const AuthBar = Preparation_du_page(lazy(() => import('../views/slidebar')));


//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    const location = useLocation();

    return (



      <React.Fragment>

          <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

      </React.Fragment>
    );
};

export default Routes;
