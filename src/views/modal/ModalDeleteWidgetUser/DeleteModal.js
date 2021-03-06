import React, {Fragment, useState} from 'react';


import configData from '../../../config';

// maerial-ui
import {Box, Button, Grid,} from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';


import axios from 'axios';

// project imports


import AnimateButton from '../../../animation/AnimateButton';



import {useDispatch, useSelector} from "react-redux";

import {
    ADD_USER,
    CLICK,
    CLOSE_DELETE_MODAL, DELETE,
    DELETE_WIDGET, LOGOUT,
    USER_DELETE
} from "../../../store/actions";
import {LoadingButton} from "@material-ui/lab";
import {Cancel, Delete, Deleting} from "../../Button/actionButton";
import {useHistory, useParams} from "react-router-dom";

// style constant

//===========================|| API JWT - REGISTER ||===========================//

const DeleteModalCore = ({obj,type}) => {

    const handleCloseModal = ()=> {
        dispatcher({
            type:CLOSE_DELETE_MODAL,

        });
    };

    const [isloading, setIsloading] = useState(false);
    const account = useSelector((state) => state.account);

    const dispatcher = useDispatch();
    let history =useHistory()

let link
    let dataSend





    let {id}=useParams()

    let Delete = () => {

        if(type=="User")

            {
                link='api/User/deleteUser'

                dataSend=  {token:account.token,user_id:account.user._id, userDeleted_id:obj._id}
            }


            else if (type=="Widget")
            {


                if(obj.sourceDB){
                    link = 'api/Data/deleteLinkWidget'
                    dataSend=  {token:account.token,superiorID:id,type:obj.type,WidgetName:obj.WidgetName, idData:obj.idData}}


                else {
                    link='api/Widget/deleteWidget'
                    dataSend=  {token:account.token,WidgetName:obj.WidgetName, superiorID:obj.superior_id}}

    }
        setIsloading(true)

//la liaison entre la partie front et la partie back se fait à travers ce bout de code durant lequel il y'aura l'envoie des données a utilisé et le type du méthode du contoller souhaité

        axios
            .post( configData.API_SERVER + link,dataSend)
            .then(response =>{
                if(response.data.notConnected){
                    dispatcher({ type: LOGOUT });
                    history.push("/login");
                    dispatcher({
                        type:CLICK,
                        payload: {text:"You are no longer connected",severity:"error"}
                    })
                }
                else
                {
                if(response.data.success){
                dispatcher({
                    type:CLOSE_DELETE_MODAL,
                })
              if(type=="User"){

                dispatcher({
                    type:USER_DELETE,
                    payload: {user:response.data.user}
                })}
            else {
            dispatcher({
             type:DELETE_WIDGET,
            payload: {widget:response.data.widget}
    })

              }

                    dispatcher({
                    type:CLICK,
                    payload: {text:`${type} has been deleted`,severity:"success"}
                })

                    dispatcher({
                        type:CLOSE_DELETE_MODAL,
                    })
                }
                else {
                    dispatcher({
                        type:CLOSE_DELETE_MODAL,
                    })
                    history.push(configData.defaultPath)
                    dispatcher({
                        type:CLICK,
                        payload: {text:response.data.msg,severity:"error"}
                    })
                }




            }})
            .catch(function (error) {
                dispatcher({
                     type:CLOSE_DELETE_MODAL,
                })
                dispatcher({
                    type:CLICK,
                    payload: {text:"internel problem please try later",severity:"error"}
                })

            })


    };


    return (
        <Fragment>


            <Grid container alignItems={"center"}>
                <Grid xs={6}>
                    <Box
                        sx={


                        {
                            ml:0,
                            mr:3,
                            mt: 2,

                        }}
                    >
                        <AnimateButton>




                            {isloading?(<LoadingButton variant="contained"   fullWidth size="large" loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">{Deleting}</LoadingButton>):
                                <Button
                                    disableElevation
                                    fullWidth
                                    onClick={Delete}
                                    type="submit" size="large"
                                    variant="contained"
                                    color="error">{DELETE}</Button>}



                        </AnimateButton>

                    </Box>
                </Grid>

                <Grid xs={6}>

                    <Box
                        sx={{
                            mt: 2,
                            marginLeft:1
                        }}
                    >
                        <AnimateButton>

                            <Button disableElevation size="large" disabled={isloading}  onClick={handleCloseModal} fullWidth variant="contained" color="secondary">{Cancel}</Button>
                        </AnimateButton>

                    </Box>
                </Grid>

            </Grid>





</Fragment>
    );
};

export default DeleteModalCore;
