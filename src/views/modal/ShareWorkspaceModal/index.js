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
    Modal, Grid, Button, ClickAwayListener,
} from '@mui/material';
// components
import ThemeConfig from "../../../themes/theme2"


import Backdrop from '@mui/material/Backdrop';



import {useDispatch, useSelector} from "react-redux";
import {

    CLOSE_Confirm_Share_Workspace_MODAL,
    CLOSE_MODAL, CLOSE_MODAL_SHARE, OPEN_MODAL_SHARE
    ,
} from "../../../store/actions";

import { useHistory} from "react-router-dom";


import {
    IconButton, Typography,
    useMediaQuery, useTheme,
} from "@material-ui/core";

import useScriptRef from "../../../hooks/useScriptRef";
import {strengthColor, strengthIndicator} from "../../../verification_password/password-strength";
import {makeStyles} from "@material-ui/styles";
import UserListHead from "./UserListHead";

import SearchNotFound from "../../ViewAll/import/customer/SearchNotFound";
import PerfectScrollbar from "react-perfect-scrollbar";
import Cells from "./Cells";
import ConfirmShareWorkspaceModal from "../ConfirmShareWorkspaceModal";
import CloseIcon from "@mui/icons-material/Close";
import {Cancel} from "../../Button/actionButton";

// ----------------------------------------------------------------------



// ---------------------------------------------------------------------






const ShareWorkspaceModal=  (props) => {
    const theme = useTheme();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    const [isloading, setIsloading] = useState(false);


    const [source, setSource] = React.useState("/static/images/avatar_1.png");

    const handleCapture = ({target}) => {
        const fileReader = new FileReader();
        // const name = target.accept.includes('image') ? 'images' : 'videos';

        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            setSource(e.target.result);
        };
    };

let minWith=matchDownSM?'20%':matchDownMD?"95%":"35%"
let maxWidth=matchDownSM?'90%':matchDownMD?"98%":null;

    const OVERLAY_Styles ={
        position: 'fixed',
        minWith,
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
maxWidth,
        minWith,
        position: 'absolute',
        top: '50%',
        left: '50%',
        radius:3,
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '0px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };


    const TABLE_HEAD = [
        { id: 'username', label: 'User name', alignRight: "left" },
        {  id: 'action', label: '           Activites', alignRight: "center" }
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
            return filter(array, (_user) => (_user.phone).toString().indexOf(query.toLowerCase()) !== -1||_user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1||_user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1||_user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1||_user.role.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        }
        return stabilizedThis.map((el) => el[0]);
    }

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('username');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = userSt.possibleShare.map((n) => n.username);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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
    let userSt= useSelector((state) => state.user);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userSt.possibleShare.length) : 0;

    const filteredUsers = applySortFilter(userSt.possibleShare, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    let open = useSelector((state) => state.modal);
    function handleCloseModal  () {
        dispatcher({
            type:CLOSE_Confirm_Share_Workspace_MODAL,

        });
    };










    const [open5, setOpen5] = React.useState(false);



    const dispatcher = useDispatch();

    let account = useSelector((state) => state.account);



    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_MODAL,
            });

        }
    }, [])



    let open1 = useSelector((state) => state.modal);

    const handleClose=()=>{
        dispatcher(  {
            type:CLOSE_MODAL_SHARE,
        });
    }




    return (
        <Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"

                open={open1.ModalStateShare}
                onClose={handleClose}

                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}

            >
                {//                open={open1.ModalStateShare}
                }
                <div style={OVERLAY_Styles}>
                    <ClickAwayListener onClickAway={handleClose}>

                    <Fade in={open1.ModalStateShare}>

                        <Box sx={{ ...style }} >
                            <IconButton sx={{float:'right'}}               aria-label="close">
                                <CloseIcon onClick={handleClose}  color="disabled"      />
                            </IconButton>
                                <Grid xs={12}>
                                    <Typography  gutterBottom mt={3}          color={theme.palette.secondary.main} variant="h1" align="center">


                                        Share Workspaces
                                    </Typography>
                                </Grid>

                            <ThemeConfig>
                                <PerfectScrollbar>
                                    <TableContainer sx={{minWidth: 250,maxWidth:450}}>
                                        <Table>
                                            <UserListHead
                                                order={order}
                                                orderBy={orderBy}
                                                headLabel={TABLE_HEAD}
                                                rowCount={userSt.possibleShare.length}
                                                numSelected={selected.length}
                                                onRequestSort={handleRequestSort}
                                                onSelectAllClick={handleSelectAllClick}
                                            />
                                            <TableBody>
                                                {filteredUsers
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row) => {


                                                        const {_id, username, photo} = row;
                                                        const isItemSelected = selected.indexOf(username) !== -1;

                                                        return (
                                                            <Fragment>
                                                                <TableRow
                                                                    hover
                                                                    key={_id}
                                                                    tabIndex={-1}
                                                                    role="checkbox"
                                                                    selected={isItemSelected}
                                                                    aria-checked={isItemSelected}
                                                                >
                                                                    <TableCell padding="checkbox">

                                                                    </TableCell>
                                                                    <Cells    userPar={{_id,username,photo}}/>
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
                                                        <TableCell align="center" colSpan={6} sx={{py: 3}}>
                                                            <SearchNotFound searchQuery={filterName}/>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            )}
                                        </Table>
                                    </TableContainer>
                                </PerfectScrollbar>
                                <TablePagination

                                    rowsPerPageOptions={[4]}
                                    component="div"
                                    count={userSt.possibleShare.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                                {open.ModalConfirmShare && (<ConfirmShareWorkspaceModal  handleClose={handleCloseModal} user={open.objet} card={props.card}/>)}

                            </ThemeConfig>
                            <Button   onClick={handleClose}  variant="contained" color="error">{Cancel}</Button>
                        </Box>

                    </Fade>
                    </ClickAwayListener>
                </div>

            </Modal>


        </Fragment>
    )
        ;
}
export default ShareWorkspaceModal;