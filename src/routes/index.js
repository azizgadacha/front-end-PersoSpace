import React, {lazy} from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';

// routes


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
    let path



    if(window.location.pathname.includes('html'))
        path=location.hash

    else
        path=location.pathname
    let loc
    if(window.location.pathname.includes('html'))
        loc=window.location.hash
    else
        loc=window.location.pathname


    let array=loc.split("/")


    const ar2 = array.slice(3, (array.length)-1);

    let link=ar2.join('/')


    let linkName=`/dashboard/default/${ar2[0]=="widget"?"":link==""?'':link+'/'}:id`
    let linkSpace=`/dashboard/VisualizationOfWorkspace/${ar2[0]=="widget"?"":link==""?'':link+'/'}:id`
console.log("salut")
console.log(linkName)
console.log(linkSpace)
    return (


                <Switch location={location} key={location.pathname} >


                    <Redirect exact from="/" to={config.defaultPath} />


                    <Route
                        path={[
                            "/change/:token","/forget","/login"

                        ]}
                    >
                        <Switch location={location} key={location.pathname}>
                            <Verif_login_Guard>
                                <Route exact path="/login" component={AuthLogin} />
                                <Route exact path="/forget" component={AuthForget} />
                                <Route exact path="/change/:token" component={Authverif} />


                            </Verif_login_Guard>





                        </Switch>





                    </Route>


                    <Route
                        path={[
                            "/Profile",
                            '/ProfileEdit',
                            '/ProfileEditPass',

                            "/dashboard/default/widget/:id",
                            linkName,
                            '/dashboard/viewAll',
                            linkSpace,

                            '/dashboard/default',
                            '/dashboard/SharedWorkspaces',
                            '/dashboard/VisualizationOfWorkspace'

                        ]}
                    >




                        <MainLayout>
                            <Switch location={location} key={location.pathname} >
                                <AuthGuard>




                                    <Route exact path="/dashboard/default/widget/:id" component={widget} />

                                    <Route exact path={`/dashboard/default/${ar2[0]=="widget"?"":link==""?'':link+'/'}:id`} component={DashboardDefault} />

                                    <Route exact path="/dashboard/default" component={DashboardDefault} />



                                    <Route path="/Profile" component={Profile} />
                                    <Route exact path="/ProfileEdit" component={ProfileEdit} />
                                    <Route exact path="/ProfileEditPass" component={ProfileEdit2} />

                                        <Route exact path="/dashboard/SharedWorkspaces" component={SharedWorkspaces} />

                                    <Route
                                        path={['/dashboard/viewAll', linkSpace, '/dashboard/VisualizationOfWorkspace']}
                                    >
                                        <AdministratorGuard>

                                        <Route exact path='/dashboard/viewAll' component={ViewAll} />
                                        <Route exact path={`/dashboard/VisualizationOfWorkspace/${ar2[0]=="widget"?"":link==""?'':link+'/'}:id`} component={VisualizationOfWorkspaces} />
                                        <Route exact path="/dashboard/VisualizationOfWorkspace" component={VisualizationOfWorkspaces}/>
                                        </AdministratorGuard>
                                   </Route>
                                </AuthGuard>
                            </Switch>
                        </MainLayout>





                    </Route>





                    <Route path='*'>
                        <Page404/>

                    </Route>





                </Switch>

    );
};

export default Routes;
