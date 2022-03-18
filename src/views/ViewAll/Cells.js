import { filter } from 'lodash';
import React, {Fragment, useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// material
import {
    Card,
    Table,
    Stack,
    Avatar,

    Checkbox,
    TableRow,
    TableBody,
    TableCell,

    Typography,
    TableContainer,
    TablePagination, Button, Box,
} from '@mui/material';
// components
import Scrollbar from '../../animation/NavigationScroll';
import SearchNotFound from './import/customer/SearchNotFound';
import { UserListHead, UserListToolbar } from './import/customer/@dashboard/user';
import Modal_Delete_Workspace from "../modal_delete_workspace";
import {CLOSE_DELETE_MODAL, OPEN_DELETE_MODAL} from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import Modal_Delete_User from "../Modal_delete_user";

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


const Cells=  (props) => {

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('username');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);





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
    const dispatcher = useDispatch();

    const handleClickModal = () => {
        dispatcher({
            type:OPEN_DELETE_MODAL,
            payload: {objet:props.user}

        });
    };





    let open = useSelector((state) => state.modal);
    function handleCloseModal  () {
        dispatcher({
            type:CLOSE_DELETE_MODAL,

        });
    };

    return (


                                     <Fragment>

                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar alt={props.user.username} src={props.user.avatarUrl}/>
                                                        <Typography variant="subtitle2" noWrap>
                                                            {props.user.username}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>


                                                <TableCell align="left">{props.user.email}</TableCell>
                                                <TableCell align="left">{props.user.phone}</TableCell>

                                                <TableCell align="left">{props.user.role}</TableCell>


                                         {console.log("selmo")}
                                         {console.log(props.user.username)}

                                                <TableCell align="left">
                                                    <Box sx={{ '& button': { m: 1 } }}>

                                                        <div>
                                                            <Button sx={{width:110}} variant="outlined"  color="info" startIcon={<EditIcon />}>
                                                                Edit
                                                            </Button>
                                                            <Button  onClick={handleClickModal} variant="outlined" color="error" startIcon={<DeleteIcon />}>
                                                                DELETE
                                                            </Button>

                                                        </div>
                                                    </Box>


                                                </TableCell>

                                     </Fragment>


    );
}
export default Cells;
