import React, {Fragment, useEffect, useState} from 'react';
// material-ui
import {Grid} from '@material-ui/core';

// project imports

import PlusCard from './PlusCard';
import {useDispatch, useSelector} from 'react-redux';

import WorkspaceCard from "./WorkspaceCard";
import axios from "axios";
import configData from "../../../config";


import TotalGrowthBarChart from "../../Widget/TotalGrowthBarChart";

import { CLOSE_DELETE_MODAL, CLOSE_MODAL_SHARE, INISIALIZE, INISIALIZE_USER} from "../../../store/actions";
import Modal_Delete_Workspace from "../../modal_delete_workspace";
import SkeletonEarningCard from "../../../composant_de_style/cards/Skeleton/EarningCard";
import ThemeConfig from "../../../themes/theme2";
import {gridSpacing} from "../../../store/constant";
import ShareWorkspaceModal from "../../modal/ShareWorkspaceModal";
import {useParams} from "react-router-dom";



//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = (props, { ...others }) => {
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
        console.log("salah2.0")
        axios
            .post(configData.API_SERVER + 'api/users/all', {
                id:account.user._id,

                token: account.token
            }).then((result) => {
            console.log("im gere")
            console.log(result.data.users)
            dispatcher({
                type:INISIALIZE_USER,
                payload: {users:result.data.users},
            })
            console.log(userSt)
            setSucess(true)
            console.log("salah3.0")

        })},[] );

    let {id}=useParams()
    let link
let id1
    console.log('aaaaaaa')
    console.log(window.location.pathname)

    useEffect(() => {
        if((window.location.pathname==='/dashboard/default')||(window.location.pathname==='/dashboard/default')) {
            if (id) {
                link = 'api/users/getinsideworkspace'
                id1 = id
            } else {
                link = 'api/users/getworkspace'
                id1 = account.user._id
            }
            console.log(link)
            console.log(id)
            console.log(id1)

            axios
                .post(configData.API_SERVER + link, {superior_id: id1, token: account.token})
                .then(response => {

                    dispatcher({
                            type: INISIALIZE,
                            payload: {work: response.data.workspaceitems}
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
                        payload: {work: response.data.workspaceitems}
                    }
                )
                console.log("HAHAHAHAHAA")
                console.log(response.data.workspaceitems)

                setLoading(false);
                setSucces(true)
                setLoad(false)
            })
            .catch(function (error) {


            })

        }}, []);

    let j=-1
    let lc =   workspaces.Workspace.map((card)  => {
        j++
        return(

            <Grid item lg={4} md={6} sm={6} xs={12}>
                <WorkspaceCard isLoading={isLoading} card={card} username={workspaces.username[j]} />

            </Grid>


        )})
    let Url;
    if((window.location.pathname)===('/dashboard/default')){
        Url=true
    }
    else {
        Url=false
    }

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




                </Grid>
            </Grid>

        </Grid>):(<Grid container spacing={3}>
        <Grid item xs={12} >
            <Grid container spacing={gridSpacing}>


                    {lc}
                {console.log(workspaces.Workspace)}
                    <ThemeConfig>
                        {open.ModalDeleteState && (<Modal_Delete_Workspace  handleClose={handleClose} card={open.objet}  />)}
                        </ThemeConfig>

                    <ShareWorkspaceModal card= {open.card}/>
                {Url ?(
                <Grid item lg={4} md={6} sm={6} xs={12}>

                        <PlusCard/>

                    </Grid>
                    ):(
                    <Grid item lg={4} md={6} sm={6} xs={12}>


                    </Grid>
                    )}

                </Grid>
            </Grid>

        </Grid>)}




</Fragment>

    )
}
export default Dashboard;
