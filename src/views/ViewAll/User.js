import { filter } from 'lodash';
import React, {Fragment, useEffect, useState} from 'react';
// material
import {
    Stack,
    Container,
    Typography,
    Box, Card, TableContainer, Table, TableBody, TableRow, TableCell, Checkbox, Avatar, Button, TablePagination,
} from '@mui/material';
// components
import ThemeConfig from "../../themes/theme2"



import axios from "axios";
import configData from "../../config";

import {useDispatch, useSelector} from "react-redux";
import {CLOSE_DELETE_MODAL, INISIALIZE_USER, } from "../../store/actions";
import {UserListHead, UserListToolbar} from "./import/customer/@dashboard/user";
import Scrollbar from "./../../animation/NavigationScroll";
import PerfectScrollbar from 'react-perfect-scrollbar';

import SearchNotFound from "./import/customer/SearchNotFound";
import Modal_Delete_User from "../Modal_delete_user";
import Cells from "./cells";
import {Link as RouterLink} from "react-router-dom";
import Iconify from "./import/customer/Iconify";
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
const TABLE_HEAD = [
    { id: 'username', label: 'User name', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'phone', label: 'Phone', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },

    {  id: 'action', label: '           Activites', alignLeft: true }
];

// ----------------------------------------------------------------------

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
        return filter(array, (_user) => _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

const User=  (props) => {



    const dispatcher = useDispatch();

    let account = useSelector((state) => state.account);
    let userSt= useSelector((state) => state.user);

    const [success,setSucess]=useState(false)
    const [USERLIST,setUSERLIST]=useState([])


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

    })}, []);


    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_DELETE_MODAL,

            });
        }
    }, [])
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
            const newSelecteds = USERLIST.map((n) => n.username);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

    const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    let open = useSelector((state) => state.modal);
    function handleCloseModal  () {
        dispatcher({
            type:CLOSE_DELETE_MODAL,

        });
    };








  return (
      success&&(
          <ThemeConfig>

          <Container>

            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1} mb={1}>
              <Typography sx={{ml:1,mb:8,mt:3}} variant="h4" gutterBottom>
                User Liste
              </Typography>

            </Stack>


            <Card>
                <UserListToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <PerfectScrollbar>
                    <TableContainer sx={{minWidth: 800}}>
                        <Table>
                            <UserListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={USERLIST.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                                {filteredUsers
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {


                                        const {_id, username, email, phone,role,photo} = row;
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
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            onChange={(event) => handleClick(event,username)}
                                                        />
                                                    </TableCell>
                                                   <Cells    userPar={{_id,username,phone,role,photo,email}}/>
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
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={USERLIST.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                {open.ModalDeleteState && (<Modal_Delete_User  handleClose={handleCloseModal} user={open.objet} />)}

            </Card>

      </Container>
          </ThemeConfig>

      ))
  ;
}
export default User;
