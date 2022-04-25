import { filter } from 'lodash';
import React, {Fragment, useState} from 'react';
// material
import {
    Stack,

    Box,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,

    TablePagination,
   Skeleton,
} from '@mui/material';

import {useDispatch, useSelector} from "react-redux";
import {UserListHead} from "../../../../views/ViewAll/import/customer/@dashboard/user";
import UserListToolbarSkelton from "./UserListToolbarSkelton";

import PerfectScrollbar from 'react-perfect-scrollbar';


import USERLIST from '../Static_Data/Static';

// ----------------------------------------------------------------------






const TABLE_HEAD = [
    { id: 'username', label: 'User name', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'phone', label: 'Phone', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },

    {  id: 'action', label: '           Activites', alignLeft: true }
];

// ----------------------------------------------------------------------



const SkeltonTable=  (props) => {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('username');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);






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
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
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





    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

    const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);








    return (
        <Fragment>





            <UserListToolbarSkelton
                numSelected={selected.length}
                filterName={filterName}
            />
                            <PerfectScrollbar>
                                <TableContainer sx={{minWidth: 800}}>
                                    <Table>
                                        <UserListHead
                                            order={order}
                                            orderBy={orderBy}
                                            headLabel={TABLE_HEAD}
                                            rowCount={6}
                                            numSelected={selected.length}
                                            onRequestSort={handleRequestSort}
                                            onSelectAllClick={handleSelectAllClick}
                                        />
                                        <TableBody>
                                            {filteredUsers
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => {


                                                    const {_id, username} = row;
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
                                                                    <Skeleton variant="rectangular" sx={{ml:1.5,width:15,height:15}} />

                                                                </TableCell>
                                                                <TableCell component="th" scope="row" padding="none">
                                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                                        <Skeleton variant="circular" width={40} height={40} />
                                                                        <Skeleton width="60%" />
                                                                    </Stack>
                                                                </TableCell>


                                                                <TableCell align="left">  <Skeleton width="60%" /></TableCell>
                                                                <TableCell align="left">  <Skeleton width="60%" /></TableCell>

                                                                <TableCell align="left">  <Skeleton width="60%" /></TableCell>




                                                                <TableCell align="left">
                                                                    <Box sx={{ '& button': { m: 1 } }}>

                                                                        <div>
                                                                         
                                                                            <Skeleton sx={{width:110}}/>
                                                                            <Skeleton sx={{width:80}}/>


                                                                        </div>
                                                                    </Box>


                                                                </TableCell>
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
        </Fragment>)

}
export default SkeltonTable;
