import React, { useEffect, useState } from 'react';
// material-ui
import { Grid } from '@material-ui/core';

// project imports
import EarningCard from './EarningCard';

import { gridSpacing } from '../../../store/constant';
import PlusCard from './PlusCard';
import {useDispatch, useSelector} from 'react-redux';

import WorkspaceCard from "./WorkspaceCard";
import axios from "axios";
import configData from "../../../config";

import TotalGrowthBarChart from "./TotalGrowthBarChart";
import {Workspaces} from "@material-ui/icons";
import {ADD} from "../../../store/actions";


//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = (props, { ...others }) => {


    const [isLoading, setLoading] = useState(true);
    const account = useSelector((state) => state.account);
    const workspaces = useSelector((state) => state.workspace);

    const dispatcher = useDispatch();


    useEffect(() => {
        axios
            .post( configData.API_SERVER + 'users/getworkspace',{token:account.token})
            .then(response =>{
                console.log('nemchi')
                console.log(response.data.workspaceitems);
                dispatcher({
                        type:ADD,
                    payload: {work:response.data.workspaceitems}


                    }
                )
                console.log(workspaces.Workspace)


                setLoading(false);

            })
            .catch(function (error) {
                console.log('le menemchich zeda')
                console.log('error')

            })
    },[]);


    let lc =   workspaces.Workspace.map((card)  => {

        return(

            <Grid item lg={4} md={6} sm={6} xs={12}>
                <WorkspaceCard isLoading={isLoading} card={card}      />
            </Grid>






        )})
    return (

        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>

                   {lc}




                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <PlusCard  />
                    </Grid>

                </Grid>
            </Grid>
        </Grid>

    );

}
export default Dashboard;
