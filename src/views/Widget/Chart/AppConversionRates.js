import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {Box, Button, Card, CardHeader, IconButton, } from '@mui/material';
// utils
import { fNumber } from '../../Customization/formatNumber';
//
import BaseOptionChart  from './BaseOptionChart';
import {Avatar, Grid, MenuItem, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {gridSpacing} from "../../../store/constant";
import BarChart from "./BarChart";
import chartData from "../../dashboard/Default/chart-data/total-growth-bar-chart";
import MainCard from "../../../composant_de_style/cards/MainCard";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {makeStyles} from "@material-ui/styles";
import ThemeConfig from "../../../themes/theme2";
import {useTheme} from "@mui/material/styles";
import Menu from "./Menu";








const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
      position: 'relative',
      zIndex: 5
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '210px',
      height: '210px',
      background: theme.palette.primary[800],
      borderRadius: '50%',
      zIndex: 1,
      top: '-85px',
      right: '-95px',
      [theme.breakpoints.down('xs')]: {
        top: '-105px',
        right: '-140px'
      }
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: 1,
      width: '210px',
      height: '210px',
      background: theme.palette.primary[800],
      borderRadius: '50%',
      top: '-125px',
      right: '-15px',
      opacity: 0.5,
      [theme.breakpoints.down('xs')]: {
        top: '-155px',
        right: '-70px'
      }
    }
  },
  content: {
    padding: '20px !important'
  },
  avatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.largeAvatar,
    backgroundColor: theme.palette.primary[800],
    color: '#fff',
    marginTop: '8px'
  },

  cardHeading: {
    fontSize: '2.125rem',
    fontWeight: 500,
    marginRight: '8px',
    marginTop: '0px',
    marginBottom: '0px'
  },
  subHeading: {
    fontSize: '1rem',
    fontWeight: 500,
    color: theme.palette.primary[200]
  },
  avatarCircle: {
    ...theme.typography.smallAvatar,
    cursor: 'pointer',
    backgroundColor: theme.palette.primary[200],
    color: theme.palette.primary.dark
  },
  circleIcon: {
    transform: 'rotate3d(1, 1, 1, 45deg)'
  },
  menuItem: {
    marginRight: '14px',
    fontSize: '1.25rem'
  },
  avatarRight:{
    backgroundColor: theme.palette.grey[120],
  }

}));





// ----------------------------------------------------------------------
const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

export default function AppConversionRates(data) {
  const theme = useTheme();

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  let CHART_DATA
  if(data.data.dataWidget)
   CHART_DATA = [{ data: data.data.dataWidget}];
else
    CHART_DATA=[{data:data.data.data}]
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    colors: [
      'rgba(255, 99, 132)',
      'rgba(54, 162, 235)',
      'rgba(255, 206, 86)',
      'rgba(75, 192, 192)',
      'rgba(153, 102, 255)',
      'rgba(255, 159, 64)'
    ],
    plotOptions: {
      bar: { horizontal: true, barHeight: '30%', borderRadius: 2 ,distributed: true}
    },
    xaxis: {
      categories: data.data.label
    }
  });



  let loc
  if(window.location.pathname.includes('html'))
    loc=window.location.hash
  else
    loc=window.location.pathname


return (



  <MainCard>

    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Grid container direction="column" >
              <Grid item>
                  <CardHeader title={data.data.WidgetName ? data.data.WidgetName : data.data.title}/>

                </Grid>

            </Grid>
          </Grid>

          <Grid item >
            <Grid item >
              {(loc.includes('default')||(loc.includes('Shared')))&&(

                  <Menu data={data.data}/>)

              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
        <Grid item xs={12}>
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={330} />
      </Grid>

    </Grid>
  </MainCard>







  );
}