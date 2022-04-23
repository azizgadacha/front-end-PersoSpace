import { filter } from 'lodash';
import React, {Fragment, useEffect, useState} from 'react';
// material
import Fade from '@mui/material/Fade';

import {

    Box,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,

    TablePagination,
    Modal, Button, Stack, Grid, Alert,
} from '@mui/material';
// components
import ThemeConfig from "../../../themes/theme2"


import Backdrop from '@mui/material/Backdrop';



import {useDispatch, useSelector} from "react-redux";
import {

    CLOSE_Confirm_Share_Workspace_MODAL,
    CLOSE_MODAL, CLOSE_WIDGET_MODAL, IMPORT_DATA, INISIALIZE_DATA, INISIALIZE_USER, INIZIALIZE_STEPS
    ,
} from "../../../store/actions";

import {useHistory, useParams} from "react-router-dom";


import {
    useMediaQuery,
} from "@material-ui/core";

import useScriptRef from "../../../hooks/useScriptRef";
import {strengthColor, strengthIndicator} from "../../../verification_password/password-strength";
import {makeStyles} from "@material-ui/styles";
import UserListHead from "./TableContent/UserListHead";

import SearchNotFound from "../../ViewAll/import/customer/SearchNotFound";
import PerfectScrollbar from "react-perfect-scrollbar";
import Cells from "./Cells";
import ConfirmShareWorkspaceModal from "../ConfirmShareWorkspaceModal";
import axios from "axios";
import configData from "../../../config";
import SkeltonTable from "../../../composant_de_style/cards/Skeleton/tableSkelton/dataSkelton";
import {withStyles} from "@mui/styles";
import {Add, Adding, AddWidget, Back, Cancel} from "../../Button/actionButton";
import {LoadingButton} from "@material-ui/lab";
import SaveIcon from "@mui/icons-material/Save";

// ----------------------------------------------------------------------

const OVERLAY_Styles ={
    position: 'fixed',
    top: 0,
    left: 0,
    right:0,
    bottom:0,
    backgroundColor: 'rgba(0,0,0, .2)',
    zIndex:100

}
const style = {

    padding:'50px',
    zIndex:100,

    borderRadius: 5,


    position: 'absolute',
    top: '50%',
    left: '50%',
    radius:3,
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({


    modal:{
        position: 'absolute',
        top: '50%',
        left: '50%',

        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,



    },

    root: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "blue"
        },
    }
    ,
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    },


    input: {
        display: "none",


    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
}));






