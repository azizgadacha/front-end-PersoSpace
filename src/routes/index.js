import React, {lazy} from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

// project imports
import config from './../config';
import Preparation_du_page from "../animation/Preparation_du_page";
import ErrorRoutes from "./ErroRoot";
import errorPage from "../views/404page";
import Animation_entre_page from "../animation/Animation_entre_page";
import Verif_login_Guard from "../guard_root/verif_login_Guard";
import AuthGuard from "../guard_root/AuthGuard";
import AdministratorGuard from "../guard_root/AdministratorGuard";
import SimpleUserGuard from "../guard_root/SimpleUserGuard";
import MainLayout from "../views/Scolette_du_Dashboard";
const Page404 = Preparation_du_page(lazy(() => import('../views/404page')));
const Authverif = Preparation_du_page(lazy(() => import('../views/verif_password')));
const AuthLogin = Preparation_du_page(lazy(() => import('../views/login')));
const AuthForget = Preparation_du_page(lazy(() => import('../views/forget_password')));
const DashboardDefault = Preparation_du_page(lazy(() => import('../views/dashboard/Default')));
const SharedWorkspaces = Preparation_du_page(lazy(() => import('../views/dashboard/Default')));
const VisualizationOfWorkspaces = Preparation_du_page(lazy(() => import('../views/dashboard/Default')));
const ViewAll = Preparation_du_page(lazy(() => import('../views/ViewAll/User')));
const widget = Preparation_du_page(lazy(() => import('../views/Widget')));
const Profile = Preparation_du_page(lazy(() => import('../views/Profile/affiche_profile')));
const ProfileEdit = Preparation_du_page(lazy(() => import('../views/Profile/edit_profile')));
const ProfileEdit2 = Preparation_du_page(lazy(() => import('../views/Profile/edit_profilePassword')));
//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
    const location = useLocation();

    let loc=location.pathname
    let array=loc.split("/")


    const ar2 = array.slice(3, (array.length)-1);

    let link=ar2.join('/')


    let linkName=`/dashboard/default/${ar2[0]=="widget"?"":link==""?'':link+'/'}:id`
    let linkSpace=`/dashboard/VisualizationOfWorkspace/${ar2[0]=="widget"?"":link==""?'':link+'/'}:id`
console.log("salut")
console.log(linkName)
console.log(linkSpace)
    return (


                <Switch >


                    <Redirect exact from="/" to={config.defaultPath} />
<MainRoutes/>




                    <Route
                        path={[
                            "/change/:token","/forget","/login"

                        ]}
                    >
                        <Switch >
                                <Verif_login_Guard>
                                    <Route path="/login"  >
                                        <AuthLogin/>
                                    </Route>
                                    <Route path="/forget"  >
                                        <AuthForget/>
                                    </Route>
                                    <Route path="/change/:token" >
                                        <Authverif/>
                                    </Route>
                                </Verif_login_Guard>





                            </Switch>





                    </Route>

                    <Route path='*'>
                        <Page404/>

                    </Route>





                </Switch>

    );
};

export default Routes;
