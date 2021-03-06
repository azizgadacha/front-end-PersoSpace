import * as React from 'react';
import Box from '@mui/material/Box';

import {Alert,  Button, Grid, Stack} from "@mui/material";
import UploadFileIcon from '@material-ui/icons/UploadFile';
import {makeStyles,} from '@material-ui/styles';
import { IconDatabaseExport } from '@tabler/icons';
import {useRef, useState} from "react";
import Papa from "papaparse";
import {useDispatch, useSelector} from "react-redux";
import {IMPORT_DATA, OPEN_MODAL,} from "../../../store/actions";
import {useParams} from "react-router-dom";
import Import_Data_From_DB from "../../modal/Import_Data_From_DB";
import Password_verify from "../../modal/password_verify_modal";

const useStyles = makeStyles((theme) => ({




    root: {
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },

        '&:hover .AvatarBackdrop': {
            opacity: 0.5,
        },
    },
    input: {
        display: "none",


    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        '&:hover .imageBackdrop': {
            opacity: 0.5,
        },
    },


}));


const Import = ()=> {
    let open1 = useSelector((state) => state.modal);

    const fileInput = useRef();
    const dispatcher = useDispatch();

    const classes = useStyles();
    const[csvFile,setCsvFile]=useState(null);
    const[changed,setchanged]=useState(null);
    let {id}=useParams()

    return (
        <Grid sx={{mt:3}}>
            { changed&&(
                <Grid
                    item
                    md={12}
                    xs={12}
                    mt={3}
                    mb={4}
                >
                    <Alert variant="filled" autoHideDuration={4000} severity="error">
                        You intered invalid Data
                    </Alert>
                </Grid>)}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

                <Box

                    sx={{
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        color:'grey'

                    }}
                >




                    <input
                        ref={fileInput}
                        type="file"
                        style={{ display: 'none' }}
                        accept=".csv"
                        onChange={(e)=>{
                            if((e.target.files[0].name).endsWith(".csv")){
                                setchanged(false)
                                setCsvFile(e.target.files[0])

                                Papa.parse(e.target.files[0],{
                                    complete:(results)=>{

                                        dispatcher({
                                            type:IMPORT_DATA,
                                            payload: {Data:results.data,superior_id:id,sourceDB:false}

                                        });}
                                })

                            }else{
                                setchanged(true)
                            }}}
                    />

                    <Button
                        sx={{ flexDirection: 'column' ,ml:4,mr:6 }}
                        variant="raised"
                        color="success"
                        disableRipple={true}
                        color="primary"
                        onClick={()=>fileInput.current.click()}

                    >


                        <UploadFileIcon sx={{ fontSize: '70px !important',marginBottom: "100dp"}} />

                        Import from CSV

                    </Button>


                </Box>
                <Box

                    sx={{
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        color:'grey'
                    }}
                >
                    <Button
                        sx={{ flexDirection: 'column' }}
                        variant="raised"
                        color="primary"
                        disableRipple={true}
                        onClick={()=>
                            dispatcher({
                                type:OPEN_MODAL,

                            })
                        }


                    >

                        <IconDatabaseExport size={69.5} />

                        Import from Data Base
                    </Button>
                </Box>

            </Stack>
            {open1.ModalState && ( <Import_Data_From_DB/>)}

        </Grid>
    );
}
export default Import;