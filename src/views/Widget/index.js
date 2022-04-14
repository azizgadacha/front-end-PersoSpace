import React, {Fragment, useEffect, useState} from 'react';
// material-ui
import {Grid} from '@material-ui/core';

// project imports

import {useDispatch, useSelector} from 'react-redux';

import axios from "axios";
import configData from "../../config";


import TotalGrowthBarChart from "./TotalGrowthBarChart";

import {CLOSE_DELETE_MODAL, INISIALIZE, INISIALIZE_STORE} from "../../store/actions";

import {gridSpacing} from "../../store/constant";
import Customization from "../Customization";
import {useHistory, useParams} from "react-router-dom";



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
    const widget = useSelector((state) => state.widgetstore);

    let open = useSelector((state) => state.modal);
    function handleClose  () {
        dispatcher({
            type:CLOSE_DELETE_MODAL,

        });
    };

    let {id}=useParams()

   useEffect(() => {
console.log("heello les ami")
        axios
            .post( configData.API_SERVER + 'api/users/getWidget',{superior_id:id, token:account.token})
            .then(response =>{
                console.log("heello les ami2.0")

                dispatcher({
                        type:INISIALIZE_STORE,
                        payload: {widget:response.data.Widgetitems}
                    }
                )
                console.log("heello les ami3..0")
console.log(widget.widget)
                setLoading(false);

                setLoading(false);
                setSucces(true)
                setLoad(false)
            })
            .catch(function (error) {


            })
    },[]);
   
    let lc =   widget.widget.map((data)  => {

        return(
             <Grid item lg={4} md={6} sm={6} xs={12}>
                 {console.log('g')}
                 {console.log(data)}
                 <TotalGrowthBarChart isLoading={isLoading} data={data}      />
             </Grid>





        )})
    return (


<React.Fragment>
    {console.log("heello les ami5.6")}

    <Grid container spacing={3}>
        {console.log("heello les ami5.6")}

        {   (isload )? (
               null): <Grid item xs={12} >
                    {console.log("sahbi")}
                    <Grid container spacing={gridSpacing}>
                        {lc}
                    </Grid>
                </Grid>}
            </Grid>
            <Customization />

</React.Fragment>




)}
export default Widget;
