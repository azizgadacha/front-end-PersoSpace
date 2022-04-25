import { filter } from 'lodash';
import React, {Fragment, useEffect, useState} from 'react';
// material
import {
    Stack,
    Container,
    Typography,
    Box,
    Card,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,
    Avatar,
    Button,
    TablePagination,
    Modal,
    TextField,
} from '@mui/material';
// components
import ThemeConfig from "../../themes/theme2"



import axios from "axios";
import configData from "../../config";

import {useDispatch, useSelector} from "react-redux";
import {ADD_USER, CLICK, CLOSE_DELETE_MODAL, CLOSE_MODAL, INISIALIZE_USER,} from "../../store/actions";
import {UserListHead, UserListToolbar} from "./import/customer/@dashboard/user";
import Scrollbar from "./../../animation/NavigationScroll";
import PerfectScrollbar from 'react-perfect-scrollbar';

import SearchNotFound from "./import/customer/SearchNotFound";
import Modal_Delete_User from "../modal/ModalDeleteWidgetUser";
import Cells from "./cells";
import { useHistory} from "react-router-dom";

import RegistreModal from "../modal/RegistreModal";

import {
    useMediaQuery, useTheme
} from "@material-ui/core";

import {strengthColor, strengthIndicator} from "../../verification_password/password-strength";
import {makeStyles} from "@material-ui/styles";
import SkeltonTable from "../../composant_de_style/cards/Skeleton/tableSkelton/TableSkelton";

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({


    modal:{
        position: 'absolute',
        top: '50%',
        left: '50%',

        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,



    },


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

    root: {
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: "none",


    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },


}));




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
        return filter(array, (_user) => (_user.phone).toString().indexOf(query.toLowerCase()) !== -1||_user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1||_user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1||_user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1||_user.role.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

const User=  (props) => {

    const states = [
        {
            value: 'administrateur',
            label: 'administrateur'
        },
        {
            value: 'simple employer',
            label: 'simple employer'
        },

    ];
    const [source, setSource] = React.useState("/static/images/avatar_1.png");

    const handleCapture = ({target}) => {
        const fileReader = new FileReader();
        // const name = target.accept.includes('image') ? 'images' : 'videos';

        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            setSource(e.target.result);
        };
    };


    const [showPassword, setShowPassword] = React.useState(false);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };


    useEffect(() => {
        changePassword('123456');
    }, []);

    const [isloading, setIsloading] = useState(false);
    //const [openModal,setOpenModal]=useState(false);











    const [open5, setOpen5] = React.useState(false);
    const handleOpen5 = () => {
        setOpen5(true);
    };
    const handleClose5= () => {
        setOpen5(false);
    };

    const dispatcher = useDispatch();

    let account = useSelector((state) => state.account);
    let userSt= useSelector((state) => state.user);

    const [success,setSucess]=useState(false)
    const [USERLIST,setUSERLIST]=useState([])

    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_MODAL,

            });
        }
    }, [])
   useEffect(() => {
    axios
        .post(configData.API_SERVER + 'api/users/all', {
            id:account.user._id,

          token: account.token
        }).then((result) => {
        dispatcher({
            type:INISIALIZE_USER,
            payload: {users:result.data.users},
        })
        setUSERLIST(userSt.users)
        setSucess(true)

    })},[] );


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
            const newSelecteds = userSt.users.map((n) => n.username);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userSt.users.length) : 0;

    const filteredUsers = applySortFilter(userSt.users, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    let open = useSelector((state) => state.modal);
    function handleCloseModal  () {
        dispatcher({
            type:CLOSE_DELETE_MODAL,

        });
    };
    let open1 = useSelector((state) => state.modal);








  return (
      <Fragment>
          <ThemeConfig>

          <Container>
              <Card xs={6}  sx={{mb:3}}>

            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1} mb={1}>


                <Typography sx={{ml:1,mb:1,mt:1}} variant="h4" gutterBottom>
                User Liste
              </Typography>
            </Stack>

              </Card>


            <Card>
                {success?(
<Fragment>
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
                                rowCount={userSt.users.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody >
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
                    count={userSt.users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
</Fragment>
                    ):(<SkeltonTable/>)}
            </Card>

      </Container>
          </ThemeConfig>
          {open.ModalDeleteState && (<Modal_Delete_User  handleClose={handleCloseModal} type={"User"}/>)}


<RegistreModal/>
          {/* <EditUser user={open.objet}/>*/}

      </Fragment>
)
  ;
}
export default User;
