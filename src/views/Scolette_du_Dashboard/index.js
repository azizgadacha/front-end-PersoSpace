import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import {AppBar, CssBaseline, Snackbar, Toolbar, useMediaQuery} from '@material-ui/core';

// third-party
import clsx from 'clsx';

// project imports
import navigation from "../../BareItem/Esseyage"
import Breadcrumbs from './../../composant_de_style/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import { drawerWidth } from '../../store/constant';
import { SET_MENU } from '../../store/actions';
// assets
import { IconChevronRight } from '@tabler/icons';
import {Alert} from "@material-ui/lab";
import ThemeConfig from "../../themes/theme2";
import {useLocation} from "react-router-dom";

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        backgroundColor: theme.palette.background.default
    },

    appBarWidth: {
        transition: theme.transitions.create('width'),
        backgroundColor: theme.palette.background.default
    },
    content: {
        ...theme.typography.mainContent,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    }
}));

//-----------------------|| MAIN LAYOUT ||-----------------------//


const MainLayout = ({ children }) => {
    let open1 = useSelector((state) => state.snack);

    const dispatcher = useDispatch();



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatcher({
            type:"Close"
        });

    };
    const classes = useStyles();
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    let location
    if(window.location.pathname.includes('html'))
        location=window.location.hash
    else
        location=window.location.pathname

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    React.useEffect(() => {
        dispatch({ type: SET_MENU, opened: !matchDownMd });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);

    return (

        <div className={classes.root}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                className={leftDrawerOpened ? classes.appBarWidth : classes.appBar}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>

            {/* drawer */}

            {(location.includes("dashboard"))&&
            <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />}
            {/* main content */}
            <main
                className={clsx([
                    classes.content,
                    {
                        [classes.contentShift]: leftDrawerOpened
                    }
                ])}
            >
                {/* <Main open={leftDrawerOpened}> */}
                {/* breadcrumb */}
                <Breadcrumbs separator={IconChevronRight} navigation={navigation()} icon title rightAlign />
                <div>{children}</div>
                {/* </Main> */}
            </main>


            <Snackbar   anchorOrigin ={{ vertical:"bottom", horizontal: 'right'}}  open= {open1.open} autoHideDuration={4000} onClose={handleClose} >
                <Alert onClose={handleClose} severity={open1.severity}>{open1.text}                </Alert>
            </Snackbar>

        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node
};

export default MainLayout;

