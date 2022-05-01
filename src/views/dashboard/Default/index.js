import React, {Fragment, useEffect, useState} from 'react';
// material-ui
import {Grid} from '@material-ui/core';

// project imports
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PlusCard from './PlusCard';
import {useDispatch, useSelector} from 'react-redux';

import WorkspaceCard from "./WorkspaceCard";
import axios from "axios";
import configData from "../../../config";
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

import {
    CLICKED,
    CLICKED_INISIALIZE,
    CLOSE_DELETE_MODAL, ClOSE_EDIT_MODAL,
    CLOSE_MODAL_SHARE,
    INISIALIZE,
    INISIALIZE_USER
} from "../../../store/actions";
import Modal_Delete_Workspace from "../../modal_delete_workspace";
import SkeletonEarningCard from "../../../composant_de_style/cards/Skeleton/EarningCard";
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
import {io} from "socket.io-client";



//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = (props, { ...others }) => {

    const { url, path } = useRouteMatch();
//let socket,selectedChatCompare
    const dispatcher = useDispatch();
/*useEffect(()=>{
    socket=io(configData.API_SERVER)
},[])
*/

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
    const load2=[1,2,3,4]

    const [succes, setSucces] = useState(false);
    const [isload, setLoad] = useState(true);

    const [isLoading, setLoading] = useState(true);
    const account = useSelector((state) => state.account);
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


    let loc=window.location.pathname

    useEffect(() => {
        let array=loc.split("/")


        const ar2 = array.slice(3, (array.length));

        let link2=ar2.join('/')
if(((location.pathname).includes('/dashboard/default'))||(((location.pathname).includes('/dashboard/VisualizationOfWorkspace')))){
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

                locVis:(  (location.pathname).includes('/dashboard/VisualizationOfWorkspace'))?true:null
            }
            dispatcher({
                type: CLICKED_INISIALIZE
            })

        }
        else if(loc=='/dashboard/VisualizationOfWorkspace'){
            link = 'api/users/visualizationOfWorkspaces'
            datasend = {superior_id: account.user._id, token: account.token,}
        }
        else {
            link = 'api/users/getworkspace'
            datasend = {superior_id: account.user._id, token: account.token}

        }





            axios
                .post( configData.API_SERVER + link,datasend)
                .then(response =>{
                    let sendIt




                    dispatcher({
                            type:INISIALIZE,
                            payload: {work:response.data.workspaceitems,listeName:response.data.listeName,location: (link == 'api/users/visualizationOfWorkspaces')?"visualize":null}
                        }
                    )


                    setLoading(false);
                    setSucces(true)
                    setLoad(false)
                })
                .catch(function (error) {


                })

        }
        else { axios
            .post(configData.API_SERVER + 'api/users/getsharedWorkspace', {user_id: account.user._id, token: account.token})
            .then(response => {


                dispatcher({
                        type: INISIALIZE,
                        payload: {work: response.data.workspaceitems, location :'shared'}
                    }
                )

                setLoading(false);
                setSucces(true)
                setLoad(false)
            })
            .catch(function (error) {


            })

        }
    },[]);


    useEffect(() => {
        axios
            .post(configData.API_SERVER + 'api/users/all', {
                id:account.user._id,

                token: account.token
            }).then((result) => {

            dispatcher({
                type:INISIALIZE_USER,
                payload: {users:result.data.users},
            })

            setUSERLIST(userSt.users)
            setSucess(true)

        })},[] );




    let listOfBar =   workspaces.listeName.map((item)  => {

        return(



            <Item item={item}/>


        )})




    let lc =   workspaces.Workspace.map((card)  => {

        return(



            <Grid item lg={4} md={6} sm={12} xs={12}>
                <WorkspaceCard isLoading={isLoading} card={card}/>

            </Grid>


        )})

    let Url;
    if((window.location.pathname).includes('/dashboard/default')){
        Url=true
    }
    else {
        Url=false
    }

    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    };
    const location = useLocation();
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

                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <List component={Stack} direction="row">
                        {isload?
                            <Fragment>
                                <ListItem   sx={{minHeight:"100%",
                                    minWidth: "30%",marginLeft:2
                                }} key={1} disablePadding>

                                    <ListItemButton style={{ backgroundColor: 'transparent' }}>
                                        <ListItemIcon>


                                            <HomeRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText  sx={{ whiteSpace: "normal"  }} />
                                        <Skeleton width="80%" height={"100%"} />
                                    </ListItemButton>
                                </ListItem>
                                { load2.map((i) => (

                                    <ListItem
                                        sx={{minHeight:"100%",
                                            minWidth: "30%"
                                        }}
                                        disablePadding>
                                        <ListItemButton  style={{ backgroundColor: 'transparent' }}>
                                            <ListItemIcon>


                                                <NavigateNextRoundedIcon />
                                            </ListItemIcon>
                                            <ListItemText  sx={{ whiteSpace: "normal"  }} />
                                            <Skeleton width="80%" height={"100%"} />
                                        </ListItemButton>

                                    </ListItem>
                                ))

                                }
                            </Fragment>
                            :
                            <Fragment>
                                <ListItem sx={{ whiteSpace:'wra'}} key={1} disablePadding>
                                    <ListItemButton    sx={{marginLeft:2,whiteSpace: 'normal',}}      style={{ backgroundColor: 'transparent' }} onClick={()=>{
                                        history.push(config.defaultPath)
                                    }}>
                                        <ListItemIcon   sx={{ whiteSpace: "normal"  }}>
                                            <HomeRoundedIcon sx={{ whiteSpace: "normal"  }} />
                                        </ListItemIcon>
                                        <ListItemText primary="home" sx={{ whiteSpace: "normal"  }} />
                                    </ListItemButton>
                                </ListItem>

                                {listOfBar}
                            </Fragment>}
                    </List>
                </Box>

            </Card>



            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Grid container spacing={gridSpacing}>

                        {isload?  (



                            load.map((i) => (
                                <Grid item lg={4} md={6} sm={12} xs={12}>

                                    <SkeletonEarningCard />
                                </Grid>
                            ))) :(<Fragment>









                            {lc}
                            <ThemeConfig>
                                {open.ModalDeleteState && (<Modal_Delete_Workspace  handleClose={handleClose} card={open.objet}  />)}
                            </ThemeConfig>



                            <ThemeConfig>
                                {open.ModalEditState && (<Edit_Workspace_Modal  handleClose={handleCloseEdit} card={open.objet}  />)}
                            </ThemeConfig>
                            <ShareWorkspaceModal card= {open.card}/>



                            {Url ?(
                                <Grid item lg={4} md={6} sm={12} xs={12}>

                                    <PlusCard/>

                                </Grid>
                            ):(
                                <Grid item lg={4} md={6} sm={12} xs={12}>


                                </Grid>
                            )}
                        </Fragment>)}

                    </Grid>
                </Grid>

            </Grid>
        </Fragment>)

}
export default Dashboard;