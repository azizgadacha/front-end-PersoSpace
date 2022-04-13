import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import Preparation_du_page from "./../animation/Preparation_du_page";
import AuthGuard from './../guard_root/AuthGuard';
import ProfileLayout from '../views/Scolette_du_Dashboard/squellete _du_profile/index'



const Profile = Preparation_du_page(lazy(() => import('../views/Profile/affiche_profile')));

const ProfileEdit = Preparation_du_page(lazy(() => import('../views/Profile/edit_profile')));
const ProfileEdit2 = Preparation_du_page(lazy(() => import('../views/Profile/edit_profilePassword')));


//-----------------------|| Second ROUTING ||-----------------------//

const SecondRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                "/Profile",
                '/ProfileEdit',
                '/ProfileEditPass',

            ]}>

            <ProfileLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>

                        <Route path="/Profile" component={Profile} />
                        <Route exact path="/ProfileEdit" component={ProfileEdit} />
                        <Route exact path="/ProfileEditPass" component={ProfileEdit2} />


                    </AuthGuard>
                </Switch>
            </ProfileLayout>
        </Route>
    );
};

export default SecondRoutes;