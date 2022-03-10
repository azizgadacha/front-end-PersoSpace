import { filter } from 'lodash';
import {useEffect, useState} from 'react';
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
  Container,
  Typography,
  TableContainer,
  TablePagination, Box, Button
} from '@mui/material';
// components
import ThemeConfig from "../../themes/theme2"

import Scrollbar from '../../animation/NavigationScroll';
import SearchNotFound from './import/customer/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from './import/customer/@dashboard/user';
//
import {Upload as UploadIcon} from "./import/customer/upload";
import {Download as DownloadIcon} from "./import/customer/download";
import axios from "axios";
import configData from "../../config";
import  {USERLIST1} from "./import/customer/customers"
import {useSelector} from "react-redux";
import RestRegister from "../register/RestRegister";
// ----------------------------------------------------------------------

 let USERLIST=USERLIST1;
const TABLE_HEAD = [
  { id: 'username', label: 'User name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: '' }
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
  let account = useSelector((state) => state.account);


   useEffect(async () => {

    axios
        .post(configData.API_SERVER + 'users/all', {

          token: account.token
        }).then((result) => {
      console.log("im gere")
      console.log(result.data.users)
      USERLIST = result.data.users
    })
  }, [USERLIST])



  console.log(account)


  console.log("tun8")


  console.log("sa58")


  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
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


  return (

      <Container>
        <ThemeConfig>

          <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
              }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h2" gutterBottom>
                User Liste
              </Typography>

            </Stack>
          </Box>


          <Card>
            <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
            />

            <Scrollbar>
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


                          const {_id, username, email, phone, avatarUrl} = row;
                          const isItemSelected = selected.indexOf(username) !== -1;

                          return (
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
                                      onChange={(event) => handleClick(event, username)}
                                  />
                                </TableCell>
                                <TableCell component="th" scope="row" padding="none">
                                  <Stack direction="row" alignItems="center" spacing={2}>
                                    <Avatar alt={username} src={avatarUrl}/>
                                    <Typography variant="subtitle2" noWrap>
                                      {username}
                                    </Typography>
                                  </Stack>
                                </TableCell>


                                <TableCell align="left">{email}</TableCell>
                                <TableCell align="left">{phone}</TableCell>


                                <TableCell align="right">
                                  <UserMoreMenu/>
                                </TableCell>
                              </TableRow>
                          );
                        })}
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
            </Scrollbar>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={USERLIST.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </ThemeConfig>
      </Container>

  );
}
export default User;
