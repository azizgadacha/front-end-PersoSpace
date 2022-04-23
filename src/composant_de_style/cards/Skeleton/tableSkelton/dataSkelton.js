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
import UserListHead from "./UserListHead";
import UserListToolbarSkelton from "./UserListToolbarSkelton";

import PerfectScrollbar from 'react-perfect-scrollbar';


import USERLIST from '../Static_Data/DataStatic';
import Cells from "../../../../views/modal/Import_Data_From_DB/Cells";
import SearchNotFound from "../../../../views/ViewAll/import/customer/SearchNotFound";

// ----------------------------------------------------------------------






const TABLE_HEAD = [
    { id: 'titel', label: 'title' },

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

            <Box >
                <PerfectScrollbar>
                    <TableContainer sx={{borderTopRightRadius:8,borderTopLeftRadius:8}} >
                        <Table sx={{borderRadius :3}}  sx={{border:'2px solid #c5c5c5',}}
                               stickyHeader aria-label="sticky table">
                            <UserListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={USERLIST.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                backgroundColor='blue'
                                onSelectAllClick={handleSelectAllClick}
                                sx={{bgcolor:"blue",backgroundColor:'blue'}}
                            />
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

                                                    selected={isItemSelected}
                                                    aria-checked={isItemSelected}
                                                >

                                                    <TableCell align="left">  <Skeleton width="80%" /></TableCell>
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
                <TablePagination sx={{border:'1px solid #c5c5c5',borderRight:'1px solid #c5c5c5',borderBottom:'1px solid #c5c5c5',borderTop:'1px solid #ffffff',borderBottomLeftRadius:8,borderBottomRightRadius:8}}
                                 rowsPerPageOptions={[5, 10, 25]}
                                 component="div"
                                 count={USERLIST.length}
                                 rowsPerPage={rowsPerPage}
                                 page={page}
                                 onPageChange={handleChangePage}
                                 onRowsPerPageChange={handleChangeRowsPerPage}
                                 size={1}
                />

            </Box>

        </Fragment> )

}
export default SkeltonTable;
