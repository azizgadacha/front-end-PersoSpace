import React, { useEffect, useState } from 'react';
// material-ui
import {Grid} from '@material-ui/core';

// project imports

import PlusCard from './PlusCard';
import {useDispatch, useSelector} from 'react-redux';

import WorkspaceCard from "./WorkspaceCard";
import axios from "axios";
import configData from "../../../config";




import {
    ADD,
    CLOSE_DELETE_MODAL,
    CLOSE_INSIDE_DELETE_MODAL, CLOSE_MODAL_SHARE,
    INISIALIZE, INISIALIZE_USER,
    INISIALIZEINSIDEWORKSPACE
} from "../../../store/actions";
import {Route, useParams} from "react-router-dom";

import ThemeConfig from "../../../themes/theme2";
import Modal_Inside_Delete_Workspace from "../../modal_delete_inside_workspace";
import ShareWorkspaceModal from "../../modal/ShareWorkspaceModal";



//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = (props, { ...others }) => {

    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_INSIDE_DELETE_MODAL,

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

    const [succes, setSucces] = useState(false);

    const [isLoading, setLoading] = useState(true);
    const account = useSelector((state) => state.account);
    let userSt= useSelector((state) => state.user);

    const [success,setSucess]=useState(false)
    const [USERLIST,setUSERLIST]=useState([])
    const workspaces = useSelector((state) => state.workspace);

    const dispatcher = useDispatch();
    let open = useSelector((state) => state.modal);
    function handleClose  () {
        dispatcher({
            type:CLOSE_INSIDE_DELETE_MODAL,

        });
    };
    let {id}=useParams()
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
            .post( configData.API_SERVER + 'api/users/getinsideworkspace',{superior_id:id, token:account.token})
            .then(response =>{
                console.log('nemchi')
                console.log(response.data.workspaceitems);
                dispatcher({

                        type:INISIALIZEINSIDEWORKSPACE,
                        payload: {work:response.data.workspaceitems}
                    }
                )

                //console.log(workspaces.Workspace)
                setLoading(false);
                setSucces(true)

            })
            .catch(function (error) {
                console.log('le menemchich zeda')
                console.log('error')

            })
    },[]);




    let lc = workspaces.InsideWorkspace.map((card1)  => {

        return(


            /* <Grid item lg={4} md={6} sm={6} xs={12}>

                 <WorkspaceCard isLoading={isLoading} card={card}      />
             </Grid>

 */
            <Grid item xs={12} md={6} xl={3}>
                <WorkspaceCard isLoading={isLoading} card1={card1}/>

            </Grid>


        )})
    return (




        <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
                <Grid container spacing={3}>

                    {lc}
                    {console.log('alam')}
                    {console.log(workspaces)}

                    <ThemeConfig>

                    {open.ModalInsideDeleteState && (<Modal_Inside_Delete_Workspace  handleClose={handleClose} card1={open.card1}/>)}
                        </ThemeConfig>
                    <ShareWorkspaceModal/>
                    <Grid item xs={12} md={6} xl={3}>

                        <PlusCard/>

                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>

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
                        <PlusCard  />
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
*/



        }



}
export default Dashboard;
