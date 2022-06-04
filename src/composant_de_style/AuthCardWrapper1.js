import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';

// project import
import MainCard from './../composant_de_style/cards/MainCard';

// style constant


//-----------------------|| AUTHENTICATION CARD WRAPPER 1 ||-----------------------//

const AuthCardWrapper = ({ children, ...other }) => {
    let loc
    if(window.location.pathname.includes('html'))
        loc=window.location.hash
    else
        loc=window.location.pathname
    const maxWidth=((loc.includes('/login'))?"1050px":'475px')
    const useStyles = makeStyles((theme) => ({
        card: {

            maxWidth,
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            },
            [theme.breakpoints.down('sm')]: {
                margin: '20px'
            },
            [theme.breakpoints.down('lg')]: {
                maxWidth: '400px'
            },
        },
        content: {
            padding: theme.spacing(5) + ' !important',
            [theme.breakpoints.down('lg')]: {
                padding: theme.spacing(3) + ' !important'
            }
        }
    }));


    const classes = useStyles();

    return (
        <MainCard className={classes.card} contentClass={classes.content} {...other}>
            {children}
        </MainCard>
    );
};

AuthCardWrapper.propTypes = {
    children: PropTypes.node
};
export default AuthCardWrapper;