const DataModal=  (props) => {


    const classes = useStyles();
    let history = useHistory();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [showPassword, setShowPassword] = React.useState(false);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };





    const TABLE_HEAD = [
        { id: 'title', label: 'title', alignRight: false },

    ];
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }
    function applySortFilter(array, comparator, query) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        if (query) {
            return filter(array, (_data) => _data.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        }
        return stabilizedThis.map((el) => el[0]);
    }
    const [success,setSucess]=useState(false)
    const [chosed,setChosed]=useState(false)

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('title');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = dataStore.data.map((n) => n.title);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, title) => {
        const selectedIndex = selected.indexOf(title);
        let newSelected = [];
        if (selectedIndex === -1) {
             newSelected = newSelected.concat( title);

        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
        setChosed(false)


    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };
    let {id}=useParams()

    const handleSubmit=()=>{
  /*
*/
        if(selected.length==0){
setChosed(true)
        }
        else {
    console.log(selected)
    let get=(dataStore.data).filter((value)=>{
        console.log("l")
        return value.title==selected[0]
    })

    console.log(get)

        dispatcher({
            type:IMPORT_DATA,
            payload: {Data:get[0],superior_id:id,sourceDB:true}

        })
        dispatcher({
            type:CLOSE_MODAL,

        });}

}

    useEffect(() => {
        axios
            .post(configData.API_SERVER + 'api/users/getData', {


                token: account.token
            }).then((result) => {
            dispatcher({
                type:INISIALIZE_DATA,
                payload: {data:result.data.data},
            })

            setSucess(true)
        })},[] );








    let modal = useSelector((state) => state.modal);
    let widget = useSelector((state) => state.widget);


    let dataStore= useSelector((state) => state.data);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataStore.data.length) : 0;

    const filteredUsers = applySortFilter(dataStore.data, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;




  const  HandleAdd=()=>{

      dispatcher({
          type:IMPORT_DATA,

      })



  }

  const handleClose=()=>{


        dispatcher({
            type:CLOSE_MODAL,

        });

    }
    const dispatcher = useDispatch();

    let account = useSelector((state) => state.account);



    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_MODAL,
            });
        }
    }, [])
    return (
        <Fragment>
            {success?(


                            <Fragment>

                                <Box  >
                                        <PerfectScrollbar>
                                            <TableContainer sx={{borderTopRightRadius:8,borderTopLeftRadius:8}} >
                                                <Table sx={{borderRadius :3}}  sx={{border:'2px solid #c5c5c5',}}
                                                stickyHeader aria-label="sticky table">
                                                    <UserListHead
                                                        order={order}
                                                        orderBy={orderBy}
                                                        headLabel={TABLE_HEAD}
                                                        rowCount={dataStore.data.length}
                                                        numSelected={selected.length}
                                                        onRequestSort={handleRequestSort}
                                                        onSelectAllClick={handleSelectAllClick}
                                                    />
                                                    {console.log("dd")}
                                                    {console.log(selected)}

                                                    <TableBody sx={{border:'1px solid #c5c5c5',borderBottomLeftRadius:8,borderBottomRightRadius:8}}>
                                                        {filteredUsers
                                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            .map((row) => {


                                                                const {_id, title} = row;
                                                                const isItemSelected = selected.indexOf(title) !== -1;

                                                                return (
                                                                    <Fragment>
                                                                        <TableRow
                                                                            hover
                                                                            key={_id}
                                                                            tabIndex={-1}
                                                                            role="checkbox"
                                                                            onClick={(event) => handleClick(event, title)}

                                                                            selected={isItemSelected}
                                                                            aria-checked={isItemSelected}
                                                                        >

                                                                            <Cells    title={title}/>
                                                                        </TableRow>

                                                                    </Fragment>
                                                                );
                                                            } )}
                                                        {emptyRows > 0 && (
                                                            <TableRow style={{height: 53 * emptyRows}}>
                                                                <TableCell colSpan={6}/>
                                                            </TableRow>
                                                        )}

                                                    </TableBody>
                                                    {isUserNotFound && (
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell align="center" colSpan={2} sx={{py: 3}}>
                                                                    <SearchNotFound searchQuery={filterName}/>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    )}
                                                </Table>
                                            </TableContainer>
                                        </PerfectScrollbar>
                                        <TablePagination sx={{border:'1px solid #c5c5c5',borderRight:'1px solid #c5c5c5',borderBottom:'1px solid #c5c5c5',borderTop:'1px solid #ffffff',borderBottomLeftRadius:8,borderBottomRightRadius:8}}
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={dataStore.data.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            size={1}
                                        />

                                </Box>

                            </Fragment>                                ):(<SkeltonTable/>)}
            {chosed&&
                <Grid
                    item
                    md={12}
                    xs={12}
                    mt={3}
                    mb={4}
                >
                    <Alert variant="filled" autoHideDuration={4000} severity="error">
                        You should choose a data source
                    </Alert>
                </Grid>
            }
                <Stack sx={{mt:4}} direction="row" alignItems="center" justifyContent="space-between" >
                <Box
                    sx={{
                        display: 'block',
                        justifyContent: 'block-end',
                    }}
                >




                    <Button   onClick={handleClose}  variant="contained" color="error">{Cancel}</Button>




                </Box>
                <Box

                    sx={{
                        display: 'block',
                        justifyContent: 'block-end',
                    }}


                >



                        {
                            (modal.isSubmitting)?(<LoadingButton
                                    variant="contained"
                                    loading loadingPosition="start"
                                    startIcon={<SaveIcon />}
                                    variant="outlined">{Adding}</LoadingButton>):


                                <Button
                                    variant="contained"
                                    color="primary"
                                    handleSubmit
                                    onClick={handleSubmit}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end"
                                    }}
                                >
                                    {Add}
                                </Button>}
                </Box>


            </Stack>



        </Fragment>
    )
        ;
}
export default DataModal;
