import React, { useEffect, useState } from 'react';
// material-ui
import {Grid} from '@material-ui/core';

// project imports

import PlusCard from './PlusCard';
import {useDispatch, useSelector} from 'react-redux';

import WorkspaceCard from "./WorkspaceCard";
import axios from "axios";
import configData from "../../../config";


import TotalGrowthBarChart from "./TotalGrowthBarChart";

import {Workspaces} from "@material-ui/icons";
import {ADD, CLOSE_DELETE_MODAL, CLOSE_MODAL_SHARE, INISIALIZE, INISIALIZE_USER} from "../../../store/actions";
import {Route} from "react-router-dom";
import Modal_Delete_Workspace from "../../modal_delete_workspace";
import SkeletonEarningCard from "../../../composant_de_style/cards/Skeleton/EarningCard";
import ThemeConfig from "../../../themes/theme2";
import {gridSpacing} from "../../../store/constant";
import Modal from "../../modal";
import ShareWorkspaceModal from "../../modal/ShareWorkspaceModal";



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

const load=[1,2,3,4]
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
            setUSERLIST(userSt.users)
            setSucess(true)
            console.log("salah3.0")

        })},[] );


    useEffect(() => {

        console.log("wa " +account.token)
        axios
            .post( configData.API_SERVER + 'api/users/getworkspace',{id:account.user._id, token:account.token})
            .then(response =>{
                console.log('nemchi')
                console.log(response.data.workspaceitems);
                dispatcher({
                        type:INISIALIZE,
                    payload: {work:response.data.workspaceitems}
                }
                )
                console.log(workspaces.Workspace)


                setLoading(false);
                setSucces(true)
                setLoad(false)
            })
            .catch(function (error) {
                console.log('le menemchich zeda')
                console.log('error')

            })
    },[]);


    let lc =   workspaces.Workspace.map((card)  => {

        return(


           /* <Grid item lg={4} md={6} sm={6} xs={12}>

                <WorkspaceCard isLoading={isLoading} card={card}      />
            </Grid>

*/
            <Grid item xs={12} md={6} xl={3}>
                <WorkspaceCard isLoading={isLoading} card={card}/>

            </Grid>


        )})
    return (

        isload?  (<Grid container spacing={3}>
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
            <Grid item xs={12} lg={8}>
                <Grid container spacing={3}>



                    {lc}
                    <ThemeConfig>
                        {open.ModalDeleteState && (<Modal_Delete_Workspace  handleClose={handleClose} card={open.objet}  />)}
                        </ThemeConfig>

                    <ShareWorkspaceModal/>


                    <Grid item xs={12} md={6} xl={3}>

                        <PlusCard/>

                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
                <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
        </Grid>

    ))
}
export default Dashboard;
