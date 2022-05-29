import React, {Fragment, useEffect, useState} from 'react';
// material-ui
import {Grid, IconButton, Tooltip, useMediaQuery, useTheme} from '@material-ui/core';

// project imports
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PlusCard from './PlusCard';
import {useDispatch, useSelector} from 'react-redux';

import WorkspaceCard from "./WorkspaceCard";
import axios from "axios";
import configData from "../../../config";
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

import {
    CLICK,
    CLICKED,
    CLICKED_INISIALIZE,
    CLOSE_DELETE_MODAL, ClOSE_EDIT_MODAL,
    CLOSE_MODAL_SHARE,
    INISIALIZE,
    INISIALIZE_USER, LOGOUT, UPDATE
} from "../../../store/actions";
import Modal_Delete_Workspace from "../../modal/Modal_Delete_Workspace";
import SkeletonEarningCard from "../../../composant_de_style/cards/Skeleton/EarningCard";
import LinkSkealton from "../../../composant_de_style/cards/Skeleton/LinkSkealton/LinkSkealton";
import ThemeConfig from "../../../themes/theme2";
import {gridSpacing} from "../../../store/constant";
import ShareWorkspaceModal from "../../modal/ShareWorkspaceModal";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {useRouteMatch} from "react-router";
import {Box, Card, List, ListItem, ListItemIcon, ListItemText, Skeleton, Stack, Typography} from "@mui/material";
import ListItemButton from "@material-ui/core/ListItemButton";
import config from "../../../config";
import Item from "./Item";
import Edit_Workspace_Modal from "../../modal/Edit_Workspace_Modal";
import RemoveShareModal from "../../modal/RemoveShareModal";
import {IconPlus} from "@tabler/icons";




