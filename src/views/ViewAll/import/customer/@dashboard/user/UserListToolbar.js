import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment, Button, Grid
} from '@mui/material';
// component
import Iconify from '../../Iconify';
import {Link as RouterLink} from "react-router-dom";
import React, {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {OPEN_MODAL} from "../../../../../../store/actions";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func
};


export default function UserListToolbar({ numSelected, filterName, onFilterName }) {

  const dispatcher = useDispatch();
  const HandleClick=()=>{
    dispatcher({
      type:OPEN_MODAL,

    });

  }

  return (
      <Fragment>
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle sx={{mr:2 ,ml:0}}
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
          <Grid >
          <Button sx={{width:125,mr:0,mb:2,mt:3}}
              variant="contained"
              onClick={HandleClick}

              startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button>
          </Grid>
      )}
    </RootStyle>
      </Fragment>
);
}
