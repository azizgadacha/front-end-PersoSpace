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
import {INISIALIZE} from "../../../store/actions";
import SkeletonEarningCard from "../../../composant_de_style/cards/Skeleton/EarningCard";


//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = (props, { ...others }) => {

    const [succes, setSucces] = useState(false);

    const [isLoading, setLoading] = useState(true);
    const account = useSelector((state) => state.account);
    const workspaces = useSelector((state) => state.workspace);

    const dispatcher = useDispatch();


    useEffect(() => {

        console.log("wa " +account.token)
        axios
            .post( configData.API_SERVER + 'users/getworkspace',{id:account.user._id, token:account.token})
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
                <WorkspaceCard isLoading={isLoading} card={card}      />

            </Grid>


        )})
    return (




        succes&&(
        <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
                <Grid container spacing={3}>
                    {succes?lc:<SkeletonEarningCard />}


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
                        <PlusCard  />
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
*/



        }



}
export default Dashboard;