//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = (props, { ...others }) => {

    const Style = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-45%,-40%)',
        padding: '50px',
        zIndex: 100
    }

    const account = useSelector((state) => state.account);

    const { url, path } = useRouteMatch();

    let socket,selectedChatCompare
    const dispatcher = useDispatch();




    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_DELETE_MODAL,

            });
        }
    }, [])
    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_MODAL_SHARE,

            });
        }
    }, [])

    const load=[1,2,3,4,5,6]

    const [succes, setSucces] = useState(false);
    const [isload, setLoad] = useState(true);

    const [isLoading, setLoading] = useState(true);
    const [UserLoading, setUserLoading] = useState(true);
    let userSt= useSelector((state) => state.user);


    const [success,setSucess]=useState(false)
    const [USERLIST,setUSERLIST]=useState([])
    let workspaces = useSelector((state) => state.workspace);
    let open = useSelector((state) => state.modal);

    function handleClose  () {
        dispatcher({
            type:CLOSE_DELETE_MODAL,

        });
    };
    let history =useHistory()

    let {id}=useParams()
    let link
    let id1
    let datasend
    let loc
    if(window.location.pathname.includes('html'))
        loc=window.location.hash
    else
        loc=window.location.pathname
    const theme = useTheme();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));


    useEffect(() => {
console.log("haja")
        axios
            .post(configData.API_SERVER + 'api/users/all', {
                id:account.user._id,

                token: account.token
            }).then((result) => {
            if(result.data.notConnected){
                dispatcher({ type: LOGOUT });
                history.push("/login");
            }else {

                dispatcher({
                    type: INISIALIZE_USER,
                    payload: {users: result.data.users},
                })

                setUSERLIST(userSt.users)
                setSucess(true)

                setUserLoading(false)
            }})},[] );

    useEffect(() => {


        let array=loc.split("/")


        const ar2 = array.slice(3, (array.length));

        if(((loc).includes('/dashboard/default'))||(((loc).includes('/dashboard/VisualizationOfWorkspace')))){
            if (id) {
                link = 'api/users/getinsideworkspace'
                id1 = id
                let clicked
                if (workspaces.clicked) {
                    clicked = true

                } else
                    clicked = false

                datasend = {
                    user_id: account.user._id,
                    list: ar2,
                    clicked,
                    token: account.token,
                    listeNameReceive: workspaces.listeName,

                    locVis:(  (loc).includes('/dashboard/VisualizationOfWorkspace'))?true:null
                }
                dispatcher({
                    type: CLICKED_INISIALIZE
                })

            }
            else if(loc=='/dashboard/VisualizationOfWorkspace'){
                link = 'api/users/visualizationOfWorkspaces'
                datasend = {user_id:account.user._id, token: account.token,}
            }
            else {
                link = 'api/users/getworkspace'
                datasend = {superior_id: account.user._id, token: account.token}

            }


            axios
                .post( configData.API_SERVER + link,datasend)
                .then(response =>{


                    if(response.data.notConnected){
                        dispatcher({ type: LOGOUT });
                        history.push("/login");
                        dispatcher({
                            type:CLICK,
                            payload: {text:"You are no longer connected",severity:"error"}
                        })
                    }else if (response.data.administratorProblem){
                        dispatcher({
                            type:UPDATE,
                            payload: {user:response.data.user}
                        });
                        if(loc.includes(configData.defaultPath))
                            history.go(0)
                        else
                            history.push(configData.defaultPath)
                        dispatcher({
                            type:CLICK,
                            payload: {text:"You are no longer an administrateur",severity:"error"}
                        })
                    }
                    else if(response.data.invalidLink){
                        history.push("/page404")

                    }else if(response.data.success) {
                        dispatcher({
                                type: INISIALIZE,
                                payload: {
                                    work: response.data.workspaceitems,
                                    listeName: response.data.listeName,
                                    location: (link == 'api/users/visualizationOfWorkspaces') ? "Visualization" : null
                                }
                            }
                        )


                        setLoading(false);
                        setSucces(true)
                        setLoad(false)
                    }else{
                        history.push(config.defaultPath)
                        dispatcher({
                            type:CLICK,
                            payload: {text:"Workspace No longer Exist",severity:"error"}
                        })
                    }
                    }
                )
                .catch(function (error) {


                })

        }
        else { axios
            .post(configData.API_SERVER + 'api/users/getsharedWorkspace', {user_id: account.user._id, token: account.token})
            .then(response => {
                if(response.data.notConnected){
                    dispatcher({ type: LOGOUT });
                    history.push("/login");

                }
                else if (response.data.SimpleEmployerProblem){
                    dispatcher({
                        type:UPDATE,
                        payload: {user:response.data.user}
                    });
                    if(loc.includes(configData.defaultPath))
                        history.go(0)
                    else
                        history.push(configData.defaultPath)
                    dispatcher({
                        type:CLICK,
                        payload: {text:"You are no longer an Simple Employer",severity:"error"}
                    })
                }
                else{

                    dispatcher({
                            type: INISIALIZE,
                            payload: {work: response.data.workspaceitems, location :'shared',listeName: []}
                        }
                    )

                    setLoading(false);
                    setSucces(true)
                    setLoad(false)
                }})
            .catch(function (error) {


            })

        }

    },[]);




    if(!(loc.includes('SharedWorkspaces'))){

        var liste =()=>{

            if(workspaces.listeName.length>2) {

                const subliste = (workspaces.listeName).slice(((workspaces.listeName.length)-3) ,(workspaces.listeName.length));

                listOfBar= subliste.map((item) => {

                    return (


                        <Item item={item}/>


                    )
                })

            } else{

                listOfBar= workspaces.listeName.map((item) => {

                    return (


                        <Item item={item}/>


                    )
                })}

            return listOfBar
        }
        liste()


    }else  {
        var listOfBar=null
    }
    let j=-1


    let lc =   workspaces.Workspace.map((card)  => {

        j++

        return(

            <Grid item lg={4} md={12} sm={12} xs={12}>

                <WorkspaceCard isLoading={isLoading} card={card}   username={((loc.includes('Shared'))||(loc.includes('Visualization')))?workspaces.username[j]:null} />

            </Grid>


        )})
    let Url;
    ((loc).includes('/dashboard/default'))? Url=true:Url=false

    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    };
    let array=loc.split("/")


    const ar2 = array.slice(3, (array.length));

    let link1=ar2.join('/')


    function handleCloseEdit  () {
        dispatcher({
            type:ClOSE_EDIT_MODAL,

        });
    };

    return (


        <Fragment>
            <Card xs={12}  sx={{mb:3}}>

                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <List component={Stack} direction="row">
                        {(isload || UserLoading)?
                            <LinkSkealton/>
                            :
                            <Fragment>
                                {(workspaces.listeName.length<=2)&&(
                                    <ListItem sx={{maxWidth:"80px"}}  key={1} disablePadding>
                                        <ListItemButton sx={{maxWidth:"80px"}}   sx={{marginLeft:0,whiteSpace: 'normal',}}      style={{ backgroundColor: 'transparent' }} onClick={()=>{
                                            //loc.includes(config.defaultPath)?history.push((config.defaultPath)):history.push(('/dashboard/VisualizationOfWorkspace'))
                                            {((loc.includes('/dashboard/default')))?(
                                                history.push(config.defaultPath)
                                            ):(loc.includes('SharedWorkspaces')) ?  (
                                                history.push('/dashboard/SharedWorkspaces')
                                            ):history.push('/dashboard/VisualizationOfWorkspace')}
                                        }}>
                                            <ListItemIcon   sx={{ whiteSpace: "normal"  }}>
                                                <HomeRoundedIcon sx={{ whiteSpace: "normal"  }} />
                                                <ListItemText primary="home" sx={{ whiteSpace: "normal"  }} />

                                            </ListItemIcon>
                                        </ListItemButton>
                                    </ListItem>)}

                                {listOfBar}

                            </Fragment>}
                    </List>
                </Box>

            </Card>



            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Grid container spacing={gridSpacing}>

                        {(isload || UserLoading)?  (



                            load.map((i) => (
                                <Grid item lg={4} md={6} sm={12} xs={12}>

                                    <SkeletonEarningCard />
                                </Grid>
                            ))) :(<Fragment>



                            {((loc.includes('SharedWorkspaces')||loc.includes('VisualizationOfWorkspace'))&&workspaces.Workspace.length==0)&&(

                                <Grid container spacing={2} alignItems="center" sx={{height:'100%', width:'100%'}} justifyContent="center"  sx={{ ...Style,  }} stroke-linecap="round" >
                                    <Grid item xs={12} >

                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"

                                        >
                                            <Grid item mb={2} >
                                                <Stack alignItems="center" justifyContent="center" >

                                                    <Grid container  sx={{mt:2.8 ,mb:2.30}}  alignItems="center"  >


                                                        <Grid container alignItems="center" >
                                                            <img alt="login" src="/static/images/NoDataFound.png" />

                                                                                                               </Grid>
                                                    </Grid>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>



                            )}



                            {lc}

                            {open.ModalDeleteState && (<Modal_Delete_Workspace  handleClose={handleClose} card={open.objet}  />)}





                            {open.ModalEditState && (<Edit_Workspace_Modal  handleClose={handleCloseEdit} card={open.objet}  />)}

                            <ShareWorkspaceModal card= {open.card}/>
                            <RemoveShareModal card={open.card}/>




                            {Url ?(
                                <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>

                                    <PlusCard/>

                                </Grid>
                            ):(
                                <Fragment>

                                    <Grid item lg={4} md={6} sm={12} xs={12}>

                                    </Grid>
                                </Fragment>
                            )}

                        </Fragment>)}

                    </Grid>
                </Grid>

            </Grid>
        </Fragment>)

}
export default Dashboard;