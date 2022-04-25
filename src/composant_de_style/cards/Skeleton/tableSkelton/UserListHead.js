import PropTypes from 'prop-types';
// material
import { visuallyHidden } from '@mui/utils';
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import {makeStyles, withStyles} from "@mui/styles";
import {useTheme} from "@material-ui/core";

// ----------------------------------------------------------------------
const useStyles = makeStyles({

  root: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: "blue"
    },
  }
});
UserListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func
};

export default function UserListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const theme = useTheme();


  return (
    <TableHead sx={{border:'0.5px solid #c5c5c5',borderRight:'1px solid #c5c5c5',borderTop:'1px solid #ffffff',borderTopLeftRadius:8,borderTopRightRadius:8}}>
      <TableRow sx={{borderRadius :1}} >

        {headLabel.map((headCell) => (
          <TableCell sx={{borderRadius :3}}
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ background:theme.palette.grey[200]}}
          >
            <TableSortLabel sx={{borderRadius :3}}
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
