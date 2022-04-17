import React, {Fragment, useEffect, useState} from 'react';
// material-ui
import {Grid} from '@material-ui/core';

// project imports

import PlusCard from './PlusCard';
import {useDispatch, useSelector} from 'react-redux';

import WorkspaceCard from "./WorkspaceCard";
import axios from "axios";
import configData from "../../../config";



import { CLOSE_DELETE_MODAL, CLOSE_MODAL_SHARE, INISIALIZE, INISIALIZE_USER} from "../../../store/actions";
import Modal_Delete_Workspace from "../../modal_delete_workspace";
import SkeletonEarningCard from "../../../composant_de_style/cards/Skeleton/EarningCard";
import ThemeConfig from "../../../themes/theme2";
import {gridSpacing} from "../../../store/constant";
import ShareWorkspaceModal from "../../modal/ShareWorkspaceModal";
import {useLocation, useParams} from "react-router-dom";
import {useRouteMatch} from "react-router";
import {Card, Stack, Typography} from "@mui/material";



//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = (props, { ...others }) => {
    const { url, path } = useRouteMatch();

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
    const account = useSelector((state) => state.account);
    let userSt= useSelector((state) => state.user);

    const [success,setSucess]=useState(false)
    const [USERLIST,setUSERLIST]=useState([])
    const workspaces = useSelector((state) => state.workspace);

    let open = useSelector((state) => state.modal);
    function handleClose  () {
        dispatcher({
            type:CLOSE_DELETE_MODAL,

        });
    };
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

    let {id}=useParams()
    let link
let id1

    useEffect(() => {
        if (id) {
            link = 'api/users/getinsideworkspace'
id1=id
        } else {
            link = 'api/users/getworkspace'
            id1=account.user._id
        }




        axios
            .post( configData.API_SERVER + link,{superior_id:id1, token:account.token})
            .then(response =>{

                dispatcher({
                        type:INISIALIZE,
                    payload: {work:response.data.workspaceitems}
                }
                )


                setLoading(false);
                setSucces(true)
                setLoad(false)
            })
            .catch(function (error) {


            })
    },[]);


    let lc =   workspaces.Workspace.map((card)  => {

        return(



            <Grid item lg={4} md={6} sm={6} xs={12}>
                <WorkspaceCard isLoading={isLoading} card={card}/>

            </Grid>


        )})

    const location = useLocation();
    console.log(location.pathname)
    let loc=location.pathname
    let array=loc.split("/")
    console.log(array)
    console.log(array.length)

    const ar2 = array.slice(3, (array.length));
    console.log(ar2)

    let link1=ar2.join('/')
    console.log(link1)
    return (
<Fragment>
    {isload?  (<Grid container spacing={3}>
            <Grid item xs={12} >
                <Grid container spacing={gridSpacing}>

                    {
                        load.map((i) => (
                            <Grid item lg={4} md={6} sm={6} xs={12}>

                            <SkeletonEarningCard />
                            </Grid>
                            ))
                    }
                    {console.log(url.split("/"))}
                    {console.log('mrigla')}
                    {console.log(path)}
                    {console.log('mrigla2.0')}

                    {console.log(url)}

                </Grid>
            </Grid>

        </Grid>):(
        <Fragment>
        <Card xs={12}  sx={{mb:3}}>

            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1} mb={1}>


                <Typography sx={{ml:1,mb:1,mt:1}} variant="h4" gutterBottom>
                    User Liste
                </Typography>
            </Stack>

        </Card>

            <Grid container spacing={3}>
        <Grid item xs={12} >
            <Grid container spacing={gridSpacing}>



                    {lc}
                    <ThemeConfig>
                        {open.ModalDeleteState && (<Modal_Delete_Workspace  handleClose={handleClose} card={open.objet}  />)}
                        </ThemeConfig>

                    <ShareWorkspaceModal/>



                <Grid item lg={4} md={6} sm={6} xs={12}>

                        <PlusCard/>

                    </Grid>

                </Grid>
            </Grid>

        </Grid>
        </Fragment>


            )}




</Fragment>

    )
}
export default Dashboard;
