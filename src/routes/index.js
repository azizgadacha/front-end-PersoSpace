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


    let arrayOfLink=loc.split("/")
    let indexOfSlice=(((arrayOfLink.indexOf('widget')===3))?4:3)
    console.log(indexOfSlice)
    let ar2 = arrayOfLink.slice(indexOfSlice, ((arrayOfLink.length)-1));
console.log(ar2)

    let link=ar2.join('/')

    let linkWidget=`/dashboard/default/widget/${link==''?'':link+"/"}:id`

    console.log(linkWidget)
    console.log(linkWidget)
    console.log(linkWidget)
    let linkIndex=`/dashboard/default/${ar2[0]=="widget"?"":link==""?'':link+'/'}:id`
    console.log(linkIndex)

    let linkSpace=`/dashboard/VisualizationOfWorkspace/${ar2[0]=="widget"?"":link==""?'':link+'/'}:id`
    console.log(linkSpace)

    return (


        <Switch >



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

                    linkWidget,
                    linkIndex,
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



                            {console.log("sssss1")}
                            <Route exact path={linkWidget} component={widget} />
                            {console.log("sssss2")}

                            <Route exact path={linkIndex} component={DashboardDefault} />
                            {console.log("sssss3")}

                            <Route exact path="/dashboard/default" component={DashboardDefault} />

                            {console.log("sssss4")}


                            <Route path="/Profile" component={Profile} />
                            {console.log("sssss5")}

                            <Route exact path="/ProfileEdit" component={ProfileEdit} />
                            {console.log("sssss6")}

                            <Route exact path="/ProfileEditPass" component={ProfileEdit2} />
                            {console.log("sssss177")}

                            <Route
                                path={["/dashboard/SharedWorkspaces"]}
                            >
                                <SimpleUserGuard>
                                    {console.log("sssss8")}

                                    <Route exact path="/dashboard/SharedWorkspaces" component={SharedWorkspaces} />

                                </SimpleUserGuard>
                            </Route>


                            {console.log("sssss9")}

                            <Route
                                path={['/dashboard/viewAll', linkSpace, '/dashboard/VisualizationOfWorkspace']}
                            >
                                <AdministratorGuard>
                                    {console.log("sssss9")}

                                    <Route exact path='/dashboard/viewAll' component={ViewAll} />
                                    {console.log("sssss10")}

                                    <Route exact path={linkSpace} component={VisualizationOfWorkspaces} />
                                    {console.log("sssss11")}

                                    <Route exact path="/dashboard/VisualizationOfWorkspace" component={VisualizationOfWorkspaces}/>
                                </AdministratorGuard>
                            </Route>
                        </AuthGuard>
                    </Switch>
                </MainLayout>





            </Route>




            {console.log("sssss12")}

            <Route path='*'>
                <Page404/>

            </Route>
            {console.log("sssss13")}





        </Switch>

    );
};

export default Routes;
