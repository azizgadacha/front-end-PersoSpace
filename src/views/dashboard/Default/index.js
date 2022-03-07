import React, { useEffect, useState } from 'react';
// material-ui
import { Grid } from '@material-ui/core';

// project imports
import EarningCard from './EarningCard';

import { gridSpacing } from '../../../store/constant';
import PlusCard from './PlusCard';
import {  useSelector } from 'react-redux';

import WorkspaceCard from "./WorkspaceCard";
import axios from "axios";
import configData from "../../../config";


import TotalGrowthBarChart from "./TotalGrowthBarChart";


//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = (props, { ...others }) => {


    const [isLoading, setLoading] = useState(true);
    const [workspaces,setworkspaces]=useState([]);
    const account = useSelector((state) => state.account);



    useEffect(() => {
        axios
            .post( configData.API_SERVER + 'users/getworkspace',{token:account.token})
            .then(response =>{
                console.log('nemchi')
                console.log(response.data.workspaceitems);
                setworkspaces(response.data.workspaceitems)
                setLoading(false);

            })
            .catch(function (error) {
                console.log('le menemchich zeda')
                console.log('error')

            })



    });


    let lc =   workspaces.map((card)  => {

        return(

           /* <Grid item lg={4} md={6} sm={6} xs={12}>
                <WorkspaceCard isLoading={isLoading} card={card}      />
            </Grid>

*/
            <Grid item xs={12} md={6} xl={3}>
                <WorkspaceCard isLoading={isLoading} card={card}      />

            </Grid>



        )})
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
                <Grid container spacing={3}>

                    {lc}
                    <Grid item xs={12} md={6} xl={3}>
                        <PlusCard/>

                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
                <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
        </Grid>

    )

        {/*
        <React.Fragment >

                <Grid container spacing={3}>
                    <Grid item xs={12} lg={8}>
                        <Grid container spacing={3}>

                            {lc}

                            <Grid item xs={8} md={6} xl={3}>
                                <PlusCard/>

                        </Grid>


                        </Grid>

                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                </Grid>

</React.Fragment>
    )






        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>

                    {lc}


                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalGrowthBarChart isLoading={isLoading} />

                    </Grid>

                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <PlusCard/>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
*/}



}
export default Dashboard;
