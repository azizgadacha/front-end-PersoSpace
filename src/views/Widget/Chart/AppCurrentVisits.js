import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import {Card, CardHeader, IconButton} from '@mui/material';
// utils
import Menu from "./Menu"
import {fCurrency, fData, fNumber, fShortenNumber} from '../../Customization/formatNumber';
//
import BaseOptionChart  from './BaseOptionChart';
import {gridSpacing} from "../../../store/constant";
import {Grid, MenuItem} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/styles";
import MainCard from "../../../composant_de_style/cards/MainCard";
import {OPEN_DELETE_MODAL} from "../../../store/actions";
import {useDispatch} from "react-redux";

// ----------------------------------------------------------------------

const CHART_HEIGHT = 342;
const LEGEND_HEIGHT = 72;

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
const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(0),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------


export default function AppCurrentVisits(data) {
  const dispatcher = useDispatch();

  const handleClick = () => {

    dispatcher({
      type:OPEN_DELETE_MODAL,
      payload: {objet:data.data}


    });
    handleCloseMenu()
  };




  const theme = useTheme();
  let CHART_DATA

  if(data.data.dataWidget) {
    console.log("mchinaaa")
    CHART_DATA =  data.data.dataWidget;
  }
    else {
    CHART_DATA =  data.data.data;
    console.log("mchinaaa20")

  }
  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main
    ],
    labels: data.data.label,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
      <MainCard>

        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Grid container direction="column" >
                  <Grid item>
                    <CardHeader title={data.data.WidgetName? data.data.WidgetName:data.data.title} />
                  </Grid>

                </Grid>
              </Grid>
              <Grid item >
                <Grid item >

                  <Menu data={data.data}/>


                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ChartWrapperStyle dir="ltr">
              <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={280} />
            </ChartWrapperStyle>    </Grid>

        </Grid>
      </MainCard>
  );
}





