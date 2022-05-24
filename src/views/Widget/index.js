import React, {Fragment, useEffect, useState} from 'react';
// material-ui
import {Grid} from '@material-ui/core';

// project imports

import {useDispatch, useSelector} from 'react-redux';

import axios from "axios";
import configData from "../../config";



import {CLICK, CLOSE_DELETE_MODAL, INISIALIZE, INISIALIZE_STORE, LOGOUT} from "../../store/actions";

import {gridSpacing} from "../../store/constant";
import Customization from "../Customization";
import {useHistory, useParams} from "react-router-dom";
import AppCurrentVisits from "./Chart/AppCurrentVisits";
import ThemeConfig from "../../themes/theme2";
import AppConversionRates from "./Chart/AppConversionRates";
import BarChart from "./Chart/BarChart";
import ModalDelete from "../modal/ModalDeleteWidgetUser";
import SkeltonChart from "../../composant_de_style/cards/Skeleton/BarSkelton/TotalGrowthBarChart";
import Import_Data_From_DB from "../modal/Import_Data_From_DB";
import EditWidget from "../modal/EditWidget";



//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Widget = (props, { ...others }) => {
    let [isLoading, setIsLoading] = useState(true);

    const dispatcher = useDispatch();

    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_DELETE_MODAL,

            });
        }
    }, [])

    function handleCloseModal  () {
        dispatcher({
            type:CLOSE_DELETE_MODAL,

        });
    };
    const load=[1,2,3,4,5,6]
    const [succes, setSucces] = useState(false);

    const account = useSelector((state) => state.account);
    const widget = useSelector((state) => state.widgetstore);
const [importing,setImporting]=useState(true)
    let open = useSelector((state) => state.modal);
    function handleClose  () {
        dispatcher({
            type:CLOSE_DELETE_MODAL,

        });
    };

    let {id}=useParams()
    let history =useHistory()

   useEffect(() => {
       console.log("ddddddddddddd")
       console.log(id)
       console.log(id)
        axios
            .post( configData.API_SERVER + 'api/users/getWidget',{superior_id:id, token:account.token})
            .then(response =>{
                if(response.data.notConnected){
                    dispatcher({ type: LOGOUT });
                    history.push("/login");
                }else{
                    console.log("ddddddd")
                    console.log(response.data.Widgetitems)
                dispatcher({
                        type:INISIALIZE_STORE,
                        payload: {widget:response.data.Widgetitems}
                    }
                )

                setImporting(false)
                setSucces(true)

            }})
            .catch(function (error) {
console.log(error)


            })
    },[]);
   
    let lc =   widget.widget.map((data)  => {
let element
        if (data.type==='Bar'){
           element=<ThemeConfig><BarChart isLoading={isLoading} data={data}/></ThemeConfig>
        } else if(data.type==='Donuts') {
            element = <ThemeConfig><AppCurrentVisits data={data}/></ThemeConfig>
        }else {
            element = <ThemeConfig><AppConversionRates data={data}/></ThemeConfig>

        }
        return(
             <Grid item lg={4} md={12} sm={12} xs={12}>
                 {element}

                 </Grid>





        )})

    return (


<React.Fragment>

    <Grid container spacing={3}>

         <Grid item xs={12} >
                    <Grid container spacing={gridSpacing}>
                      {   importing==true ? load.map((i) => (<Grid item lg={4} md={12} sm={12} xs={12}><SkeltonChart/></Grid>)):lc}

                    </Grid>

                </Grid>}
            </Grid>
            <Customization />
    {open.ModalDeleteState && (<ModalDelete   type={"Widget"}/>)}
    {open.ModalState && ( <Import_Data_From_DB/>)}
    {open.ModalEditState&&(<EditWidget  type={"Widget"} />)}

</React.Fragment>




)}
export default Widget;
