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

import {Workspaces} from "@material-ui/icons";
import {ADD, CLOSE_DELETE_MODAL, INISIALIZE} from "../../../store/actions";
import {Route} from "react-router-dom";
import Modal_Delete_Workspace from "../../modal_delete_workspace";
import SkeletonEarningCard from "../../../composant_de_style/cards/Skeleton/EarningCard";
import ThemeConfig from "../../../themes/theme2";
import {gridSpacing} from "../../../store/constant";
import Customization from "../../Customization";



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

const load=[1,2,3,4,5,6]
    const [succes, setSucces] = useState(false);
    const [isload, setLoad] = useState(true);

    const [isLoading, setLoading] = useState(true);
    const account = useSelector((state) => state.account);
    const workspaces = useSelector((state) => state.workspace);

    let open = useSelector((state) => state.modal);
    function handleClose  () {
        dispatcher({
            type:CLOSE_DELETE_MODAL,

        });
    };


    useEffect(() => {

        axios
            .post( configData.API_SERVER + 'api/users/getworkspace',{id:account.user._id, token:account.token})
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


           /* <Grid item lg={4} md={6} sm={6} xs={12}>

                <WorkspaceCard isLoading={isLoading} card={card}      />
            </Grid>

*/
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <WorkspaceCard isLoading={isLoading} card={card}/>

            </Grid>


        )})
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

                <ThemeConfig>

                    {open.ModalDeleteState && (<Modal_Delete_Workspace  handleClose={handleClose} card={open.objet}  />)}
                        </ThemeConfig>

                <Grid item lg={4} md={6} sm={6} xs={12}>

                        <PlusCard/>

                    </Grid>

                </Grid>
            </Grid>

        </Grid>)}




</Fragment>

    )
}
export default Dashboard;
