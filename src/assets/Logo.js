import React from 'react';

// material-ui
import { useTheme } from '@material-ui/styles';



//-----------------------|| LOGO SVG ||-----------------------//
import  logo from "./images/logo.png"
const Logo = () => {
    const theme = useTheme();
    return (

<img src={logo} height="50" width="160"/>
    );
};

export default Logo;
