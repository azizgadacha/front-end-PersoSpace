import React from 'react';

// material-ui
import { useTheme } from '@material-ui/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from './../../assets/images/logo-dark.svg';
 * import logo from './../../assets/images/logo.svg';
 *
 */

//-----------------------|| LOGO SVG ||-----------------------//
import  logo from "./images/logo.png"
const Logo = () => {
    const theme = useTheme();
    return (

<img src={logo} height="50" width="160"/>
    );
};

export default Logo;
