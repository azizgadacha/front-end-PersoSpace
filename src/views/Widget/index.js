import React, {Fragment, useEffect, useState} from 'react';
// material-ui
import {Grid} from '@material-ui/core';

// project imports

import {useDispatch, useSelector} from 'react-redux';

import axios from "axios";
import configData from "../../config";


import TotalGrowthBarChart from "./TotalGrowthBarChart";

import { CLOSE_DELETE_MODAL, INISIALIZE} from "../../store/actions";
import Modal_Delete_Workspace from "../modal_delete_workspace";
import ThemeConfig from "../../themes/theme2";
import {gridSpacing} from "../../store/constant";
import Customization from "../Customization";



//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Widget = (props, { ...others }) => {
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


   /* useEffect(() => {

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

*/
    let lc =   workspaces.Workspace.map((card)  => {

        return(


            /* <Grid item lg={4} md={6} sm={6} xs={12}>

                 <WorkspaceCard isLoading={isLoading} card={card}      />
             </Grid>

 */
            <Grid item xs={12} md={6} xl={3}>

            </Grid>


        )})
    return (
        <Fragment>
        <Grid container spacing={3}>

                <Grid item xs={12} lg={4}>
                    <TotalGrowthBarChart isLoading={isLoading} />
                </Grid>
            </Grid>
            <Customization />




        </Fragment>

    )
}
export default Widget;
