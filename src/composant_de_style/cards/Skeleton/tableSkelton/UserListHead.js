import PropTypes from 'prop-types';
// material
import { visuallyHidden } from '@mui/utils';
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

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
    let loc
    if(window.location.pathname.includes('html'))
        loc=window.location.hash
    else
        loc=window.location.pathname
  return (
      <TableHead  >
        <TableRow>
            {(!loc.includes("widget"))&&  <TableCell padding="checkbox">

          </TableCell>}

          {headLabel.map((headCell) => (
              <TableCell
                  key={headCell.id}


                  align={headCell.alignRight}
                  sortDirection={orderBy === headCell.id ? order : false}
              >


                <TableSortLabel
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