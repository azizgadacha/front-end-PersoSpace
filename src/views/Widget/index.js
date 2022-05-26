import React, {Fragment, useEffect, useState} from 'react';
// material-ui
import {Grid} from '@material-ui/core';

// project imports

import {useDispatch, useSelector} from 'react-redux';

import axios from "axios";
import configData from "../../config";



import {
    CLICK,
    CLOSE_DELETE_MODAL,
    INISIALIZE,
    INISIALIZE_STORE,
    LOGOUT,
    UPDATE_WORKSPACE_NAME_LISTE
} from "../../store/actions";

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
import {Box, Card, List, ListItem, ListItemIcon, ListItemText, Stack} from "@mui/material";
import LinkSkealton from "../../composant_de_style/cards/Skeleton/LinkSkealton/LinkSkealton";
import ListItemButton from "@material-ui/core/ListItemButton";
import config from "../../config";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Item from "../dashboard/Default/Item";



//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Widget = (props, { ...others }) => {
    let [isLoading, setIsLoading] = useState(true);
    let workspaces = useSelector((state) => state.workspace);
    let loc
    if(window.location.pathname.includes('html'))
        loc=window.location.hash
    else
        loc=window.location.pathname
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
    var listOfBar=null


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
                }else if(response.data.InExistedWorksapce){
                    history.push(configData.defaultPath);
                    dispatcher({
                        type:CLICK,
                        payload: {text:"Workspace No Longer Exist",severity:"error"}
                    })
                }


                else

                {

                    console.log("ddddddd")
                    console.log(response.data.Widgetitems)


console.log(response.data.workspace)

                    dispatcher({
                            type:UPDATE_WORKSPACE_NAME_LISTE,
                            payload: {LastWorkspace:response.data.workspace}
                        }
                    )
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



    if(!(loc.includes('SharedWorkspaces'))){
        console.log("Ena el listBar")
        console.log(workspaces.listeName)
        var liste =()=>{
            if(workspaces.listeName.length>2) {
                console.log(workspaces.listeName.length)
                console.log(workspaces.listeName)
                const subliste = (workspaces.listeName).slice(((workspaces.listeName.length)-3) ,(workspaces.listeName.length));
                console.log("swxsdsqdsddsqdsqdqsdsqdsqdqqaaaaaaaaaaaaaaaa")
                console.log(subliste)
                listOfBar= subliste.map((item) => {

                    return (


                        <Item item={item}/>


                    )
                })

            } else{
console.log(workspaces.listeName)
                listOfBar= workspaces.listeName.map((item) => {

                    return (


                        <Item item={item}/>


                    )
                })}

            return listOfBar
        }
        console.log('ssssssvvvvvvvvvvvvvvvvvvvvvvv')
        liste()
        console.log(listOfBar)

    }else  {
        listOfBar=null
    }



   
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

        <Card xs={12}  sx={{mb:3}}>

            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <List component={Stack} direction="row">
                    {(importing==true)?
                        <LinkSkealton/>
                        :
                        <Fragment>
                            {(workspaces.listeName.length<=2)&&(
                                <ListItem sx={{maxWidth:"92px"}}  key={1} disablePadding>
                                    <ListItemButton    sx={{marginLeft:2,whiteSpace: 'normal',}}      style={{ backgroundColor: 'transparent' }} onClick={()=>{
                                        //loc.includes(config.defaultPath)?history.push((config.defaultPath)):history.push(('/dashboard/VisualizationOfWorkspace'))
                                        {((loc.includes('/dashboard/default')))?(
                                            history.push(config.defaultPath)
                                        ):(loc.includes('SharedWorkspaces')) ?  (
                                            history.push('/dashboard/SharedWorkspaces')
                                        ):history.push('/dashboard/VisualizationOfWorkspace')}
                                    }}>
                                        <ListItemIcon   sx={{ whiteSpace: "normal"  }}>
                                            <HomeRoundedIcon sx={{ whiteSpace: "normal"  }} />
                                        </ListItemIcon>
                                        <ListItemText primary="home" sx={{ whiteSpace: "normal"  }} />
                                    </ListItemButton>
                                </ListItem>)}

                            {listOfBar}

                        </Fragment>}
                </List>
            </Box>

        </Card>
         <Grid item xs={12} >
                    <Grid container spacing={gridSpacing}>
                      {   importing==true ? load.map((i) => (<Grid item lg={4} md={12} sm={12} xs={12}><SkeltonChart/></Grid>)):lc}

                    </Grid>

                </Grid>
            <Customization />
    {open.ModalDeleteState && (<ModalDelete   type={"Widget"}/>)}
    {open.ModalState && ( <Import_Data_From_DB/>)}
    {open.ModalEditState&&(<EditWidget  type={"Widget"} />)}

</React.Fragment>




)}
export default Widget;
